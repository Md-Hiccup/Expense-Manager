import React from 'react';

import Card from '../../components/card/card';

const list = (props) => {
    console.log(props.all);
    return (
        <div>{props.all.map((list, index) => {
            console.log('index',list);
            return <Card
                key = {list.id}
                items={list}
                // deleteItem={props.deleteItem}
                // changedInputItem={props.changedInputItem}
                // updateItem = {props.updateItem}
            />
        })
        } </div>
    )
};

export default list;