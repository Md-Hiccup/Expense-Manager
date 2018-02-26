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
                items: 'ColdCoffe',
                price: '10',
            },
            date: moment(),
            allList: [],
            addItem: [],
            activeItem: 'dashboard',
            amount: 0,
            editList: false,
            tmpItems :[]
        }
    };
    componentDidMount() {
        this.itemListHandler();
    }

    handleItemClick = (e, {name}) => { this.setState({ activeItem: name})}

    // InputDate = (date) => {
    //     console.log('date', date);
    //     this.setState({ date: date })
    // };
    InputHandler = (event) => {
        console.log('event: ', event.target);
        const value = event.target.value;
        const name = event.target.name;
        const list = { ...this.state.itemList };
        list[name] = value;
        this.setState({ itemList: list  });
    };
    
    emptyInput(list) {
        list.items = '';
        list.price = '';
        this.setState({ itemList: list });
    }
    // clearItemHandler = () => {
    //     this.setState({ allList: [] });
    // };
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
            console.log('all',fetchLists);
        })
        .catch(err => { return console.eroor('Error: ',err); });
    };

    totalPriceHandler = () => {
        // console.log('total Price handler: ')
        axios('/totalPrice')
            .then(total => {
                if(total.data[0] !== undefined){
                    const getTotalPrice = total.data[0].totalSum
                    console.log('Total: ', getTotalPrice);
                    this.setState({ amount : getTotalPrice})
                } else {
                    this.setState({amount : 0})
                }
            })
    };
    inputItemHandler = (event) => {
        // console.log('event', event.target)
        const value = event.target.value;
        const id = event.target.id;
        const name = event.target.name;
        const list = this.state.allList.slice();
        // console.log('lisstttt', list);
        for(let ls in list){
            if(list[ls]._id === id){
                if(name === 'items'){
                    // console.log('itmsssss', list[ls])
                    list[ls].name = value;
                } else if (name === 'price'){
                    list[ls].price = value;
                }
                // console.log('list',list[ls]);
                this.setState({ tmpItems: list[ls], editList: true})
            }
        }
        console.log('input Item editList: ', this.state.editList);
    }
    updateAllHandler =(event) => {
        // const ItemUpdate = {...this.state.itemList}
        // for(let upd in ItemUpdate) {
            // console.log('item');
        //     axios.put('/updateItems', {
        //         id: ItemUpdate[upd].id,
        //         name: ItemUpdate[upd].name,
        //         price:ItemUpdate[upd].price
        //     })
        //         .then(function (result) {
        //             console.log('res', result)
        //         })
        // }
        const t_id = event.target.id;
        console.log('Update Handler: ',t_id);
        this.setState({ editList: false})
        console.log('Update editList: ',this.state.editList)
        // axios.put('/'+t_id)
        // .then( res => {
        //     console.log('Update Item: ',res);
        // })
        
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
