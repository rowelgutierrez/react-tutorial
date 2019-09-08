import React, { Component } from 'react';
import styles from './Person.css'
import WithClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props)
        this.htmlInputRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // this.htmlInput.focus();
        this.htmlInputRef.current.focus();
    }

    render() {
        return (
            <WithClass className={styles.Person}>
                { this.context.authenticated ? <p>Authenticated</p> : <p>Please Login</p> }
                <p onClick={this.props.click}>I'm {this.props.name}, {this.props.age} yrs old</p>
                <p>{this.props.children}</p>
                <input
                    // ref={(htmlInput => { this.htmlInput = htmlInput })}
                    ref={this.htmlInputRef}
                    type="text"
                    onChange={this.props.change}
                    value={this.props.name} />
            </WithClass>
        );
    }
}

// const person = (props) => {
//     return (
//         <WithClass className={styles.Person}>
//             <p onClick={props.click}>I'm {props.name}, {props.age} yrs old</p>
//             <p>{props.children}</p>
//             <input type="text" onChange={props.change} value={props.name} />
//         </WithClass>
//     );
// }

Person.propTypes = {
    click: PropTypes.func,
    change: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number
};

export default Person;