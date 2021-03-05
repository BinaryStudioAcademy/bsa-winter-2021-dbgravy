import React, { FunctionComponent } from 'react';
import { Switch } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import Applications from '../../scenes/Applications';

const Routing: FunctionComponent = () => (
  <Switch>
    <PrivateRoute path={Routes.Apps} component={() => <div>apps</div>} />
    <PublicRoute path={Routes.SignIn} component={() => <div>sign in</div>} />
    <PublicRoute path={Routes.Applications} component={Applications} />
  </Switch>
);

export default Routing;
