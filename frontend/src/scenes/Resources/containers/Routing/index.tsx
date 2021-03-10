import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Resources from '../../index';
import { Routes } from '../../../../common/enums/Routes';

const ResourceRouting = () => (
  <Switch>
    <Route path={Routes.Resources} component={Resources} />
    <Route path="/edit" component={() => <div>edit</div>} />
  </Switch>
);

export default ResourceRouting;
