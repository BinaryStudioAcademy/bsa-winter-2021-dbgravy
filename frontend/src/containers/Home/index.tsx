import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { IAppState } from '../../common/models/store/IAppState';
import { connect } from 'react-redux';
import { Routes } from '../../common/enums/Routes';
import { inviteUserToOrganizationRoutine } from '../../scenes/Settings/routines';
import { IBindingCallback1 } from '../../common/models/callback/IBindingCallback1';

interface IProps {
  isAuthorized: boolean,
  inviteUserToOrganization: IBindingCallback1<string>
}

const Home: React.FunctionComponent<IProps> = ({ isAuthorized, inviteUserToOrganization }) => {
  const { inviteToken } = useParams<{ inviteToken: string }>();
  useEffect(() => {
    inviteUserToOrganization(inviteToken);
  }, [inviteToken]);

  return isAuthorized
    ? <Redirect to={Routes.Apps} />
    : <Redirect to={Routes.SignIn} />;
};

const mapStateToProps = ({ user: { isAuthorized } }: IAppState) => ({ isAuthorized });

const mapDispatchToProps = {
  inviteUserToOrganization: inviteUserToOrganizationRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
