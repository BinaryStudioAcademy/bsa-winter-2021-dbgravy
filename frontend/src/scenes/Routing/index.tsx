import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Resources from '../Resources/index';
import { Routes } from '../../common/enums/Routes';

const ResourceRouting = () => (
  <Switch>
    <Route exact path={Routes.Resources} component={Resources} />
    <Route exact path={Routes.ResourcesEdit} component={() => <div>edit</div>} />
  </Switch>
);

export default ResourceRouting;
