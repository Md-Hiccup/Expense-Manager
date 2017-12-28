import React from 'react';

import ListItem from './ListItem/ListItem';

const listItems = (props) => {
    return (
        <div>
            <ListItem itemName={props.type} itemPrice={props.value}/>
        </div>
    )
};

export default listItems;