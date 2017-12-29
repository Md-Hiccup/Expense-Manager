import React from 'react';

import InputItems from './InputItems/InputItems';
import Month from './Month/Month';
import classes from './InputControllers.css';


const inputControllers = (props) => {

    return (
        <div className={classes.InputControllers}>
            <Month today = {props.today}/>
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
