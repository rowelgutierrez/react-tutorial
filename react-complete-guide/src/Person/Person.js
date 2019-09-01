import React from 'react';
import styles from './Person.module.css'
import Radium from 'radium';

const person = (props) => {
    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    };

    console.log(styles);

    return (
        <div className={styles.person} style={style}>
            <p onClick={props.click}>I'm {props.name}, {props.age} yrs old</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} value={props.name} />
        </div>
    );
}

export default Radium(person);