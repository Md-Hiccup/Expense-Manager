import React from 'react';
import { Table, Button } from 'semantic-ui-react';

// import ListItem from './ListItem/ListItem';
const listItems = (props) => {
    console.log('listITems',props);
    return (
        <Table.Row id={props.id}>
            {/* <ListItem itemName={props.type} itemPrice={props.value}/> */}
            {/* <Table.Cell>{props.id+1}</Table.Cell> */}
            <Table.Cell>{props.item}</Table.Cell>
            <Table.Cell>{props.price}</Table.Cell>
            <Table.Cell collapsing>
                <Button circular color='red' icon='close' id={props.id} 
                // onClick={props.delItem}
                />
            </Table.Cell>
        </Table.Row>
    )
};

export default listItems;