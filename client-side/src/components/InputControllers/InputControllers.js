import React, { Component } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';

import InputItems from './InputItems/InputItems';
import classes from './InputControllers.css';

class InputControllers extends Component {
    state = {   showInput: false   , totalPrice:0 }
    
    handleItemClick = (e, {name}) => { this.setState({ activeItem: name})}
    // componentWillReceiveProps(nextProps){
    //     console.log('next',nextProps)
    //     this.setState({ totalPrice: nextProps})
    // }
    render(){
        const { totalPrice } = this.props;
        // console.log('InputController: ', this.props)
        console.log('Total Price: ', totalPrice)        
    return (
        <div className={classes.InputControllers}>
        {/*<Month today = {props.today}/>*/}
            <Segment padded textAlign='left'>
                <Header as='h2'>
                    This Month Total Expense: {totalPrice}
                    <Button circular color='red' floated='right' 
                            onClick={() => this.setState({showInput : !this.state.showInput})}>Add</Button>
                </Header>
                {/* </Segment><Segment> */}
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
