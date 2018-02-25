import React from 'react';
import { Table, Button } from 'semantic-ui-react';

// import ListItem from './ListItem/ListItem';

const listItems = (props) => {
    // console.log('List Items: ',props);
    const li = props.items;
    return (
        <Table.Row >
            {/* <ListItem itemName={props.type} itemPrice={props.value}/> */}
            <Table.Cell>{li.sno+1}</Table.Cell>
            <Table.Cell>{li.item}</Table.Cell>
            <Table.Cell>{li.price}</Table.Cell>
            <Table.Cell collapsing>
                <Button circular color='red' icon='close' id={li.id} 
                onClick={props.delItem}
                />
            </Table.Cell>
        </Table.Row>
    )
};

export default listItems;