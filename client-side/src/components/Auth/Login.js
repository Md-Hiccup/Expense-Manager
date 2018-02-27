import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const Login = (props) => {
    return (
        <Form >
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
            <Button primary >Login</Button>
        </Form> 
    )
};

export default Login;