import React from 'react';

import ListItems from './ListItems/ListItems';

const listControllers = (props) => {
    let totalItems = Object.keys(props.listOfItem)
    .map((num) => {
        return [...Array(props.listOfItem[num])].map((dd,i)=> {
            return <ListItems key={num+i} type={dd.items} value={dd.price}/>
            })
        })
    return (
        <div>
            <ul>
                {totalItems}
            </ul>
        </div>
    )
};

export default listControllers;