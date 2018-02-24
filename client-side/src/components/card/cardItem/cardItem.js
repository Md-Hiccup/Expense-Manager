import React from 'react';

import classes from './cardItem.css';

const cardItem = (props) => {
    // console.log('cardList', props);
    const ct = props.items.date;
    const date = new Date(ct).toDateString();
    return (
        <div>
            <p id={props.items.id}>{props.items.itemName}:{props.items.itemPrice}
            <button id={props.items.id} onClick={props.deleteItem}>X</button></p>            
        </div>
        // <div className={classes.Card}>
        //     <p style={{width: '100%'}}>
        //         <input
        //             type="text" name='name' className={classes.Inp}
        //             id={props.items.id} defaultValue={props.items.itemName} onChange={props.changedInputItem}/>
        //         <input
        //             type="text" name='price' className={classes.Inp}
        //             id={props.items.id} defaultValue={props.items.itemPrice} onChange={props.changedInputItem}/>
        //     </p>
        //     <p style={{width: '30%',padding: '10px'}}>date: {date}</p>
        //     <p className={classes.Button}>
        //         {/*<button className={classes.Upd} onClick={props.updateItem} id ={props.items.id}>Update</button>*/}
        //         <button className={classes.Close} onClick={props.deleteItem} id={props.items.id}>Delete</button>
        //     </p>
        // </div>
    )
};

export default cardItem;