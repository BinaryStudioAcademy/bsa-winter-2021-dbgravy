import React, { FunctionComponent } from 'react';
import { Switch } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import Resources from '../../scenes/Resources/index';
import Apps from '../../scenes/Apps/index';

const Routing: FunctionComponent = () => (
  <Switch>
    <PrivateRoute path={Routes.Apps} component={(props: any) => <Apps {...props} />} />
    <PrivateRoute path={Routes.Resources} component={Resources} />
    <PublicRoute path={Routes.SignIn} component={() => <div>sign in</div>} />
  </Switch>
);

export default Routing;
