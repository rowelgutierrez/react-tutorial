import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <React.Fragment>
        <Backdrop show={props.show} backdropClick={props.modalClose} />
        <div style={{
            transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show? '1' : '0'
        }}
            className={classes.Modal}>
            {props.children}
        </div>
    </React.Fragment>
);

export default modal;