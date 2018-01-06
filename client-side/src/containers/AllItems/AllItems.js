import React, {Component} from 'react';
import axios from '../../axios-orders';

import Card from '../../components/card/card';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../components/InputControllers/Button/Button';
import classes from './AllItems.css';

class AllItems extends Component {
    constructor(){
        super();
        this.state = {
            itemList:[],
            all : [],
            totalPrice: [],
            content: true
        };
    }
    InputItemHandler = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        const name = event.target.name;
        var list = {...this.state.all[0].Items};
        for(let ls in list){
            if(list[ls].id === +id){
                if(name === 'name'){
                    list[ls].name = value;
                } else if (name === 'price'){
                    list[ls].price = value;
                }
                console.log('list',list[ls]);
            }
        }
        this.setState({
            itemList : list
        });
        // console.log('itemList',this.state.itemList);

    };
    updateAllHandler =() => {
        // alert('update all on process');
        const ItemUpdate = {...this.state.itemList}
        console.log('update');
        for(let upd in ItemUpdate) {
            console.log('item', ItemUpdate[upd].id," ",upd);
            axios.put('/updateItems', {
                id: ItemUpdate[upd].id,
                name: ItemUpdate[upd].name,
                price:ItemUpdate[upd].price
            })
                .then(function (result) {
                    console.log('res', result)
                })
        }
    };

    itemListHandler= () => {
        axios.get('/itemList', {
            params: {
                uid: 1
            }
        })
            .then(res => {
                const fetchLists = [];
                for (let key in res.data) {
                    fetchLists.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({all: fetchLists});
            })
            .catch(err => {
                // console.log(err);
                return err;
            });
    };
    deleteItemHandler= (event)=> {
        const del = event.target.id;
        console.log(del);
        axios.delete('/deleteItems?uid=1&id='+del)
            .then(res => {
                if(res.data.status === 200){
                    console.log(this.props);
                    this.itemListHandler();
                }else {
                    alert('error in deletion');
                }
            })
            .catch(err => {
                return err;
            });
    };

    render (){
        return (
            <div>
                <div className={classes.Display}>
                    <Button btnType="List" clicked={this.itemListHandler}>List</Button>
                    <Button btnType="Update" clicked={this.updateAllHandler}>Update</Button>
                </div>
                <div>
                    {this.state.all.map(list => {
                        return <Card
                            key = {list.id}
                            items={list.Items}
                            deleteItem={this.deleteItemHandler}
                            changedInputItem={this.InputItemHandler}
                            updateItem = {this.updateAllHandler}
                        />
                    })
                    }
                </div>
            </div>
        )
    }
}

export default withErrorHandler(AllItems, axios);
