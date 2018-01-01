import React ,{ Component } from 'react';

import classes from './Layout.css';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    render () {
        return (
            <Aux>
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                {/*<div>Footer</div>*/}
            </Aux>
        )
    }
}

export default Layout;