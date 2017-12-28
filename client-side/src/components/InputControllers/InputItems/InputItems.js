import React from 'react';

import classes from './InputItems.css';
import Button from '../Button/Button';

const InputItems = (props) => {
    return (
        <div className={classes.InputItems}>
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
                <Button btnType='Add' clicked={props.addItem}>ADD</Button>
            </form>
        </div>
    )
};

export default InputItems;