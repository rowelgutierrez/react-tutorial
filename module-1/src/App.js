import React, { Component } from 'react';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import './App.css';

class App extends Component {
  state = {
    username: 'Xero'
  };

  changeName = (event) => {
    this.setState({
      username: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <UserInput 
          username={this.state.username}
          change={this.changeName} />

        <UserOutput 
          username={this.state.username} />

        <UserOutput 
          username={this.state.username} />
      </div>
    );
  }
}

export default App;
