import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import Button from '../../components/InputControllers/Button/Button';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        };

        render() {
            return (
                <Aux>
                    <h3>
                    <Button clicked={this.errorConfirmedHandler}>Close</Button>
                        {this.state.error? this.state.error.message : null}
                    </h3>
                    <WrappedComponent  {...this.props}/>
                </Aux>
            )
        }
    }
};

export default withErrorHandler;