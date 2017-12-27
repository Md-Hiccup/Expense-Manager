import React from 'react';

import ListItem from './ListItem/ListItem';

const ListItems = (props) => {
    return (
        <div>
            {props.itemName.map(itemList => (
                <ListItem
                    itemName={itemList.items}
                    priceOfItem = {itemList.price}

                />
            ))}
        </div>
    )
};

export default ListItems;