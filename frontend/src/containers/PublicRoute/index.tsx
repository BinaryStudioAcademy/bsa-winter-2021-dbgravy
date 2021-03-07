import React, { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAppState } from '../../common/models/store/IAppState';
import { Routes } from '../../common/enums/Routes';

type PublicRouteProps<T> = T & { component: ReactNode }

const PublicRoute = ({ component: Component, isAuthorized, ...rest }: PublicRouteProps<any>) => (
  isAuthorized
    ? <Redirect to={Routes.Apps} />
    : <Route {...rest} render={props => <Component {...props} />} />
);

const mapStateToProps = ({ user: { isAuthorized } }: IAppState) => ({ isAuthorized });

export default connect(mapStateToProps)(PublicRoute);
