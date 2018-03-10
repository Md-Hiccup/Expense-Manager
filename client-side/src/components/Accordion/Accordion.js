import React from 'react';
import AccordionListItems from './AccordionListItems/AccordionListItems';
import { Accordion } from 'semantic-ui-react';

const accordion = (props) => {
    const dateList = props.dateList
    // console.log('dateList props', dateList, props.listdate)
    const showData = dateList.map((dd,i) => {
        // console.log('dd',dd,i)
        return (
            <AccordionListItems 
                key = {dd._id}
                val = {i} date={dd._id} listmon = {props.listdate}
                items = {dd.items} totalSum = {dd.totalSum}
                changedInput={props.changedInput}
                deleteItem={props.deleteItem}
                editVal = {props.editVal}
                isEdit = {props.isEdit}
                updateItem = {props.updateItem}
                showEdit = { props.showEdit}
            />
        )
    })
    return (
        <div>
            <Accordion fluid styled >
                {showData}
            </Accordion>
        </div>
    )
}

export default accordion;