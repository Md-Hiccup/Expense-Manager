import React from 'react';
import { Table } from 'semantic-ui-react';

// import classes from './card.css';
import CardItem from './cardItem/cardItem';

const card = (props) => {
    // console.log('Card props',props);
    const items = props.all;
    const allItem = [];
    for (let index in items) {
        allItem.push({
            s : index,
            id: items[index]._id,
            itemName: items[index].name,
            itemPrice: items[index].price,
            date : items[index].dates
        });
    }
    // console.log('allItem: ',allItem);
    const itemsListOutput = allItem.map(il => {
        // console.log('il',il.id)
        return (
            <CardItem
                key = {il.id}
                items={il}
                deleteItem={props.deleteItem}
                changedInput={props.changedInput}
                updateItem = {props.updateItem}
                isEdit = {props.isEdit} 
            />
        )
    });
    return (
        <Table color='red'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={2}>No.</Table.HeaderCell>
                    <Table.HeaderCell width={5}>Items</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Price</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Date</Table.HeaderCell>
                    <Table.HeaderCell width={2}/>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {itemsListOutput}
            </Table.Body>
        </Table>
        
    )
};

export default card;