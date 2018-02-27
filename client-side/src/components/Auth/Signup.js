import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const Signup = (props) => {
    return (
        <Form onSubmit={props.submit}>
            <Form.Group widths='equal'>
                <Form.Input fluid 
                    // label='First Name' 
                    placeholder='First Name' 
                    name='fname' type='text' size='large'
                    onChange={props.handleChanged}
                    icon='user'
                    iconPosition='left'
                    // value={fname}
                    />
                <Form.Input fluid 
                    // label='Last Name' 
                    placeholder='Last Name' 
                    name='lname' type='text' size='large'
                    onChange={props.handleChanged} 
                    icon='user'
                    iconPosition='left'
                    // value={lname} 
                    />                
            </Form.Group>
            <Form.Input fluid 
                // label='Email' 
                type='email'
                name='email'
                size='large'
                placeholder='Email' 
                onChange={props.handleChanged}
                icon='mail'
                iconPosition='left'
                // value={email}
                />
            <Form.Input fluid 
                // label='Password' 
                type='password'
                name='password'
                size='large'
                placeholder='Password'
                onChange={props.handleChanged}
                icon='lock'
                iconPosition='left'
                // value={password}
                />
            <Button color='green'>Sign up</Button>
            <p>By signing up you accept our Terms of service.</p>
        </Form> 
    )
}

export default Signup;