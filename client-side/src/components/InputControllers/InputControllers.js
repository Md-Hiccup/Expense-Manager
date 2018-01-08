import React from 'react';

import InputItems from './InputItems/InputItems';
import classes from './InputControllers.css';

const inputControllers = (props) => {
    // console.log('inputController props', props);
    return (
        <div className={classes.InputControllers}>
            {/*<Month today = {props.today}/>*/}

            <InputItems
                today = {props.today}
                itemList ={props.itemList}
                inputChanged = {props.inputChanged}
                inputDate = {props.inputDate}
                addItem={props.addItem}
                saveItem={props.saveItem}
                clearItem = {props.clearItem}
            />
        </div>
    )
};

export default inputControllers;

/*
 items = {props.items}
 price = {props.price}*/
