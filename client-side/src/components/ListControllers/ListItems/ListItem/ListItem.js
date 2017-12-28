import React from 'react';

const listItem = (props) => (
    <li>
        <h3>{props.itemName} :  {props.itemPrice}</h3>
    </li>
);

export default listItem;
