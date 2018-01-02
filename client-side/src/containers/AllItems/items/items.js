import React from 'react';

import classes from './items.css';

const items = (props) => {
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
        console.log(il);
        return <li
            key={il.id}
            style={{
                textTransform: 'capitalize',
                display:'inlin-block',
                margin: '4px 8px',
                padding: '5px'
            }}
            >{il.itemName} : {il.itemPrice} </li>
    });

    return (
        // console.log(props)
        <div className={classes.Items}>
            <ul>{itemsListOutput}</ul>
        </div>
    )
}
export default items;