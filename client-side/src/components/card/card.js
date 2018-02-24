import React from 'react';

// import classes from './card.css';
import CardItem from './cardItem/cardItem';

const card = (props) => {
    // console.log('Card props',props);
    const items = props.all;
    const allItem = [];
    for (let index in items) {
        // console.log(index+ " " +props.items[index].name);
        // console.log(props.items[index].name);
        allItem.push({
            id: items[index]._id,
            itemName: items[index].name,
            itemPrice: items[index].price,
            date : items[index].dates
        });
    }
    const itemsListOutput = allItem.map(il => {
        // console.log('il',il.id)
        return (
            <CardItem
                key = {il.id}
                items={il}
                deleteItem={props.deleteItem}
                // changedInputItem={props.changedInputItem}
                // updateItem = {props.updateItem}
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