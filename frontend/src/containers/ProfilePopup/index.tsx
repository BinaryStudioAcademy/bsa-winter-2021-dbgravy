import React, { useState } from 'react';
import { IAppState } from '../../common/models/store/IAppState';
import { createOrganizationRoutine, fetchOrgInfoRoutine } from './routines';
import UserAttrButton from '../../components/UserAttrButton/UserAttrButton';
import ProfilePopupInfo from '../../components/ProfilePopupInfo/ProfilePopupInfo';
import { connect } from 'react-redux';
import { IUser } from '../../common/models/user/IUser';
import { logotUserRoutine } from '../../scenes/Auth/routines';
import { IUserOrganization } from '../../common/models/user/IUserOrganization';

interface IProps {
  user: IUser,
  organization?: IUserOrganization
  fetchOrganization: (user?: IUser) => void,
  createOrganization: (payload: { user?: IUser, newOrganization: { name: string } }) => void,
  fullfill: (payload: { user?: IUser }) => void,
  logout: () => void,
  setup: (payload: { user?: IUser }) => void,
}

const ProfilePopup: React.FC<IProps> = (
  { user, fetchOrganization, createOrganization, fullfill, logout, organization, setup }
) => {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div>
      <UserAttrButton
        firstName={user?.firstName || ''}
        lastName={user?.lastName || ''}
        showDetails={setShowDetails}
        details={showDetails}
      />
      <ProfilePopupInfo
        isShow={showDetails}
        user={user}
        fetchOrganization={fetchOrganization}
        createOrganization={createOrganization}
        fullfill={fullfill}
        logout={logout}
        setup={setup}
        organization={organization}
      />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  user: state.user.user,
  organization: state.user.currentOrganization
});

const mapDispatchToProps = {
  fetchOrganization: fetchOrgInfoRoutine,
  createOrganization: createOrganizationRoutine.request,
  setup: createOrganizationRoutine.trigger,
  fullfill: createOrganizationRoutine.fulfill,
  logout: logotUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePopup);
