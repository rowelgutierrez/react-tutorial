import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../SideDrawer/ToggleButton/ToggleButton';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <ToggleButton toggleClick={props.menuClick} />

        <div className={classes.Logo}>
            <Logo />
        </div>

        <nav className={classes.DesktopOnly}>
            <NavigationItems
                isAuthenticated={props.isAuthenticated}
            />
        </nav>
    </header>
);

export default toolbar;