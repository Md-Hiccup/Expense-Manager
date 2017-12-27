import React ,{ Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';

class Layout extends Component {
    render () {
        return (
            <Aux>
                <div>Toolbar, SideBar, Menu</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <div>Footer</div>
            </Aux>
        )
    }
}

export default Layout;