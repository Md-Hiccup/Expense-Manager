import React from 'react';

import classes from './InputItems.css';

const InputItems = (props) => {
    return(
        <div>
            <h4>Months</h4>
            <p>
                <input className={classes.InputItems} type="text" name="inputItems" id="inputItems" />
            </p>
        </div>
    )
};

export default InputItems;