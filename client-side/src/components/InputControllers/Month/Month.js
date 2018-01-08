import React, {Component} from 'react';

import classes from './Month.css';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Month extends Component {
    render() {
        return (
            <button
                className={classes.Date}
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        )
    }
};

export default Month;
