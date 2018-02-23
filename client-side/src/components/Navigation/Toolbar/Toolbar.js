import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Grid, Menu, Header, Button, Modal, Form, Icon, Divider,Tab } from 'semantic-ui-react';
import Login from '../../Auth/Login';
import Signup from '../../Auth/Signup';
// import classes from './Toolbar.css';

class Toolbar extends Component {
    state = {   open: false, email: '', password:'', submittedPassword: '', submittedEmail: '' }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => { this.setState({ open: false })  }
 
    handleChange = (e, { name, value }) => this.setState({ [name]: e.target.value })
    handleSubmit = () => {
        const { password, email } = this.state;
        alert(" Login... ")
        this.setState({ submittedPassword: password, submittedEmail: email })
        this.close()
    }
 
    render() {
        const panes = [
            { menuItem: 'SignIn', render: () => <Tab.Pane ><Login /></Tab.Pane> },
            { menuItem: 'SignUp', render: () => <Tab.Pane ><Signup /></Tab.Pane> },
          ]
        const {open, dimmer, email, password } = this.state; 
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
                                    <Button onClick={this.show(true)} inverted>SignIn / SignUp</Button>
                                    {/* <Button inverted>SignUp</Button> */}
                                    <Modal dimmer={dimmer} size='tiny' open={open} onClose={this.close}>
                                        <Header textAlign='center'> Sign In </Header>
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
                                    </Modal>
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