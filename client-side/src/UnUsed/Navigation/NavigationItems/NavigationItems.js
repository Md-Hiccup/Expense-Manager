import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Dashboard</NavigationItem>
        <NavigationItem link="/allitems">Item List</NavigationItem>
    </ul>
);

export default navigationItems;
