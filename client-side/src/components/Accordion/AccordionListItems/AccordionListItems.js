import React, {Component} from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import Card from '../../card/card';

class accordionListItems extends Component {
    constructor (props){
        super(props);
        this.state={
            activeIndex: null
        }
    }
    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        // console.log('title props,', titleProps);
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex : newIndex})
    }
    render(){
        const { activeIndex } = this.state;
        // console.log('AccordionListItems props',this.props)
        return (
            <div>
                <Accordion.Title  active = {activeIndex === this.props.val} 
                index={this.props.val} onClick={this.handleClick}>
                    <p><Icon name='dropdown'></Icon> 
                    <span>Date : {this.props.date}</span>
                    <span style={{fontSize:'20px'}}> Total Price: {this.props.totalSum}</span></p>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === this.props.val}>
                    <Card
                        all = {this.props.items} 
                        // date={this.props.date}
                        changedInput={this.props.changedInput}
                        deleteItem={this.props.deleteItem}
                        editVal = {this.props.editVal}
                        isEdit = {this.props.isEdit}
                        updateItem = {this.props.updateItem}
                    /> 
                </Accordion.Content>
            </div>
        )
        
    }
}

export default accordionListItems;