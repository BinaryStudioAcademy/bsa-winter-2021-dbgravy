import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';

const Routing: FunctionComponent = () => (
  <Switch>
    <Route exact path="/" />
    <Route />
  </Switch>
);

export default Routing;
