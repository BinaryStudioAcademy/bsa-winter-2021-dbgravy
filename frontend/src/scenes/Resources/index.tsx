import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Resources from './containers/Resources';
import CreateUpdateResource from './containers/CreateUpdateResource';
import { Routes } from './enums/Routes';

const ResourceRouting = () => (
  <Switch>
    <Route path={Routes.Resources} component={Resources} />
    <Route path={Routes.ResourcesEdit} component={CreateUpdateResource} />
  </Switch>
);

export default ResourceRouting;
