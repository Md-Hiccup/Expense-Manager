import React from 'react';

const listItem = (props) => (
    <li>
        <p>{props.itemName} :  {props.itemPrice}</p>
    </li>
);

export default listItem;
