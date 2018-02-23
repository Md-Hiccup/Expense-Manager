import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

// import classes from './ListControllers.css';
import ListItems from './ListItems/ListItems';

class ListControllers extends Component {
    constructor(props){
        super(props);
        this.state = { }
    }
    render() {
        
        let totalItems = Object.keys(this.props.listOfItem)
        .map((num) => {
            return [...Array(this.props.listOfItem[num])].map((dd,i)=> {
                return (
                    <ListItems key={i} id={dd.id} 
                        type={dd.items} value={dd.price}
                        delItem = {this.props.delItem}
                        />
                    )
                })
            });
        return (
            <div>
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
            </div>
            // <div className={classes.ListControllers}>
            //     <ul>
            //         {totalItems}
            //     </ul>
            // </div>
        )
}
};

export default ListControllers;