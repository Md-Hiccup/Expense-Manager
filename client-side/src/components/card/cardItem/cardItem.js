import React from 'react';
import { Table, Input, Icon } from 'semantic-ui-react';
// import moment from 'moment';

// import classes from './cardItem.css';

const cardItem = (props) => {
    // console.log('cardItem', props);
    const cd = props.items;
    const dt = props.items.date;
    // const date = moment(dt).format('MMMM Do YYYY')
    const date = new Date(dt).toDateString();
    // console.log('date: ',date)
    return (
        <Table.Row>
            <Table.Cell>{+cd.s+1}</Table.Cell>
            <Table.Cell>
            {   
                props.editVal === cd.id && props.showEdit ?    
                    props.isEdit ? 
                        <Input type='text' size='small' value={cd.itemName} name='item'
                        onChange={props.changedInput} 
                        id={cd.id} 
                        // id={props.date}
                        /> 
                    : cd.itemName 
                : cd.itemName
            } 
            </Table.Cell>
            <Table.Cell>
            { 
                  props.editVal === cd.id && props.showEdit ?
                    props.isEdit ? 
                        <Input type='number' size='small' value={cd.itemPrice} name='price'
                        onChange={props.changedInput} 
                        id={cd.id} 
                        // id={props.date}
                        /> 
                    : cd.itemPrice 
                : cd.itemPrice
            } 
            </Table.Cell>
            <Table.Cell>{date}</Table.Cell>
            <Table.Cell collapsing>
                <Icon circular inverted color='red' id={cd.id} name='close' onClick={props.deleteItem}/>
                {props.showEdit ?    
                    props.editVal === cd.id ? 
                        props.isEdit ?  
                            <Icon circular inverted color='green' id={cd.id}  
                                name='check' onClick={props.updateItem}/>
                        :   <Icon circular inverted color='grey' id={cd.id} 
                                name='edit' onClick={props.changedInput}/>
                    :  <Icon circular inverted color='grey' id={cd.id} 
                            name='edit' onClick={props.changedInput}/>
                : null
                }  
            </Table.Cell>
        </Table.Row>
    )
};

export default cardItem;