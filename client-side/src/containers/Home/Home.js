import React, { Component } from 'react';
import { Header, Image } from 'semantic-ui-react';

import src from './../../assets/images/Turquoise\ flow.png';

class HomePage extends Component {
    constructor(){
        super();
        this.state = {  }
    };
    render(){
        return(
            <div>
                <Image src={src}>
                    <Header as='h2'>Expense Manager</Header>
                </Image>
            </div>
        )
    }
}

export default HomePage;