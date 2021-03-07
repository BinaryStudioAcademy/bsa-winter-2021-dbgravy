import React, { FunctionComponent, ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAppState } from '../../common/models/store/IAppState';
import { Routes } from '../../common/enums/Routes';

type PrivateRouteProps<T> = T & { component: ReactNode }

const PrivateRoute: FunctionComponent<PrivateRouteProps<any>> = ({
  component: Component,
  isAuthorized,
  ...rest
}: PrivateRouteProps<any>) => (
  isAuthorized
    ? <Route {...rest} render={props => <Component {...props} />} />
    : <Redirect to={Routes.SignIn} />
);

const mapStateToProps = ({ user: { isAuthorized } }: IAppState) => ({
  isAuthorized
});

export default connect(mapStateToProps)(PrivateRoute);
