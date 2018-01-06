import React from 'react';

import classes from './card.css';
import CardItem from './cardItem/cardItem';

const card = (props) => {
    const allItem = [];
    for (let index in props.items) {
        // console.log(index+ " " +props.items[index].name);
        // console.log(props.items[index].name);
        allItem.push({
            id: props.items[index].id,
            itemName: props.items[index].name,
            itemPrice: props.items[index].price
        });
    }
    const itemsListOutput = allItem.map(il => {
        return (
            <CardItem
                key = {il.id}
                items={il}
                deleteItem={props.deleteItem}
                changedInputItem={props.changedInputItem}
                updateItem = {props.updateItem}
            />
        )
    });
    return (
        <div>
            {itemsListOutput}
        </div>
    )
};

export default card;