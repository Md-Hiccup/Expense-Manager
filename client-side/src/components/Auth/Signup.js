import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Divider, Icon } from 'semantic-ui-react';
import {GoogleLogin} from  'react-google-login';
import FacebookLogin from 'react-facebook-login';

const Signup = (props) => {
    return (
        <div>
        <Form onSubmit={props.submit}>
            {/* <Form.Group widths='equal'> */}
                <Form.Input fluid 
                    // label='First Name' 
                    placeholder='User Name' 
                    name='name' type='text' size='large'
                    onChange={props.changed}
                    icon='user'
                    iconPosition='left'
                    // value={fname}
                    />
                {/* <Form.Input fluid 
                    // label='Last Name' 
                    placeholder='Last Name' 
                    name='lname' type='text' size='large'
                    onChange={props.handleChanged} 
                    icon='user'
                    iconPosition='left'
                    value={lname} 
                    />                 */}
            {/* </Form.Group> */}
            <Form.Input fluid 
                // label='Email' 
                type='email'
                name='email'
                size='large'
                placeholder='Email' 
                onChange={props.changed}
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
                onChange={props.changed}
                icon='lock'
                iconPosition='left'
                // value={password}
                />
            {/* <Form.Input fluid 
                // label='Conf Password' 
                type='passwordConf'
                name='passwordConf'
                size='large'
                placeholder='Confirm Password'
                onChange={props.handleChanged}
                icon='lock'
                iconPosition='left'
                // value={password}
                /> */}
            <Button color='green'>Sign up</Button>
            <p>By signing up you accept our Terms of service.</p>
        </Form> 
        <Divider hidden />
        <p>Social Authenticate with</p>
        <Button.Group size='mini' >
                    {/* <Button color='facebook'><Icon name='facebook'/> Facebook</Button> */}
                    <FacebookLogin
                        appId="271200740023977"
                        autoLoad={false} size='medium'
                        fields="name,email,picture"
                        callback={props.signupFb}
                        textButton="Facebook"
                        cssClass='kep-login-facebook'
                        icon= 'fa-facebook'
                    />
                    {/* <Button.Or/>     */}
                    <GoogleLogin
                        clientId="797945392647-6cemncdvdfk05lkleu6e8gv5gr1msdjp.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess= {props.signupG}
                        onFailure = {props.signupG}
                        style={googleStyle}
                        autoLoad={false} 
                    ><Icon name='google'/>GOOGLE</GoogleLogin>
                    {/* <Button color='google plus'><Icon name='google plus'/> Google</Button>     */}
                    {/* <Button.Or/>    
                    <Button color='twitter'><Icon name='twitter' /> Twitter</Button>                         */}
                </Button.Group>
            </div>
    )
}

const googleStyle = {
    display: 'inline-block',
    background: 'rgb(209, 72, 54)',
    color: 'rgb(255, 255, 255)',
    // width: '190px',
    padding: '10px 23px',
    borderRadius: '2px',
    border: '1px solid transparent',
    fontSize: '18px',
    fontWeight: 'bold',
    // fontFamily: 'Roboto',
    cursor: 'pointer'
}
export default Signup;