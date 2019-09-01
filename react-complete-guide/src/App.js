import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: "1", name: 'Max', age: 29},
      {id: "2", name: 'Manu', age: 28},
      {id: "214", name: 'Stefanie', age: 31}
    ],
    showPersons: false
  };

  deletePersonHandler = (idx) => {
    const persons = [ ...this.state.persons ];
    persons.splice(idx, 1);
    this.setState( { persons } );
  };

  togglePersonsHandler = () => {
    this.setState({showPersons: !this.state.showPersons});
  };

  nameChangedHandler = (event, id) => {
    const index = this.state.persons.findIndex(person => person.id === id);
    const person = {
      ...this.state.persons[index]
    };
    person.name = event.target.value;

    const persons = [ ...this.state.persons ];
    persons[index] = person;

    this.setState( { persons } );
  };

  render() {
    const buttonStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, idx) => {
            return (
              <Person key={person.id}
                name={person.name} 
                age={person.age}
                // click={this.switchNameHandler.bind(this, 'Manu Ginobili')}
                click={this.deletePersonHandler.bind(this, idx)}
                change={(event) => this.nameChangedHandler(event, person.id)}>
                Hobbies: Racing
              </Person>
            );
          })}
        </div>
      );

      buttonStyle.backgroundColor = 'red';
      buttonStyle[':hover'] = {
        backgroundColor: 'lightred',
        color: 'black'
      }
    }

    const classes = [];

    if (this.state.persons.length < 3) {
      classes.push('red');
    }

    if (this.state.persons.length < 2) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This actually works!</p>
          <button 
            // onClick={(event) => this.switchNameHandler('Xero!')}
            onClick={this.togglePersonsHandler}
            style={buttonStyle}>Switch Name</button>
            
            { persons }
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
