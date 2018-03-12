import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Grid, Menu, Header } from 'semantic-ui-react';
// import Login from '../../Auth/Login';
// import Signup from '../../Auth/Signup';
// import classes from './Toolbar.css';

class Toolbar extends Component {
    constructor(props){
        super(props);
        this.state = { 
            activeIndex: 0, isLogin : false, activeLogin: 0,
            email: '', password:'', submittedPassword: '', submittedEmail: '',
            gToken: '', fbToken: ''
         }
    }
    componentDidMount(){
        console.log('toolbar', this.props)
    }

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
   
    render() {
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
                                    {/* <Link to='/'><Button inverted onClick={this.logout}>Logout</Button> </Link> */}
                                {/* { this.state.isLogin ? 
                                            this.state.activeLogin === 1 ? 
                                                <Button color='facebook' onClick={this.logout}>
                                                    {id}{user}<Icon name='facebook' onClick={this.logout}/> Logout</Button>
                                                // : <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
                                                : <Button color='google plus' onClick={this.logout}>
                                                    {id}{user}<Icon name='google plus' onClick={this.logout}/> Logout</Button> 
                                            // <Button inverted onClick={this.logout}>Logout</Button>
                                : <Button inverted onClick={this.show(false)}>Login / Register</Button>  }           */}
                                    {/* <Modal dimmer='blurring' open={open} onClose={this.close} 
                                        style={{textAlign:'center'}} size='tiny' 
                                        trigger={ this.state.isLogin ? 
                                            this.state.activeLogin === 1 ? 
                                                <Button color='facebook' onClick={this.logout}>
                                                    {id}{user}<Icon name='facebook' onClick={this.logout}/> Logout</Button>
                                                // : <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
                                                : <Button color='google plus' onClick={this.logout}>
                                                    {id}{user}<Icon name='google plus' onClick={this.logout}/> Logout</Button> 
                                            // <Button inverted onClick={this.logout}>Logout</Button>
                                        : <Button inverted onClick={this.show(false)}>Login / Register</Button>
                                        }>  */}
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