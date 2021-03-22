import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './style.module.scss';
import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { IAppState } from '../../../common/models/store/IAppState';
import { IInviteToOrganization } from '../../../common/models/userOrganization/IInviteToOrganization';
import { Routes } from '../../../common/enums/Routes';
import { ILoginUser } from '../../../common/models/auth/ILoginUser';
import { IRegisterUser } from '../../../common/models/auth/IRegisterUser';
import { IBindingCallback1 } from '../../../common/models/callback/IBindingCallback1';
import {
  addNewUserRoutine,
  loginUserRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine
} from '../routines';
import ForgotPassword from '../components/ForgotPassword';
import { IForgotPasswordInput } from '../../../common/models/auth/IForgotPasswordInput';
import ResetPassword from '../components/ResetPassword';
import { IResetPasswordInput } from '../../../common/models/auth/IResetPasswordInput';

interface IProps {
  loginUser: IBindingCallback1<ILoginUser>;
  addNewUser: IBindingCallback1<IRegisterUser>;
  forgotPassword: IBindingCallback1<IForgotPasswordInput>;
  resetPassword: IBindingCallback1<IResetPasswordInput>;
}
interface IProps {
  loginUser: IBindingCallback1<ILoginUser>;
  addNewUser: IBindingCallback1<IRegisterUser>;
  inviteToOrganization: IInviteToOrganization;
  forgotPassword: IBindingCallback1<IForgotPasswordInput>;
  resetPassword: IBindingCallback1<IResetPasswordInput>;
}

const Auth: FunctionComponent<IProps> = ({
  loginUser,
  addNewUser,
  forgotPassword,
  resetPassword,
  inviteToOrganization
}: IProps) => (
  <div className={styles.pageLayoutWrp}>
    <div className={styles.pageLayout}>
      <div className={styles.rightSide}>
        <Switch>
          <Route
            exact
            path={Routes.SignIn}
            render={props => (
              <SignIn
                {...props}
                loginUser={loginUser}
                inviteToOrganization={inviteToOrganization}
              />
            )}
            key={Routes.SignIn}
          />
          <Route
            exact
            path={Routes.SignUp}
            render={props => (
              <SignUp
                {...props}
                addNewUser={addNewUser}
                inviteToOrganization={inviteToOrganization}
              />
            )}
            key={Routes.SignUp}
          />
          <Route
            exact
            path={Routes.ForgotPassword}
            render={() => <ForgotPassword forgotPassword={forgotPassword} />}
            key={Routes.ForgotPassword}
          />
          <Route
            exact
            path={Routes.ResetPassword}
            render={({ match: { params: { token } } }) => <ResetPassword token={token} resetPassword={resetPassword} />}
            key={Routes.ResetPassword}
          />
        </Switch>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state: IAppState) => {
  const { settings: { inviteToOrganization } } = state;
  return {
    inviteToOrganization
  };
};

const mapDispatchToProps = {
  loginUser: loginUserRoutine,
  addNewUser: addNewUserRoutine,
  forgotPassword: forgotPasswordRoutine,
  resetPassword: resetPasswordRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
