import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const Login = (props) => {
    return (
        <Form onSubmit={props.submit}>
            <Form.Input fluid 
                // label='Email' 
                type='email'
                name='email'
                size='large'
                placeholder='Email' 
                onChange={props.changed}
                icon='mail'
                iconPosition='left'
                // value={props.email}
                />
            <Form.Input fluid
                // label='Password' 
                type='password'
                name='password'
                size='large'
                placeholder='Password'
                onChange={props.changed}
                icon='lock'
                iconPosition='left'
                // value={props.password}
                />
            <Button primary >Login</Button>
            <p>Recover my Password</p>
        </Form> 
    )
};

export default Login;