import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

// import classes from './ListControllers.css';
import ListItems from './ListItems/ListItems';
import ListItem from 'semantic-ui-react/dist/commonjs/elements/List/ListItem';

class ListControllers extends Component {

    render() {
        const dd = this.props.list;
        // console.log('this.props: ',this.props)
        console.log('props listcontroller:', dd)
        let totalItems = <ListItem
                         key = {dd._id} id={dd._id}
                         item={dd.name} price={+dd.price}
                        //  delItem= {this.props.delItem}
                         />
        // })
        // let totalItems = Object.keys(list).map((num) => {
        //     return [...Array(list[num])].map((dd)=> {
        //         console.log('dd',dd)
        //         return (
        //             <ListItems key={dd._id} id={dd._id} 
        //                 type={dd.items} value={dd.price}
        //                 delItem = {this.props.delItem}
        //                 />
        //             )
        //         })
        //     });
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