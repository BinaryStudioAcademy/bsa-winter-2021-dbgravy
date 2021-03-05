import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

const Routing = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" />
      <Route />
    </Switch>
  </BrowserRouter>
);

export default Routing;
