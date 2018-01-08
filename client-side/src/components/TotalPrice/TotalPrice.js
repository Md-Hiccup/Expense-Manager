import React from 'react';

const TotalPrice = (props) => (
    <p style={{textAlign: 'center', padding: '30px', fontSize: '22px'}}> TOTAL PRICE : <b> {props.totalPrice}</b></p>
);

export default TotalPrice;