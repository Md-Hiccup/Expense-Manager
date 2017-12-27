import React from 'react';

const ListItem = (props) => (
    <div>
        <h3>{props.itemName}</h3>
        <p>{props.priceOfItem}</p>
    </div>
);

export default ListItem;
