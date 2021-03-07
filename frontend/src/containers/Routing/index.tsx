import React, { FunctionComponent } from 'react';
import { Switch } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import Resources from '../../scenes/Resources/index';
import Apps from '../../scenes/Apps/index';

import Settings from '../../scenes/Settings';

const Routing: FunctionComponent = () => (
  <Switch>
    <PrivateRoute path={Routes.Apps} component={Apps} />
    <PrivateRoute path={Routes.Resources} component={Resources} />
    <PublicRoute path={Routes.SignIn} component={() => <div>sign in</div>} />
    <PrivateRoute path={Routes.Settings} component={Settings} />
  </Switch>
);

export default Routing;
