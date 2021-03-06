import React, { useState } from 'react';
import { IAppState } from '../../common/models/store/IAppState';
import { createOrganizationRoutine, fetchOrgInfoRoutine } from './routines';
import UserAttrButton from '../../components/UserAttrButton/UserAttrButton';
import ProfilePopupInfo from '../../components/ProfilePopupInfo/ProfilePopupInfo';
import { connect } from 'react-redux';
import { IUser } from '../../common/models/user/IUser';
import { logotUserRoutine } from '../../scenes/Auth/routines';

interface IProps {
  user?: IUser,
  fetchOrganization: (user?: IUser) => void,
  createOrganization: (payload: { user?: IUser, newOrganization: { name: string } }) => void,
  fullfill: (payload: { user?: IUser }) => void,
  logout: () => void
}

const ProfilePopup: React.FC<IProps> = (
  { user, fetchOrganization, createOrganization, fullfill, logout }
) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <UserAttrButton
        firstName={user?.firstName || ''}
        lastName={user?.lastName || ''}
        showDetails={setShowDetails}
        details={showDetails}
      />
      {showDetails ? (
        <ProfilePopupInfo
          user={user}
          fetchOrganization={fetchOrganization}
          createOrganization={createOrganization}
          fullfill={fullfill}
          logout={logout}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  user: state.user.user
});

const mapDispatchToProps = {
  fetchOrganization: fetchOrgInfoRoutine,
  createOrganization: createOrganizationRoutine,
  fullfill: createOrganizationRoutine.fulfill,
  logout: logotUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePopup);
