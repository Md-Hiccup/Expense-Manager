import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Aux from '../../hoc/Aux/Aux';
import InputControllers from '../../components/InputControllers/InputControllers';
import ListControllers from '../../components/ListControllers/ListControllers';
import classes from './ExpenseManager.css';

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
            count: 0,
        }
    };
    InputDate = (date) => {
        console.log('date', date);
        this.setState({ date: date })
    };
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
    addItemHandler = (event) => {
        let list = { ...this.state.itemList };
        // alert('Item : ' + list.items+'\nPrice : '+list.price +"\nAdded Successfully");
        event.preventDefault();
        this.setState({ itemList: list });
        this.showList(list);
        this.emptyInput(list);
    };
    showList(list) {
        // console.log('showList', list);
        let count = this.state.count;
        const allItem = { ...this.state.allList };
        allItem[count] = {
            items: list.items,
            price: list.price,
        };
        count = count + 1;
        this.setState({ allList: allItem, count: count });
    }
    emptyInput(list) {
        list.items = '';
        list.price = '';
        this.setState({ itemList: list });
    }
    clearItemHandler = () => {
        this.setState({ allList: [] });
    };
    saveItemsHandler = () => {
        const items = { ...this.state.allList };
        const date = { ...this.state.date };
        const saveItem = Object.keys(items).map(il => {
            // console.log(items[il]);
            const data = {
                uid: 1,
                name: items[il].items,
                price: items[il].price,
                dates: moment(date).format('YYYY-MM-DD')
            };
            return data;
        });
        console.log('saveItem', saveItem);
        for (let item in saveItem) {
            // console.log('item ',item);
            axios.post('/addItems', saveItem[item])
                .then(res => {
                    // console.log(saveItem);
                    alert(Object.values(saveItem[item]));
                    return res
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    render() {
        return (
            <Aux>                
                <div className={classes.container}>
                    <h2 className={classes.title}>Total Expense: 00 </h2>
                    <InputControllers
                        itemList={this.state.itemList}
                        today={this.state.date}
                        inputChanged={this.InputHandler}
                        inputDate={this.InputDate}
                        addItem={this.addItemHandler}
                        saveItem={this.saveItemsHandler}
                        clearItem={this.clearItemHandler}
                    />
                </div>
                
                <ListControllers
                    listOfItem={this.state.allList}
                />
            </Aux>
        );
    }
}

export default ExpenseManager;
