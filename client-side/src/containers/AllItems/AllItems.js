import React, {Component} from 'react';
import axios from '../../axios-orders';

class AllItems extends Component {
    state = {
        list: [],
    };
    componentDidMount(){
        axios.get('/')
            .then(res => {
                console.log(res);
            })
    }

    render (){
        return (
            <div>
                <h3>List of Items</h3>
            </div>
        )
    }
}

export default AllItems;