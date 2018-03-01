import React from 'react';
import { Segment } from 'semantic-ui-react';
import chkMonth from '../checkMonth/checkMonth';

const showMonthList = (props) => {
    const monthList = props.list;
    // console.log('Month List', props.list);
    const month = monthList.map(mm => {
        let dt = chkMonth(mm._id);
        // console.log('dt', dt)
        return (
            <Segment vertical key={mm._id}>
                <h2>{dt} : {mm.totalSum}</h2>
            </Segment>
        )
    })    
    return (
        // <Segment.Group basic>{month}</Segment.Group>
            <Segment basic>{month}</Segment>
    )
}

export default showMonthList ;