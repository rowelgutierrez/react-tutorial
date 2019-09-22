import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    const attachClasses = [classes.SideDrawer];

    if(props.open) {
        attachClasses.push(classes.Open);
    } else {
        attachClasses.push(classes.Close);
    }

    return (
        <React.Fragment>
            <Backdrop show={props.open} backdropClick={props.close} />
            <div className={attachClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems>

                    </NavigationItems>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;