import React from 'react';

import InputItems from './InputItems/InputItems';
// import ListItem from './ListItems/ListItem/ListItem';

const ListControllers = (props) => {

    return (
        <div>
            <InputItems
                itemList ={(items) => {props.itemList(items)}}
                addItem={props.addItem}
                reset = {props.reset}
                inputChanged = {props.inputChanged}
            />
            {/*{list}*/}
           {/*<ListItems
                itemName= {props.items}
                price = {props.price}
           />*/}
        </div>
    )
};

export default ListControllers;

/*
items = {props.items}
price = {props.price}*/
