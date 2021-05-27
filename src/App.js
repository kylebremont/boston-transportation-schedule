import React, { Component } from 'react';
import Schedule from './components/Schedule';
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 align="center" style={{marginTop: 50}} >North Station Commuter Rails</h1>
          <h2 align="center" style={{paddingTop: 20}}>List includes all rails stopping at the North Station in the next 3 hours</h2>
          <div className="schedule">
            <Schedule />
          </div>
        </header> 
      </div>
    );
  }
  
}

export default App;