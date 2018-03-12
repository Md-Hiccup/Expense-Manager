import React, { Component } from 'react';
// import { Link, BrowserRouter as Router, Redirect } from 'react-router-dom';
import classes from './Home.css';
import Aux from '../../hoc/Aux/Aux';
import { Button, Grid, Divider, Header} from 'semantic-ui-react';
import Login from '../../components/Auth/Login'
import Signup from '../../components/Auth/Signup';
// import {GoogleLogin, GoogleLogout} from  'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import axios from '../../axios-orders';

import src from './../../assets/images/Turquoise\ flow.png';

class HomePage extends Component {
    constructor(){
        super();
        this.state = { showSignup: false , signup: {name : '',email: '', password:''},
            submittedPassword: '', submittedEmail: '', login: { email: '', password: ''},
            user: '',  id: null, redirectToRefer : false
        }
    };

    showSignupHandler = () => { this.setState({ showSignup : true, active : 1 })}
    showLoginHandler = () => { this.setState({ showSignup : false, active : 0 })}
    handleSignupChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const userSignup = {...this.state.signup};
        userSignup[name] = value;
        this.setState({ signup : userSignup }) 
        // console.log('state signup ',userSignup)
    }
    handleSignup = (e) => {
        e.preventDefault();
        const { signup } = this.state;
        // console.log('change Signup: ',signup);
        axios.post('/auth/register', signup)
            .then(res => {
                console.log('after register ',res)
                this.setState({ showSignup: false, id: res.data._id, user: res.data.name})
            }).catch(err => {
                alert('USer Is Already present')
                console.error(err);
            })        
    }
    handleLoginChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const userLogin = {...this.state.login};
        userLogin[name] = value
        this.setState({ login : userLogin})
        // console.log('state login ', userLogin);
    }
    handleLogin = (e) => {
        e.preventDefault();
        const { login } = this.state;
        // console.log('change Login: ', login); 
        axios.post('/auth/signin', login )
            .then(res => {
                console.log('login local res', res)
                localStorage.setItem('token', res.data.token)
                this.props.history.push('/dashboard/'+ res.data.id);                    
            })
            .catch(err => {
                console.error(err)
            })       
    }
    responseSignupGoogle = (response) => {
        console.log('Google signup',response);
        axios.post('/auth/g/register', response)
            .then(res => {
                console.log('g+ res', res.data);
                this.setState({
                    showSignup: false,
                    redirect:true, user: res.data.google.name ,id: res.data._id})
            }).catch(err => {
                alert('USer Is Already present')
                console.error(err);
            })
    }
    responseSignupFacebook = (response) => {
        console.log('Facebook signup',response);
        axios.post('/auth/fb/register', response)
            .then(res => {
                console.log('fb :', res);
                this.setState({
                    showSignup: false,
                    redirect: true, user: res.data.facebook.name, id: res.data._id})
            }).catch(err => {
                alert('USer Is Already present')
                console.error(err);
            })
    }
    responseLoginGoogle = (response) => {
        console.log(response)
        axios.post('/auth/g/signin', response)
            .then(res => {
                console.log('login google res', res)
                localStorage.setItem('token', res.data.token)
                this.props.history.push('/dashboard/'+ res.data.id);                    
            })
            .catch(err => {
                console.error(err)
            })
    }
    responseLoginFacebook = (response) => {
        console.log(response)
        axios.post('/auth/fb/signin', response)
            .then(res => {
                console.log('login fb res', res)
                localStorage.setItem('token', res.data.token)
                this.props.history.push('/dashboard/'+ res.data.id);                    
            })
            .catch(err => {
                console.error(err)
            })
    }
    
    render(){
        const isSessionActive = localStorage.getItem('token')
        // console.log('home session',isSessionActive);
        // if(!this.state.redirectToRefer){
        //     // return <Redirect to='/allItems'/>
        // }
        // if(isSessionActive === undefined || isSessionActive === null){
        //     this.props.history.push('/dashboard/'+ this.state.id);
        // }
        return(
            <Aux>
                <div className={classes.Container}>
                    <img src={src} className={classes.Img} />  
                    <Grid className={classes.Middled} divided='vertically'>
                        <Grid.Row>
                            <Grid.Column width={7}>       
                                <div>
                                    <div>
                                        <Header inverted as='h1'>Expense Manager
                                            <Header.Subheader>Manage your expense with just a shot</Header.Subheader>
                                        </Header>
                                        <Button onClick={this.showSignupHandler} color='green'>Signup</Button>
                                        <Button onClick={this.showLoginHandler} color='blue'>Login</Button>        
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={2} />
                            <Grid.Column width={5}>
                                <div>
                                    { this.state.showSignup ?
                                        <Header inverted as='h1'> Signup </Header>
                                        :<Header inverted as='h1'> Login</Header>
                                    }
                                    
                                    { this.state.showSignup ? 
                                        <Signup changed={this.handleSignupChange} 
                                            submit = {this.handleSignup}
                                            signupFb  = {this.responseSignupFacebook}
                                            signupG = {this.responseSignupGoogle}
                                            />
                                         : <Login changed={this.handleLoginChange} 
                                            submit={this.handleLogin}
                                            loginFb = {this.responseLoginFacebook}
                                            loginG = {this.responseLoginGoogle}
                                            /> }
                                    <Divider hidden />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={2} />
                        </Grid.Row>
                    </Grid>
                </div>
            </Aux>
        )
    }
}

export default HomePage;