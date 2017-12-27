import React from 'react';

import classes from './InputItems.css';

const InputItems = (props) => {
    return (
        <div className={classes.InputItems}>
            <h3>Months</h3>
            <form>
                <input
                    className={classes.Items}
                    type="text"
                    name="items"
                    value={props.itemList.items}
                    onChange={props.inputChanged}
                    placeholder="Enter Items"/>
                <input
                    className={classes.Price}
                    type="number"
                    name="price"
                    value={props.itemList.price}
                    onChange={props.inputChanged}
                    placeholder="$ Price"/>
                <button
                    className={classes.Add}
                    onClick={props.addItem}
                >ADD</button>
            </form>
        </div>
    )
};

export default InputItems;