import React from 'react';
import { store } from '../../store';
import { Provider } from 'react-redux';
import Routing from '../Routing';
import { Route } from 'react-router';

const App = () => (
  <Provider store={store}>
    <Route><Routing /></Route>
  </Provider>
);

export default App;
