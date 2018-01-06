import React from 'react';

import classes from './card.css';
import Button  from '../../components/InputControllers/Button/Button';

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
            <div
                className={classes.Card}
               key={il.id}>
                <p>{il.itemName} : {il.itemPrice}</p>
                <button className={classes.Clear} onClick= {props.deleteItem} id={il.id}>X</button>
            </div>
        )
    });
    return (
        <div>
            {itemsListOutput}
        </div>
    )
};

export default card;