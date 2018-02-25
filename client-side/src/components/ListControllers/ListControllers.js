import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

// import classes from './ListControllers.css';
import ListItems from './ListItems/ListItems';

class ListControllers extends Component {

    render() {
        const dd = this.props.list;
        // console.log('this.props: ',this.props)
        // console.log('props listcontroller:', dd)
        const totals = [];
        for(let i in dd){
            totals.push({
                sno : dd[i].sno,
                id : dd[i].id,
                item : dd[i].items,
                price: dd[i].price
            })
        }
        // console.log('totalas', totals);
        let totalItems = totals.map(tt => {
            // console.log('tt ',tt);
            return (
                <ListItems key = {tt.sno}
                    items= {tt}
                    // sno={tt.sno}    id={tt.id}
                    // item={tt.items} price={tt.price}
                    delItem= {this.props.delItem}
                />               
            )
        })
            
        
        return (
            // <div>
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
            // </div>
            // <div className={classes.ListControllers}>
            //     <ul>
            //         {totalItems}
            //     </ul>
            // </div>
        )
}
};

export default ListControllers;