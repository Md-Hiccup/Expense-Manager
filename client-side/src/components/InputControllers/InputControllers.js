import React, { Component } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';

import InputItems from './InputItems/InputItems';
import classes from './InputControllers.css';

class InputControllers extends Component {
    state = {   showInput: false    }
    
    handleItemClick = (e, {name}) => { this.setState({ activeItem: name})}

    render(){

    return (
        <div className={classes.InputControllers}>
        {/*<Month today = {props.today}/>*/}
            <Segment padded textAlign='left'>
                <Header as='h2'>
                    This Month Total Expense: $10.99
                    <Button circular color='red' floated='right' 
                        onClick={() => this.setState({showInput : !this.state.showInput})}>Add</Button>
                </Header>
                { this.state.showInput ? 
                    <InputItems
                        // today = {this.props.today}
                        // inputDate = {this.props.inputDate}
                        itemList ={this.props.itemList}
                        inputChanged = {this.props.inputChanged}
                        saveItem={this.props.saveItem}
                        addItem={this.props.addItem}
                        // clearItem = {this.props.clearItem}
                    />  :   null
                 }
            </Segment> 
        </div>
    )
}
};

export default InputControllers;
