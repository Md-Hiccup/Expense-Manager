import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Grid, Menu, Button } from 'semantic-ui-react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import InputControllers from '../../components/InputControllers/InputControllers';
// import ListControllers from '../../components/ListControllers/ListControllers';
import classes from './ExpenseManager.css';
import Card from '../../components/card/card';
import AccordionList from './../../components/Accordion/Accordion';

class ExpenseManager extends Component {
    constructor() {
        super();
        // const date = new Date(),
        // today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        this.state = {
            itemList: {
                item: 'Biryani',
                price: '80',
            },
            // date: moment(),
            allList: [],
            activeItem: 'dashboard',
            amount: 0,
            editList: false,
            editVal : null,
            tmpItems :[], 
            activeIndex: 0,
            dateListItems: []
        }
    };

    /*  IT calls After render() */
    componentDidMount() {
        this.itemListHandler();
        this.dateWiseItemHandler();
    }

    /* To handle the side Tab click */
    handleItemClick = (e, {name}) => { this.setState({ activeItem: name})}

    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        console.log('title props,', titleProps);
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex : newIndex})
    }
    // InputDate = (date) => {
    //     console.log('date', date);
    //     this.setState({ date: date })
    // };

    /*  For input change in Addition of Item */
    InputHandler = (event) => {
        // console.log('Event AddInputHandler: ', event.target);
        const value = event.target.value;
        const name = event.target.name;
        const list = { ...this.state.itemList };
        list[name] = value;
        this.setState({ itemList: list  });
    };
    /*  It empty the adding input Items */
    emptyInput(list) {
        list.item = '';
        list.price = '';
        this.setState({ itemList: list });
    }
    // clearItemHandler = () => {
    //     this.setState({ allList: [] });
    // };
    /*  It save the Item to DB  */
    saveItemsHandler = () => {
        let list = { ...this.state.itemList };
        // const date = { ...this.state.date };
        // const ress = this.state.allList.slice();
        const ress = this.state.dateListItems.slice();
        const saveItem = {
            // id : count,
            item: list.item,
            price: list.price,
            // dates: moment(date).format('ll'),
            created_date: moment().format()
            // items: [{
            //     name: list.items,
            //     price: list.price
            // }]
        }
        // console.log('saveItem', saveItem);
        axios.post('/addItems', saveItem)
            .then(res => {
                return res;
            }).then(result => {
                // console.log('add Items: ',result);
            ress.push(
                result.data
            )
            // this.setState({ allList: ress, itemList:list})
            this.setState({ dateListItems: ress, itemList: list})
            this.itemListHandler();
            this.dateWiseItemHandler();
            this.totalPriceHandler();
            this.emptyInput(list);
        })
        .catch(err => console.error(err));
        
    };
    /*  It delete the item from DB  */
    deleteItemHandler= (event)=> {
        const del = event.target.id;
        // console.log('delete id: ',del);
        axios.delete('/deleteItems',{
            params: { id: del}
        })
        .then(res => {
            if(res.status === 200){
                // this.totalPriceHandler();
                this.itemListHandler();
                this.dateWiseItemHandler();
                // console.log('Item Deleted: ',res);
            }
        })
        .catch(err => { return console.error('Error: ',err); });
    };
    /*  It list the all Items from DB   */
    itemListHandler= () => {
        axios.get('/itemList', {
            // params: {   uid: 1  }
        })
        .then(res => {
            // console.log('Total Items List: ',res)
            const fetchLists = [];
            for (let key in res.data) {
                fetchLists.push({
                    ...res.data[key],
                    id: key
                });
            }
            // this.dateWiseItemHandler();
            this.setState({allList: fetchLists});
            this.totalPriceHandler();
            // console.log('ItemList data,' ,this.state.allList)
            // console.log('all',fetchLists);
        })
        .catch(err => { return console.error('Error: ',err); });
        
    };
    /*  It call the total Price of the Items    */
    totalPriceHandler = () => {
        // console.log('total Price handler: ')
        axios('/totalPrice')
            .then(total => {
                if(total.data[0] !== undefined){
                    const getTotalPrice = total.data[0].totalSum
                    // console.log('Total: ', getTotalPrice);
                    this.setState({ amount : getTotalPrice})
                } else {
                    this.setState({amount : 0})
                }
            })
    };
    /*  For updating the items  */
    inputItemHandler = (event) => {
        // console.log('event inputItem: ', event.target)
        const value = event.target.value;
        const _id = event.target.id;
        const name = event.target.name;
        // console.log('id, name, value ',_id, name, value)
        const listt = this.state.allList.slice();
        // const listt = this.state.dateListItems.slice();
        // console.log('list',listt);
        // const list = this.state.date
        let lt = null;
        const list = listt;
        for(let ls in list){
            if(list[ls]._id === _id){
                if(name === 'item'){
                    // console.log('itmsssss', list[ls])
                    list[ls].item = value;
                } else if (name === 'price'){
                    list[ls].price = value;
                }
                lt = ls;
                // console.log('list',list[ls]);
            }
        }
        this.setState({ tmpItems: list[lt], editList: true, editVal: _id})
        // console.log('Edit item List: ', this.state.tmpItems);
    }
    /*  It update the Item from DB  */
    updateAllHandler =(event) => {
        // console.log('event Update', event.target)
        const _id = event.target.id;
        const tmpItems = {...this.state.tmpItems};
        // console.log('tmpItems:', tmpItems)
        axios.put('/updateItems/'+_id,{
            data: {
                item: tmpItems.item,
                price: tmpItems.price,
                updated_date: moment().format()
            }
        })
        .then( res => {
            this.totalPriceHandler();
            this.dateWiseItemHandler();
            // console.log('Updated Item: ',res);
        })
        this.setState({ editList: false, editVal: null})
    };

    dateWiseItemHandler = () => {
        // console.log('date ITem List: ', this.state.allList);
        axios.get('/itemList/date')
        .then(res => {
            // console.log('date res: ',res.data)
            const dateList = [];
            for( let i in res.data){
                dateList.push({
                    ...res.data[i]
                })
            }
            this.setState({ dateListItems: dateList})
            this.totalPriceHandler();
            // console.log('dateList',this.state.dateListItems)
        })
    }
    render() {
        const {activeItem, activeIndex} = this.state;
        // const panels = [
        //  {  title: 'Date', content: ['Hot date'].join(' ') },
        //  {  title: 'Time', content: ['Hot Time'].join(' ')  }
        // ]
        return (
            <Aux>
                <div className={classes.ExpenseControl}>
                <Grid container relaxed>
                {/* <Grid.Row columns={3}> */}
                    <Grid.Column width={3} floated="left"> 
                    <Menu  fluid pointing secondary vertical>
                        <Menu.Item as={Link} to='/' name="dashboard" 
                            active={activeItem === 'dashboard'} 
                            onClick={this.handleItemClick}>
                        </Menu.Item>
                        <Menu.Item as={Link} to='/allitems' name='allitems' 
                            active={activeItem === 'allitems'} 
                            onClick={this.handleItemClick} >
                        </Menu.Item>
                        <Button primary onClick={this.itemListHandler} >Show List</Button>
                    </Menu>
                    </Grid.Column>
                    <Grid.Column width={10}> 
                        <InputControllers
                            // today={this.state.date}
                            // inputDate={this.InputDate}
                            itemList={this.state.itemList}
                            inputChanged={this.InputHandler}
                            saveItem={this.saveItemsHandler}
                            totalPrice = {this.state.amount}
                            // clearItem={this.clearItemHandler}
                        /> 
                        { this.state.dateListItems ? <AccordionList 
                            dateList = {this.state.dateListItems}
                            deleteItem={this.deleteItemHandler}
                            updateItem = {this.updateAllHandler}
                            isEdit = {this.state.editList}
                            editVal = {this.state.editVal}
                            changedInput={this.inputItemHandler}
                        /> : null }
                        <div>
                            {/* <Accordion defaultActiveIndex={[0]} panels={panels} exclusive={false}/> */}
                            {/* <Accordion fluid styled exclusive={false}>
                                <Accordion.Title  active = { activeIndex === 0} 
                                index={0} onClick={this.handleClick}>
                                    <p><Icon name='dropdown'></Icon> 
                                    Date : </p>
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 0}> */}
                                    <Card
                                        all = {this.state.allList}
                                        deleteItem={this.deleteItemHandler}
                                        updateItem = {this.updateAllHandler}
                                        isEdit = {this.state.editList}
                                        editVal = {this.state.editVal}
                                        changedInput={this.inputItemHandler}
                                    /> 
                                {/* </Accordion.Content> */}
                                {/* <Accordion.Title active = {activeIndex === 1} 
                                index={1} onClick={this.handleClick}>
                                    <Icon name='dropdown'/>
                                    Time
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 1}>
                                <p> Hot Time </p>
                                </Accordion.Content> */}
                            {/* </Accordion> */}
                            {/* <Card
                                all = {this.state.allList}
                                deleteItem={this.deleteItemHandler}
                                updateItem = {this.updateAllHandler}
                                isEdit = {this.state.editList}
                                editVal = {this.state.editVal}
                                changedInput={this.inputItemHandler}
                            />  */}
                        </div>
                        
                    </Grid.Column>
                        {/* <Input type='text' onChange={this.inputItemHandler} name='items' /> */}
                    <Grid.Column width={3}> 
                    </Grid.Column>
                {/* </Grid.Row> */}
                </Grid>   
                </div>             
            </Aux>
        );
    }
}

export default ExpenseManager;
