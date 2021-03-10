import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import styles from './style.module.scss';
import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { Routes } from '../../../common/enums/Routes';
import { ILoginUser } from '../../../common/models/auth/ILoginUser';
import { IRegisterUser } from '../../../common/models/auth/IRegisterUser';
import { IBindingCallback1 } from '../../../common/models/callback/IBindingCallback1';
import { addNewUserRoutine, loginUserRoutine } from '../routines';

interface IProps {
    loginUser: IBindingCallback1<ILoginUser>;
    addNewUser: IBindingCallback1<IRegisterUser>;
}
const Auth: FunctionComponent<IProps> = ({
  loginUser,
  addNewUser
}: IProps) => (
  <div className={styles.pageLayout}>
    <div className={styles.rightSide}>
      <Route
        exact
        path={Routes.SignIn}
        render={props => (
          <SignIn
            {...props}
            loginUser={loginUser}
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
          />
        )}
        key={Routes.SignUp}
      />
    </div>
  </div>
);

const mapDispatchToProps = {
  loginUser: loginUserRoutine,
  addNewUser: addNewUserRoutine
};

export default connect(null, mapDispatchToProps)(Auth);
