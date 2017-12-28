import React from 'react';

import InputItems from './InputItems/InputItems';
import classes from './InputControllers.css';

const inputControllers = (props) => {

    return (
        <div className={classes.InputControllers}>
            <h3>Months</h3>
            <InputItems
                itemList ={props.itemList}
                inputChanged = {props.inputChanged}
                addItem={props.addItem}
                reset = {props.reset}
            />
        </div>
    )
};

export default inputControllers;

/*
 items = {props.items}
 price = {props.price}*/
