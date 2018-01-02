import React, {Component} from 'react';
import axios from '../../axios-orders';

import Items from './items/items';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class AllItems extends Component {
    state = {
        all : []
    };
    componentDidMount() {
        axios.get('/itemList?uid=1')
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
            })
    }
    render (){
        return (
            <div>
                <h3 style={{textAlign:'center', padding: '30px'}}>List of Items</h3>
                {this.state.all.map(list => {
                    {/*console.log(list);*/}
                    return <Items
                        key = {list.id}
                        items={list.Items}
                        id={list.id}
                    />
                })}
            </div>
        )
    }
}

export default withErrorHandler(AllItems, axios);