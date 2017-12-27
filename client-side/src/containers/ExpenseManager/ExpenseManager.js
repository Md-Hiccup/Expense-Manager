import React, {Component } from 'react';

import Aux from '../../hoc/Aux';
import ListControllers from '../../components/ListControllers/ListControllers';

class ExpenseManager extends Component {
    render() {
        return (
            <Aux>
                <ListControllers />
            </Aux>
        );
    }
}

export default ExpenseManager;