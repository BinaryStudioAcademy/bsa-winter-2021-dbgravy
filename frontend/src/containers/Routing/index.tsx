import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAccessToken } from '../../common/helpers/storageHelper';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';
import { IAppState } from '../../common/models/store/IAppState';
import { fetchUserRoutine } from '../../scenes/Auth/routines';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import Apps from '../../scenes/Apps/index';
import Auth from '../../scenes/Auth/containers';
import { IBindingAction } from '../../common/models/callback/IBindingAction';
import Settings from '../../scenes/Settings';
import Resources from '../../scenes/Routing/index';
import Loader from '../../components/Loader';
import Home from '../Home/index';
import NotFound from '../../scenes/NotFound/components/NotFound';
import AppEditor from '../../scenes/Apps/containers/AppEditor/index';
import Preview from '../../scenes/Apps/containers/Preview';
import { Roles } from '../../common/enums/UserRoles';
import { isAccess } from '../../common/helpers/permissionHelper';

interface IProps {
  isLoading: boolean;
  isAuthorized: boolean;
  fetchUser: IBindingAction;
}

const Routing: React.FC<IProps> = ({
  isLoading,
  isAuthorized,
  fetchUser
}) => {
  const hasToken = Boolean(getAccessToken());
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(true);
  useEffect(() => {
    if (hasToken && !isAuthorized && !isLoading) {
      fetchUser();
    }
  }, [hasToken, isAuthorized, isLoading]);
  useEffect(() => {
    if (isAuthorized) {
      setIsAdmin(isAccess([Roles.Admin]));
      setHasAccess(isAccess([Roles.Admin, Roles.Developer]));
    }
  }, [isAuthorized]);
  return (
    <Loader isLoading={isLoading || (hasToken && !isAuthorized)}>
      <Switch>
        <PublicRoute path={Routes.Auth} component={Auth} />
        <PrivateRoute path={Routes.Apps} component={Apps} />
        <PrivateRoute path={Routes.Resources} component={Resources} />
        <Redirect exact from={Routes.BaseUrl} to={Routes.Apps} />
        {
          (hasAccess && isAuthorized) && (
            <PrivateRoute exact path={Routes.AppEditor} component={AppEditor} />
          )
        }
        {
          (isAdmin && isAuthorized) && (
            <PrivateRoute path={Routes.Settings} component={Settings} />
          )
        }
        <Route path={Routes.Preview} component={Preview} />
        <Route path={Routes.Invite} component={Home} />
        <Route path={Routes.Invite} component={Home} />
        <PublicRoute path="*" component={NotFound} />
      </Switch>
    </Loader>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user: { isLoading, isAuthorized } } = state;
  return {
    isLoading,
    isAuthorized
  };
};

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
