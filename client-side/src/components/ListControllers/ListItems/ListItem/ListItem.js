import React from 'react';
import { Table } from 'semantic-ui-react';

const listItem = (props) => {
    // console.log(props);
    return (
        <div>
            <Table.Cell></Table.Cell>
            {/* <Table.Cell>{props.itemName}</Table.Cell> */}
            {/* <Table.Cell>{props.itemPrice}</Table.Cell> */}
        </div>
    )
}

export default listItem;
