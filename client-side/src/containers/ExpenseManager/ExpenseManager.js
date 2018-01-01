import React, {Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/Aux/Aux';
import InputControllers from '../../components/InputControllers/InputControllers';
import ListControllers from '../../components/ListControllers/ListControllers';

class ExpenseManager extends Component {
    constructor(){
        super();
        const date = new Date(),
            today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

        this.state = {
            itemList: {
                items: 'ColdCoffee',
                price: '10',
            },
            allList: [],
            count: 0,
            todaysDate: today
        }
    };
    InputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        var list = {...this.state.itemList};
        list[name]=value;
        this.setState({
            itemList:list
        });
    };
    addItemHandler = (event) => {
        let list = {...this.state.itemList};
        // alert('Item : ' + list.items+'\nPrice : '+list.price +"\nAdded Successfully");
        event.preventDefault();
        this.setState({itemList: list});
        this.showList(list);
        this.emptyInput(list);
    };
    showList(list){
        let count = this.state.count;
        const allItem = {...this.state.allList};
        allItem[count] = {
            items: list.items,
            price: list.price
        };
        count = count+1;
        this.setState({allList: allItem, count : count});
        console.log(allItem);
    }
    emptyInput(list){
        list.items='';
        list.price='';
        this.setState({itemList: list});
    }

    saveItemsHandler = () => {
        const data = {
            name:'Cold Cold Coffee',
            price:10,
            uid: 1,
            dates: '2017-12-30'
        };
        // axios.get('https://localhost:3005/')
        //     .then(res => {
        //         console.log(res);
        //     });
        // alert(Object.keys(data).map(d => {
        //     console.log(d)
        // }));
        axios.post('http://localhost:3005/addItems',data)
            .then(res => {
                console.log(res);
                alert(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        // console.log(this.state.allList);
        return (
            <Aux>
                <InputControllers
                    itemList = {this.state.itemList}
                    inputChanged = {this.InputHandler}
                    addItem={this.addItemHandler}
                    today = {this.state.todaysDate}
                    saveItem = {this.saveItemsHandler}
                />
                <ListControllers
                    listOfItem = {this.state.allList}
                />
            </Aux>
        );
    }
}

export default ExpenseManager;

/*
 items = {this.state.items}
 price = {this.state.price}*/
