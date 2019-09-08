import React, { Component } from 'react';
import styles from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import AuthContext from '../context/auth-context';

class App extends Component {
  state = {
    persons: [
      {id: "1", name: 'Max', age: 29},
      {id: "2", name: 'Manu', age: 28},
      {id: "214", name: 'Stefanie', age: 31}
    ],
    showPersons: false,
    changeCounter: 0,
    isAuthenticated: false
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

    // this.setState( { persons } );

    // Below is the better way to change state
    this.setState( (prevState, props) => { 
      return {
        persons,
        changeCounter: prevState.changeCounter + 1
      };
    } );
  };

  loginHandler = () => {
    this.setState((prevState, props) => {
      return {
        isAuthenticated: true
      };
    });
  }

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
              persons={this.state.persons}
              click={this.deletePersonHandler}
              change={this.nameChangedHandler} />;
    }

    return (
      <div className={ styles.App }>
        <AuthContext.Provider value={{
          authenticated: this.state.isAuthenticated,
          login: this.loginHandler
        }}>
          <Cockpit
            title={this.props.title}
            showPersons={this.state.showPersons}
            click={this.togglePersonsHandler}
            personsLength={this.state.persons.length}
          />

          { persons }
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
