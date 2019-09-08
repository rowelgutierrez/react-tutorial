import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {
    const [ personsState, setPersonsState ] = useState({
        persons: [
            {name: 'Max', age: 29},
            {name: 'Manu', age: 28},
            {name: 'Stefanie', age: 31}
        ]
    });

    const switchNameHandler = () => {
        setPersonsState({
            persons: [
            {name: 'Xero', age: 29},
            {name: 'Manu', age: 28},
            {name: 'Stefanie', age: 31}
            ]
        });

        console.log(personsState);
    };

    return (
        <div className="App">
            <h1>Hi, I'm a React App</h1>
            <button onClick={switchNameHandler}>Switch Name</button>
            <Person 
                name={personsState.persons[0].name} 
                age={personsState.persons[0].age} />
            <Person 
                name={personsState.persons[1].name} 
                age={personsState.persons[1].age}
                click={switchNameHandler}>
            Manu's Hobbies: Racing
            </Person>
            <Person 
                name={personsState.persons[2].name} 
                age={personsState.persons[2].age} />
        </div>
    );
}

export default app;
