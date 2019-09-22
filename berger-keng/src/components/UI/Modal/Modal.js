import React, {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

export default class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} backdropClick={this.props.modalClose} />
                <div style={{
                    transform: this.props.show? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show? '1' : '0'
                }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}