import React from 'react';
import { Segment } from 'semantic-ui-react';

const showMonthList = (props) => {
    const monthList = props.list;
    // console.log('Month List', props.list);
    const checkMonth = (mon) =>{
        switch(mon){
            case 1 : return 'January';
            case 2 : return 'February';
            case 3 : return 'March';
            case 4 : return 'April';
            case 5 : return 'May';
            case 6 : return 'June';
            case 7 : return 'July';
            case 8 : return 'August';
            case 9 : return 'September';
            case 10 : return 'October';
            case 11 : return 'November';
            case 12 : return 'December';
            default : return 'Wrong date';
        }
    }
    const month = monthList.map(mm => {
        let dt = checkMonth(mm._id);
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