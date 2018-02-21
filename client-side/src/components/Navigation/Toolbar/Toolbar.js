import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment, Button } from 'semantic-ui-react';

class Toolbar extends Component {
    state = {   activeItem: 'home'  }

    handleItemClick = (e, {name}) => this.setState({ activeItem: name })

    render () {
        const { activeItem } = this.state;
        return(
            <Segment inverted >
                <Menu inverted pointing secondary>
                    <Menu.Item as={Link} to="/" name="home" onClick={this.handleItemClick}>
                        <h2>ExpoMan</h2>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item as={Link} to='/' name="home" active={activeItem === 'home'} onClick={this.handleItemClick} >
                            {/* <h3>Dashboard</h3> */}
                        </Menu.Item>
                        <Menu.Item as={Link} to='/allitems' name='allitems' active={activeItem === 'allitems'} onClick={this.handleItemClick} >
                            {/* <h3>All Items</h3> */}
                        </Menu.Item>
                        <Menu.Item>
                            <Button inverted>SignIn / SignUp</Button>
                            {/* <Button inverted>SignUp</Button> */}
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
          </Segment>
        )
    }
}

export default Toolbar;