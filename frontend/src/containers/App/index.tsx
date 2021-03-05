import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../store';
import Routing from '../Routing';

const App: FunctionComponent = () => (
  <Provider store={store}>
    <Router>
      <Routing />
    </Router>
  </Provider>
);

export default App;
