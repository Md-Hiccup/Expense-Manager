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

class ExpenseManager extends Component {
    constructor() {
        super();
        // const date = new Date(),
        // today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        this.state = {
            itemList: {
                items: 'Biryani',
                price: '80',
            },
            date: moment(),
            allList: [],
            activeItem: 'dashboard',
            amount: 0,
            editList: false,
            editVal : null,
            tmpItems :[]
        }
    };

    /*  IT calls After render() */
    componentDidMount() {
        this.itemListHandler();
    }

    /* To handle the side Tab click */
    handleItemClick = (e, {name}) => { this.setState({ activeItem: name})}

    // InputDate = (date) => {
    //     console.log('date', date);
    //     this.setState({ date: date })
    // };

    /*  For input change in Addition of Item */
    InputHandler = (event) => {
        // console.log('event: ', event.target);
        const value = event.target.value;
        const name = event.target.name;
        const list = { ...this.state.itemList };
        list[name] = value;
        this.setState({ itemList: list  });
    };
    /*  It empty the adding input Items */
    emptyInput(list) {
        list.items = '';
        list.price = '';
        this.setState({ itemList: list });
    }
    // clearItemHandler = () => {
    //     this.setState({ allList: [] });
    // };
    /*  It save the Item to DB  */
    saveItemsHandler = () => {
        let list = { ...this.state.itemList };
        const date = { ...this.state.date };
        const ress = this.state.allList.slice();
        const saveItem = {
            // id : count,
            name: list.items,
            price: list.price,
            dates: moment(date).format('ll')
        }
        // console.log('saveItem', saveItem);
        axios.post('/addItems', saveItem)
            .then(res => {
                return res;
            }).then(result => {
            ress.push(
                result.data
            )
            this.setState({ allList: ress, itemList:list})
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
                // console.log('Item Deleted: ',res);
            }
        })
        .catch(err => { return console.error('Error: ',err); });
    };
    /*  It list the all Items from DB   */
    itemListHandler= () => {
        axios.get('/itemList', {
            params: {   uid: 1  }
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
            this.setState({allList: fetchLists});
            this.totalPriceHandler();
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
        // console.log('event', event.target)
        const value = event.target.value;
        const _id = event.target.id;
        const name = event.target.name;
        const list = this.state.allList.slice();
        let lt = null;
        for(let ls in list){
            if(list[ls]._id === _id){
                if(name === 'items'){
                    // console.log('itmsssss', list[ls])
                    list[ls].name = value;
                } else if (name === 'price'){
                    list[ls].price = value;
                }
                lt = ls;
                // console.log('list',list[ls]);
            }
        }
        this.setState({ tmpItems: list[lt], editList: true, editVal: _id})
        // console.log('Edit item List: ', this.state.editList);
    }
    /*  It update the Item from DB  */
    updateAllHandler =(event) => {
        const _id = event.target.id;
        const tmpItems = this.state.tmpItems;
        // console.log('tmpItems:', tmpItems)
        axios.put('/updateItems/'+_id,{
            data: {
                name: tmpItems.name,
                price: tmpItems.price
            }
        })
        .then( res => {
            this.totalPriceHandler();
            // console.log('Updated Item: ',res);
        })
        this.setState({ editList: false, editVal: null})
    };

    render() {
        const {activeItem} = this.state;

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
                        <Button primary onClick={this.totalPriceHandler} >Show List</Button>
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
                        <div>
                            <Card
                                all = {this.state.allList}
                                deleteItem={this.deleteItemHandler}
                                updateItem = {this.updateAllHandler}
                                isEdit = {this.state.editList}
                                editVal = {this.state.editVal}
                                changedInput={this.inputItemHandler}
                            /> 
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
