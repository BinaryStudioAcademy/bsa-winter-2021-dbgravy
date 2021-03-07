import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAccessToken } from '../../common/helpers/storageHelper';
import { Switch, Redirect } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';
import { IAppState } from '../../common/models/store/IAppState';
import { fetchUserRoutine } from '../../scenes/Auth/routines';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import Resources from '../../scenes/Resources/index';
import Apps from '../../scenes/Apps/index';
import Auth from '../../scenes/Auth/containers';
import { IBindingAction } from '../../common/models/callback/IBindingAction';

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

  useEffect(() => {
    if (hasToken && !isAuthorized && !isLoading) {
      fetchUser();
    }
  });

  const storageHandler = (event: StorageEvent) => {
    if (event.key === null) {
      window.location.href = Routes.SignIn;
    }
  };

  useEffect(() => {
    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  return (
    <Switch>
      <PublicRoute path={Routes.Auth} component={Auth} />
      <PrivateRoute path={Routes.Apps} component={Apps} />
      <PrivateRoute path={Routes.Resources} component={Resources} />
      <Redirect exact from={Routes.BaseUrl} to={Routes.SignIn} />
    </Switch>
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
