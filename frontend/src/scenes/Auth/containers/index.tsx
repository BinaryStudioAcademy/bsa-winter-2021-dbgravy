import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './style.module.scss';
import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { Routes } from '../../../common/enums/Routes';
import { ILoginUser } from '../../../common/models/auth/ILoginUser';
import { IRegisterUser } from '../../../common/models/auth/IRegisterUser';
import { IBindingCallback1 } from '../../../common/models/callback/IBindingCallback1';
import { addNewUserRoutine, loginUserRoutine } from '../routines';
import { IAppState } from '../../../common/models/store/IAppState';
import { IInviteToOrganization } from '../../../common/models/userOrganization/IInviteToOrganization';

interface IProps {
    loginUser: IBindingCallback1<ILoginUser>;
    addNewUser: IBindingCallback1<IRegisterUser>;
    inviteToOrganization: IInviteToOrganization;
}
const Auth: FunctionComponent<IProps> = ({
  loginUser,
  addNewUser,
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
  addNewUser: addNewUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
