import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Resources from '../Resources/index';
import { Routes } from '../../common/enums/Routes';
import CreateEditResource from '../Resources/containers/CreateEditResource/index';

const ResourceRouting = () => (
  <Switch>
    <Route exact path={Routes.Resources} component={Resources} />
    <Route path={`${Routes.ResourcesAddEdit}/:id`} component={CreateEditResource} />
    <Route path={Routes.ResourcesAddEdit} component={CreateEditResource} />
  </Switch>
);

export default ResourceRouting;
