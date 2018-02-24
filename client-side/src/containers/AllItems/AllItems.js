import React, {Component} from 'react';
import axios from '../../axios-orders';

import classes from './AllItems.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../components/InputControllers/Button/Button';
import List from '../../components/List/List';
import TotalPrice from '../../components/TotalPrice/TotalPrice';

class AllItems extends Component {
    constructor(){
        super();
        this.state = {
            itemList:[],
            all : [],
            totalPrice: [],
            content: true,
            showList: false,
            showPrice: false
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
        axios.get('/itemList',
        // {   params: {
                    // uid: 1
        //  }      }
        )
            .then(res => {
                console.log('res', res);
                const fetchLists = [];
                for (let key in res.data) {
                    fetchLists.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({all: fetchLists, showList: !this.state.showList});
                // console.log('all',fetchLists);
            })
            .catch(err => {
                // console.log(err);
                return err;
            });
    };
    deleteItemHandler= (event)=> {
        const del = event.target.id;
        // console.log(del);
        axios.delete('/deleteItems?uid=1&id='+del)
            .then(res => {
                if(res.data.status === 200){
                    this.itemListHandler();
                    console.log('delete',this.props);
                }else {
                    alert('error in deletion');
                }
            })
            .catch(err => {
                return err;
            });
    };
    totalPriceHandler = () => {
        axios('/totalPrice?uid=1')
            .then(total => {
                this.setState({totalPrice: total.data[0], showPrice : !this.state.showPrice});
            })
    };
    render (){
        return (
            <div>
                <div className={classes.Display}>
                    <Button btnType="List" clicked={this.itemListHandler}>List</Button>
                    <Button btnType="List" clicked={this.totalPriceHandler}>TotalPrice</Button>
                    <Button btnType="Update" clicked={this.updateAllHandler}>Update</Button>
                </div>

                {this.state.showList ?
                    <List
                        deleteItem={this.deleteItemHandler}
                        changedInputItem={this.InputItemHandler}
                        updateItem = {this.updateAllHandler}
                        all = {this.state.all}
                    />: null}

                {this.state.showPrice ? <TotalPrice totalPrice={this.state.totalPrice.totalPrice} /> : null}
            </div>
        )
    }
}

export default withErrorHandler(AllItems, axios);
