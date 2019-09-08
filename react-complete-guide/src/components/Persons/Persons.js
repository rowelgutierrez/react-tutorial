// import React, { Component } from 'react';
import React, { PureComponent } from 'react';
import Person from './Person/Person'

class Persons extends PureComponent {// extends Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.persons !== this.props.persons;
    // }

    render() {
        return this.props.persons.map((person, idx) => {
            return (
                <Person key={person.id}
                name={person.name} 
                age={person.age}
                // click={this.switchNameHandler.bind(this, 'Manu Ginobili')}
                click={() => this.props.click(idx)}
                change={(event) => this.props.change(event, person.id)}>
                Hobbies: Racing
                </Person>
            );
        });
    }
}   

export default Persons;