import React, { useState } from 'react';
import { IAppState } from '../../common/models/store/IAppState';
import { createOrganizationRoutine, fetchOrgInfoRoutine } from './routines';
import { Routine } from 'redux-saga-routines';
import UserAttrButton from './components/UserAttrButton';
import ProfilePopupInfo from './components/ProfilePopupInfo';
import { connect } from 'react-redux';
import { IUser } from '../../common/models/user/IUser';

interface IProps {
  user?: IUser,
  fetchOrganization?: Routine<any>,
  createOrganization?: Routine<any>
}

const ProfilePopup: React.FC<IProps> = (
  { user, fetchOrganization, createOrganization }
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
  createOrganization: createOrganizationRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePopup);
