import React from 'react';
import AccordionListItems from './AccordionListItems/AccordionListItems';
import { Accordion } from 'semantic-ui-react';

const accordion = (props) => {
    const dateList = props.dateList[0]
    let showData;
    console.log('dateList props', dateList)
    if(dateList){
        console.log('dateList.data', dateList.data)
        showData = dateList.data.map((dd,i) => {
            console.log('dd',dd,i)
            return (
                <AccordionListItems 
                    key = {dd._id}
                    val = {i}
                    items = {dd.items} totalSum = {dd.totalSum}
                    changedInput={props.changedInput}
                    deleteItem={props.deleteItem}
                    editVal = {props.editVal}
                    isEdit = {props.isEdit}
                    updateItem = {props.updateItem}
                />
            )
        })
    }
    return (
        <Accordion fluid styled >
            {showData}
        </Accordion>
    )
}

export default accordion;