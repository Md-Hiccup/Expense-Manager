import React, {Component } from 'react';

import Aux from '../../hoc/Aux';
import ListControllers from '../../components/ListControllers/ListControllers';

class ExpenseManager extends Component {
    state = {
        itemList: {
            items: '',
            price: '',
        },
        count: 0 ,
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

        alert('Item : ' + list.items+'\nPrice : '+list.price +"\nAdded Successfully");
        event.preventDefault();
        this.setState({itemList: list});
        console.log(list);
        this.emptyInput(list);
    };
    emptyInput(list){
        list.items='';
        list.price='';
        this.setState({itemList: list});
    }
    render() {
        return (
            <Aux>
                <ListControllers
                    itemList = {this.state.itemList}
                    inputChanged = {this.InputHandler}
                    addItem={this.addItemHandler}
                    reset = {this.resetHandler}
                />
            </Aux>
        );
    }
}

export default ExpenseManager;

/*
 items = {this.state.items}
 price = {this.state.price}*/
