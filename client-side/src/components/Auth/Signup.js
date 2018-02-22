import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const Signup = (props) => {
    return (
        <Form >
            <Form.Group>
                <Form.Input placeholder='First Name' name='fname' type='text' size='large'
                    // value={fname} onChange={props.handleChanged}
                    />
                <Form.Input placeholder='Last Name' name='lname' type='text' size='large'
                    // value={lname} onChange={props.handleChanged} 
                    />                
            </Form.Group>
            <Form.Input fluid label='Email' 
                type='email'
                name='email'
                size='large'
                placeholder='abc@gmail.com' 
                // onChange={props.handleChanged}
                // value={email}
                />
            <Form.Input fluid label='Password' 
                type='password'
                name='password'
                size='large'
                placeholder='aaaaa'
                // onChange={props.handleChanged}
                // value={password}
                />
            <Button primary >Sign In</Button>
        </Form> 
    )
}

export default Signup;