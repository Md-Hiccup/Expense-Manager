import React from 'react';

import InputItems from './InputItems/InputItems';
// import ListItem from './ListItems/ListItem/ListItem';

const ListControllers = (props) => {

    return (
        <div>
            <InputItems
                itemList ={props.itemList}
                inputChanged = {props.inputChanged}
                addItem={props.addItem}
                reset = {props.reset}
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
