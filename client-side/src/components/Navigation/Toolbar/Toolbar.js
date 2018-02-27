import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Grid, Menu, Header, Button, Modal, Icon, Divider,Tab } from 'semantic-ui-react';
import Login from '../../Auth/Login';
import Signup from '../../Auth/Signup';
// import classes from './Toolbar.css';
import GoogleLogin from  'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from '../../../axios-orders';

class Toolbar extends Component {
    state = { activeIndex: 0, open: false,  email: '', password:'', submittedPassword: '', submittedEmail: '' }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })
    
    handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });
    handleChange = (e, { name , value }) => {
        // console.log(name, value);
        this.setState({ [name]: e.target.value }) 
    }
    handleSubmit = () => {
        const {  email, password } = this.state;
        // console.log(email, password);
        this.setState({ submittedPassword: password, submittedEmail: email });
        // console.log('change: ',email, password);        
        console.log('submit: ',this.state.submittedEmail, this.state.submittedPassword);
        // this.close();
    }
    responseGoogle = (response) => {
        console.log('Google ',response);
        axios.post('/auth/google', response)
            .then(res => {
                console.log('g+ res', res);
                this.close();
            })
    }
    responseFacebook = (response) => {
        const fbData = {
            name: response.name,
            email: response.email,
            id: response.id,
            token: response.accessToken,
        }
        console.log('Facebook ',response);
        axios.post('/auth/facebook', response)
            .then(res => {
                console.log('fb :', res);
                this.close();
            })
    }
    render() {
        const {open, email, password, submittedEmail, submittedPassword} = this.state;
        // const {email, password } = this.state; 
        const panes = [
            {   menuItem: 'Sign In', 
            render: () => <Tab.Pane ><Login changed={this.handleChange} submit={this.handleSubmit}/></Tab.Pane> 
            },
            { menuItem: 'Sign Up', 
            render: () => <Tab.Pane ><Signup changed={this.handleChange} submit={this.handleSubmit}/></Tab.Pane> },
          ]
        return(
            <Segment inverted style={{margin: '0px', borderRadius: '0px'}}>
                <Grid container >
                    <Grid.Column >
                        <Menu inverted pointing secondary >
                            <Menu.Item as={Link} to="/">
                                <Header as='h2' inverted>ExpoMan</Header>
                            </Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item>
                                    <Modal dimmer='blurring' open={open} onClose={this.close} 
                                        style={{textAlign:'center'}} size='tiny' 
                                        trigger={<Button inverted onClick={this.show(false)}>Login / Register</Button>}>
                                        {/* <Modal.Header >{ panes[this.state.activeIndex].menuItem}</Modal.Header> */}
                                        <Modal.Content>
                                            <Header as='h1'>{ panes[this.state.activeIndex].menuItem}
                                                <Header.Subheader>with your social network</Header.Subheader>
                                            </Header>
                                            <Button.Group >
                                                {/* <Button color='facebook'><Icon name='facebook'/> Facebook</Button> */}
                                                <FacebookLogin
                                                    appId="271200740023977"
                                                    autoLoad={false}
                                                    fields="name,email,picture"
                                                    callback={this.responseFacebook}
                                                    title='Fb'
                                                />
                                                {/* <Button.Or/>     */}
                                                <GoogleLogin
                                                    clientId="797945392647-6cemncdvdfk05lkleu6e8gv5gr1msdjp.apps.googleusercontent.com"
                                                    buttonText="Login"
                                                    onSuccess= {this.responseGoogle}
                                                    onFailure = {this.responseGoogle}
                                                />
                                                {/* <Button color='google plus'><Icon name='google plus'/> Google</Button>     */}
                                                {/* <Button.Or/>    
                                                <Button color='twitter'><Icon name='twitter' /> Twitter</Button>                         */}
                                            </Button.Group>
                                            <Divider horizontal>Or</Divider>
                                            <Modal.Description >
                                            <Tab 
                                                menu={{pointing:true, color: 'teal'}}
                                                grid={{ paneWidth:12, tabWidth: 6 }}
                                                panes={panes}
                                                activeIndex={this.state.activeIndex} onTabChange={this.handleTabChange} 
                                            />
                                            </Modal.Description>
                                        </Modal.Content>
                                        {/* <Modal.Actions>
                                        <strong>onChange:</strong>
                                        <pre>{JSON.stringify({ email , password}, null, 2)}</pre>
                                        <strong>onSubmit:</strong>
                                        <pre>{JSON.stringify({ submittedEmail, submittedPassword }, null, 2)}</pre>
                                        </Modal.Actions> */}
                                    </Modal>
                                    {/* <Button onClick={this.show(true)} inverted>SignIn / SignUp</Button>
                                    {/* <Button inverted>SignUp</Button> */}
                                    {/* <Modal dimmer={dimmer} size='tiny' open={open} onClose={this.close}>
                                        <Header textAlign='center'> ExpoMan </Header>
                                        <Modal.Content>
                                            <Tab 
                                                menu={{color: 'teal', attached:false, tabular:false}}
                                                grid={{ paneWidth:2, tabWidth: 6 }}
                                                panes={panes} 
                                            />
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button floated='left' color='facebook'><Icon name='facebook' /> Facebook</Button>
                                            <Button floated='right' color='google plus'><Icon name='google plus'/>Google Plus</Button>
                                            <Divider hidden />
                                        </Modal.Actions> 
                                    </Modal> */}
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid>

            </Segment>
        )
    }
}

export default Toolbar;