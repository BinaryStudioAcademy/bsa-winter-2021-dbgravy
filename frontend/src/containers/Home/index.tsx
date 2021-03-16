import React, { useEffect, useLayoutEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { IAppState } from '../../common/models/store/IAppState';
import { connect } from 'react-redux';
import { Routes } from '../../common/enums/Routes';
import { inviteUserToOrganizationRoutine, switchUserToOrganizationRoutine } from '../../scenes/Settings/routines';
import { IBindingCallback1 } from '../../common/models/callback/IBindingCallback1';
import { IInviteToOrganization } from '../../common/models/userOrganization/IInviteToOrganization';
import Loader from '../../components/Loader';

interface IProps {
  isAuthorized: boolean,
  inviteToOrganization: IInviteToOrganization,
  inviteUserToOrganization: IBindingCallback1<string>,
  switchUserToOrganization: IBindingCallback1<string>
}

const Home: React.FunctionComponent<IProps> = (
  { isAuthorized,
    inviteToOrganization,
    inviteUserToOrganization,
    switchUserToOrganization }
) => {
  const { inviteToken } = useParams<{ inviteToken: string }>();
  useLayoutEffect(() => {
    inviteUserToOrganization(inviteToken);
  }, [inviteToken]);

  useEffect(() => {
    if (isAuthorized && inviteToOrganization.isLoading) {
      switchUserToOrganization(inviteToOrganization.organizationId);
    }
  }, [isAuthorized, inviteToOrganization]);
  return (
    <>
      <Loader isLoading={!inviteToOrganization.isLoading}>
        {isAuthorized
          ? <Redirect to={Routes.Apps} />
          : <Redirect to={Routes.SignIn} />}
      </Loader>
    </>
  );
};

const mapStateToProps = ({ user: { isAuthorized }, settings: { inviteToOrganization } }: IAppState) => (
  { isAuthorized, inviteToOrganization });

const mapDispatchToProps = {
  inviteUserToOrganization: inviteUserToOrganizationRoutine,
  switchUserToOrganization: switchUserToOrganizationRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
