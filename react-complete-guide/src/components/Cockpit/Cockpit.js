import React, { useEffect, useRef, useContext } from 'react';
import styles from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const authContext = useContext(AuthContext);

    const classes = [];

    const toggleBtnRef = useRef(null);

    /**
        Same as componentDidMount when the 2nd argument is an empty array
            - function is triggered only on initial render cycle
        When 2nd argument is not specified, func is triggered on every render
    */
    useEffect(() => {
        toggleBtnRef.current.click();
    }, []);

    const btnClass = props.showPersons ? styles.red : null;

    if (props.personsLength < 3) {
        classes.push(styles.red);
    }

    if (props.personsLength < 2) {
        classes.push(styles.bold);
    }

    return (
        <div className={styles.Cockpit}>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>This actually works!</p>
            <button
                ref={toggleBtnRef}
                className={btnClass}
                // onClick={(event) => this.switchNameHandler('Xero!')}
                onClick={props.click}>Switch Name</button>

            <button onClick={authContext.login}>Login</button>
        </div>
    );
};

export default React.memo(cockpit);