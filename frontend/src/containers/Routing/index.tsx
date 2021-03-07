import React, { FunctionComponent } from 'react';
import { Switch } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

import Settings from '../../scenes/Settings';

const Routing: FunctionComponent = () => (
  <Switch>
    <PrivateRoute path={Routes.Apps} component={() => <div>apps</div>} />
    <PublicRoute path={Routes.SignIn} component={() => <div>sign in</div>} />
    {/* private this below */}
    <PublicRoute path={Routes.Settings} component={Settings} />
  </Switch>
);

export default Routing;
