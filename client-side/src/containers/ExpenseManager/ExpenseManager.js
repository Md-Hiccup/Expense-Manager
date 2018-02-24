import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Grid, Menu, Button } from 'semantic-ui-react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import InputControllers from '../../components/InputControllers/InputControllers';
import ListControllers from '../../components/ListControllers/ListControllers';
import classes from './ExpenseManager.css';
import Card from '../../components/card/card';
// import List from '../../components/List/List';

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
            count: 0,
            activeItem: 'dashboard',
            showInput: false,
            showList:false,
            noItem: true
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
        // console.log('event', event);
        const value = event.target.value;
        const name = event.target.name;
        const list = { ...this.state.itemList };
        list[name] = value;
        this.setState({
            itemList: list
        });
    };
    // addItemHandler = (event) => {
    //     let list = { ...this.state.itemList };
    //     // alert('Item : ' + list.items+'\nPrice : '+list.price +"\nAdded Successfully");
    //     event.preventDefault();
    //     this.setState({ itemList: list, noItem: false});
    //     this.showList(list);
    //     this.saveItemsHandler(list);
    //     this.emptyInput(list);
    // };
    showList(list) {
        let count = this.state.count;
        const allItem = { ...this.state.addItem };
        console.log('allItem',allItem);
        // const date = { ...this.state.date };
        allItem[count] = {
            // id : count,
            items: list.items,
            price: list.price,
            // dates: moment(date).format('YYYY-MM-DD')
        };
        count = count + 1;
        // this.itemListHandler();
        this.setState({ count: count , noItem: false});
        // this.saveItemsHandler(list);
    }
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
        const count = this.state.count;
        const saveItem = {
            // id : count,
            name: list.items,
            price: list.price,
            dates: moment(date).format('YYYY-MM-DD')
        }
        // console.log('saveItem', saveItem);
        axios.post('/addItems', saveItem)
            .then(res => {
                return res;
            }).then(result => {
                this.setState({ addItem: result.data, itemList:list})
                console.log('addITem', this.state.addItem);        
                this.showList(this.state.itemList);
                // this.emptyInput(list);
            })
            .catch(err => console.error(err));
    };
    // deleteItemHandler= (event)=> {
    //     const del = event.target.id;
    //     // console.log(del);
    //     axios.delete('/deleteItems?uid=1&id='+del)
    //         .then(res => {
    //             if(res.data.status === 200){
    //                 this.itemListHandler();
    //                 console.log('delete',this.props);
    //             }else {
    //                 alert('error in deletion');
    //             }
    //         })
    //         .catch(err => {
    //             return err;
    //         });
    // };
    deleteItemHandler= (event)=> {
        const del = event.target.id;
        console.log();
        console.log('del id: ',del);
        axios.delete('/deleteItems',{
            params: { id: del}
        })
            .then(res => {
                // console.log('res: data: ',res)
                if(res.status === 200){
                    this.itemListHandler();
                    this.setState({noItem : true});
                    console.log('status 200');
                }
                console.log(res);
            })
        
    };
    itemListHandler= () => {
        axios.get('/itemList', {
            params: {
                uid: 1
            }
        })
        .then(res => {
            // console.log('res itemList',res)
            const fetchLists = [];
            for (let key in res.data) {
                fetchLists.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({allList: fetchLists, showList: !this.state.showList});
            // console.log('all',fetchLists);
        })
        .catch(err => {
            // console.log(err);
            return err;
        });
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
                        <Button primary onClick={this.itemListHandler} >Show List</Button>
                    </Menu>
                    </Grid.Column>
                    <Grid.Column width={10}> 
                        <InputControllers
                            // today={this.state.date}
                            // inputDate={this.InputDate}
                            itemList={this.state.itemList}
                            inputChanged={this.InputHandler}
                            addItem={this.addItemHandler}
                            saveItem={this.saveItemsHandler}
                            // clearItem={this.clearItemHandler}
                        />  
                        <div>
                            { this.state.noItem ? null : <ListControllers
                                delItem = {this.deleteItemHandler}
                                list ={this.state.addItem}
                            />}
                        </div>
                        <div>
                        {/* {this.state.showList ? */}
                            <Card
                                all = {this.state.allList}
                                deleteItem={this.deleteItemHandler}
                                // changedInputItem={this.InputItemHandler}
                                // updateItem = {this.updateAllHandler}
                            /> 
                             {/* : null}   */}
                        </div>
                    </Grid.Column>
            
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
