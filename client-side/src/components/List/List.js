import React from 'react';

import Card from '../../components/card/card';

const list = (props) => {
    return (
        <div>{props.all.map(list => {
            return <Card
                key = {list.id}
                items={list.Items}
                deleteItem={props.deleteItem}
                changedInputItem={props.changedInputItem}
                updateItem = {props.updateItem}
            />
        })
        } </div>
    )
};

export default list;