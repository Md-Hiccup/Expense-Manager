import React from 'react';

import classes from './InputItems.css';
// import Button from '../Button/Button';
// import Month from '../Month/Month';
// import DatePicker from 'react-datepicker';
import { Button, Form } from 'semantic-ui-react';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const InputItems = (props) => {
    // console.log('Input Items: ', props)
    return (
        <div className={classes.InputItems}>
          
            {/* <DatePicker
                customInput={<Month />}
                selected={props.today}
                onChange={props.inputDate}
                dateFormat="LL"/>
            <input
                className={classes.Items}
                type="text"
                name="items"
                value={props.itemList.items}
                onChange={props.inputChanged}
                placeholder="Enter Items"/>
            <input
                className={classes.Price}
                type="number"
                name="price"
                value={props.itemList.price}
                onChange={props.inputChanged}
                placeholder="$ Price"/>
            <Button btnType='Add' clicked={props.addItem}>ADD</Button>
            <Button btnType='Save' clicked = {props.saveItem}>SAVE</Button>
            <Button btnType='Clear' clicked={props.clearItem}>Clear</Button> */}
            {/*<form onSubmit={props.saveItem}>*/}
            {/*<Month today={props.today}/>*/}
            <Form className={classes.form}>
                <Form.Group>
                    <Form.Input size="large" type="text" name="items"
                        placeholder="Add Items" width={8}
                        value={props.itemList.items} onChange={props.inputChanged}
                    />
                    <Form.Input size="large" type="number" name="price"
                        placeholder="$ Price" width={3}
                        value={props.itemList.price} onChange={props.inputChanged}
                    />
                    <Button primary size="large" onClick={props.saveItem}>Add</Button>
                    {/* <Button color="green" size="large" onClick={props.saveItem}>Save</Button> */}
                </Form.Group>
            </Form>
            {/*</form>*/}
        </div>
    )
};

export default InputItems;