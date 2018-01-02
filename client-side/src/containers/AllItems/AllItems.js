import React, {Component} from 'react';
import axios from '../../axios-orders';

import  ListControllers from '../../components/ListControllers/ListControllers';

class AllItems extends Component {
    state = {
        all : []
    };
    componentDidMount() {
        axios.get('/itemList')
            .then(res => {
                // const fetchLists = [];
                console.log(res);
                // for (let key in res.data)
            })

    }
    render (){
        return (
            <div>
                <h3 style={{textAlign:'center', padding: '30px'}}>List of Items</h3>
                <ListControllers
                    listOfItem = {this.state.all}
                />
            </div>
        )
    }
}

export default AllItems;