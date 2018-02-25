import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

// import classes from './ListControllers.css';
import ListItems from './ListItems/ListItems';

class ListControllers extends Component {

    render() {
        const dd = this.props.list;
        // console.log('List Controller: ', this.props)
        const totals = [];
        for(let i in dd){
            totals.push({
                sno : dd[i].sno,
                id : dd[i].id,
                item : dd[i].items,
                price: dd[i].price
            })
        }
        // console.log('List controllers totals: ', totals);
        let totalItems = totals.map(tt => {
            return (
                <ListItems 
                    key = {tt.sno}  items= {tt}
                    delItem= {this.props.delItem}
                />               
            )
        })
        return (
            <Table color='red'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={2}>S No.</Table.HeaderCell>
                        <Table.HeaderCell width={8}>Items</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Price</Table.HeaderCell>
                        <Table.HeaderCell width={2}/>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {totalItems}
                </Table.Body>
            </Table>
        )
}
};

export default ListControllers;