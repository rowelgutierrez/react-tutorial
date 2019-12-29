import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    toggleSideDrawer = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    menuClick={this.toggleSideDrawer} />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);