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
            all : [],
            totalPrice: [],
            content: true
        };
    }
    itemListHandler= () => {
        axios.get('/itemList',
            {
                params: {
                    uid: 1
                }
            })
            .then(res => {
                const fetchLists = [];
                for (let key in res.data) {
                    // console.log(res.data[key]);
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
                  this.props.history.push('/')
              }else {
                  alert('error in deletion');
              }
            })
            .catch(err => {
                return err;
            })
    };

    render (){
        return (
            <div>
                <div className={classes.Display}>
                    <Button btnType="List" clicked={this.itemListHandler}>List</Button>
                    <Button btnType="Update" clicked={this.updateHandler}>Save</Button>
                </div>
                <div>
                    {this.state.all.map(list => {
                        return <Card
                            key = {list.id}
                            items={list.Items}
                            deleteItem={this.deleteItemHandler}
                        />
                    })
                    }
                </div>
            </div>
        )
    }
}

export default withErrorHandler(AllItems, axios);
