import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Redirect } from 'react-router-dom';
import classes from './Home.css';
import Aux from '../../hoc/Aux/Aux';
import { Button, Grid, Divider, Header, Icon } from 'semantic-ui-react';
import Login from '../../components/Auth/Login'
import Signup from '../../components/Auth/Signup';
import {GoogleLogin, GoogleLogout} from  'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from '../../axios-orders';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';

import src from './../../assets/images/Turquoise\ flow.png';

class HomePage extends Component {
    constructor(){
        super();
        this.state = { showSignup: false , signup: {name : '',email: '', password:''},
            submittedPassword: '', submittedEmail: '',
            gToken: '', fbToken: '', user: '', id: null, redirectToRefer : false
        }
    };

    showSignupHandler = () => { this.setState({ showSignup : true, active : 1 })}
    showLoginHandler = () => { this.setState({ showSignup : false, active : 0 })}
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const userSignup = {...this.state.signup};
        userSignup[name] = value;
        console.log(userSignup)
        this.setState({ signup : userSignup }) 
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { userSignup } = this.state;
        console.log('change: ',userSignup);        
        // this.close();
    }
    responseSignupGoogle = (response) => {
        console.log('Google signup',response);
        // console.log('Google accessToken: ',response.accessToken);
        // const gTokenTime = response.tokenObj.expires_in;
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
        // console.log('Facebook accessToken', response.accessToken)
        // const fbTokenTime = response.expiresIn;
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
    // logout = (response) => {
    //     if(this.state.activeLogin === 1) {
    //         console.log('logout from FB: ', this.state.fbToken);
    //         this.setState({ redirect: false })
    //         // console.log('')
    //     } else {
    //         console.log('logout from G+: ', this.state.gToken);
    //         this.setState({ redirect: false})
    //     }// axios.get('/auth/all').then(res => console.log(res));
    //     this.setState({isLogin: false, activeLogin: 0})
    // }
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
                                        <Signup changed={this.handleChange} 
                                            submit = {this.handleSubmit}
                                            signupFb  = {this.responseSignupFacebook}
                                            signupG = {this.responseSignupGoogle}
                                            />
                                         : <Login changed={this.handleLoginChange} 
                                            submit={this.handleLogin}
                                            loginFb = {this.responseLoginFacebook}
                                            loginG = {this.responseLoginGoogle}
                                            /> }
                                    <Divider hidden />
                                    {/* <p>Social Authenticate with</p>
                                    <Button.Group size='mini' > */}
                                                {/* <Button color='facebook'><Icon name='facebook'/> Facebook</Button> */}
                                                {/* <FacebookLogin
                                                    appId="271200740023977"
                                                    autoLoad={false} size='medium'
                                                    fields="name,email,picture"
                                                    callback={this.responseFacebook}
                                                    textButton="Facebook"
                                                    cssClass='kep-login-facebook'
                                                    icon= 'fa-facebook'
                                                /> */}
                                                {/* <Button.Or/>     */}
                                                {/* <GoogleLogin
                                                    clientId="797945392647-6cemncdvdfk05lkleu6e8gv5gr1msdjp.apps.googleusercontent.com"
                                                    buttonText="Login"
                                                    onSuccess= {this.responseGoogle}
                                                    onFailure = {this.responseGoogle}
                                                    style={googleStyle}
                                                    autoLoad={false} 
                                                ><Icon name='google'/>GOOGLE</GoogleLogin> */}
                                                {/* <Button color='google plus'><Icon name='google plus'/> Google</Button>     */}
                                                {/* <Button.Or/>    
                                                <Button color='twitter'><Icon name='twitter' /> Twitter</Button>                         */}
                                            {/* </Button.Group>
                                            <Divider hidden /> */}
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

// const googleStyle = {
//     display: 'inline-block',
//     background: 'rgb(209, 72, 54)',
//     color: 'rgb(255, 255, 255)',
//     // width: '190px',
//     padding: '10px 23px',
//     borderRadius: '2px',
//     border: '1px solid transparent',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     // fontFamily: 'Roboto',
//     cursor: 'pointer'
// }
export default HomePage;