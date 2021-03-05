import React from 'react';
import { store } from '../../store';
import { Provider } from 'react-redux';
import Routing from '../Routing';
import { Router } from 'react-router';
import { history } from '../../common/helpers/historyHelper';

const App = () => (
  <Provider store={store}>
    <Router history={history}><Routing /></Router>
  </Provider>
);

export default App;
