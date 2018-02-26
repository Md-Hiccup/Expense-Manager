import React from 'react';
import { Table, Button } from 'semantic-ui-react';

// import classes from './cardItem.css';

const cardItem = (props) => {
    // console.log('cardItem', props);
    // const ct = props.items.date;
    // const date = new Date(ct).toDateString();
    const cd = props.items;
    return (
        <Table.Row id={cd.id}>
            <Table.Cell>{+cd.s+1}</Table.Cell>
            <Table.Cell>{cd.itemName}</Table.Cell>
            <Table.Cell>{cd.itemPrice}</Table.Cell>
            <Table.Cell>{cd.date}</Table.Cell>
            <Table.Cell collapsing>
                <Button circular color='red' icon='close' id={cd.id} 
                onClick={props.deleteItem}
                />
            </Table.Cell>
        </Table.Row>
    )
};

export default cardItem;