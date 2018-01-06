import React from 'react';

import classes from './cardItem.css';

const cardItem = (props) => {
    return (
        <div className={classes.Card}>
            <p style={{width: '100%'}}>
                <input
                    type="text" name='name' className={classes.Inp}
                    id={props.items.id} defaultValue={props.items.itemName} onChange={props.changedInputItem}/>
                <input
                    type="text" name='price' className={classes.Inp}
                    id={props.items.id} defaultValue={props.items.itemPrice} onChange={props.changedInputItem}/>

            </p>
            <p className={classes.Button}>
                {/*<button className={classes.Upd} onClick={props.updateItem} id ={props.items.id}>Update</button>*/}
                <button className={classes.Close} onClick={props.deleteItem} id={props.items.id}>Delete</button>
            </p>
        </div>
    )
};

export default cardItem;