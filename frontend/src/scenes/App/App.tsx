import React from 'react';
// import logo from '../../assets/images/logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Settings from '../Settings';

const App = () => (
  <div className="App">
    {/* <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit
        {' '}
        <code>src/App.tsx</code>
        {' '}
        and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header> */}
    <Settings />
  </div>
);

export default App;
