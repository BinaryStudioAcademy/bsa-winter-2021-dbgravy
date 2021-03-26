import React, { useState } from 'react';
import { IAppState } from '../../common/models/store/IAppState';
import {
  createOrganizationRoutine,
  fetchOrgInfoRoutine,
  fetchUserOrganizationsRoutine,
  changeUserOrganizationRoutine
} from './routines';
import UserAttrButton from '../../components/UserAttrButton/UserAttrButton';
import ProfilePopupInfo from '../../components/ProfilePopupInfo/ProfilePopupInfo';
import { connect } from 'react-redux';
import { IUser } from '../../common/models/user/IUser';
import { logotUserRoutine } from '../../scenes/Auth/routines';
import { IUserOrganization } from '../../common/models/user/IUserOrganization';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '../../common/models/callback/IBindingCallback1';

interface IProps {
  user: IUser,
  organization?: IUserOrganization,
  organizations: IUserOrganization[];
  fetchOrganization: (user?: IUser) => void,
  fetchUserOrganizations: () => void;
  changeUserOrganization: IBindingCallback1<string>;
  createOrganization: (payload: { user?: IUser, newOrganization: { name: string } }) => void,
  fullfill: (payload: { user?: IUser }) => void,
  logout: () => void,
  setup: (payload: { user?: IUser }) => void,
}

const ProfilePopup: React.FC<IProps> = (
  { user,
    fetchOrganization,
    fetchUserOrganizations,
    changeUserOrganization,
    createOrganization,
    fullfill,
    logout,
    organization,
    organizations,
    setup }
) => {
  const [showDetails, setShowDetails] = useState(true);
  const createOrg = (info: any) => {
    createOrganization(info);
    setShowDetails(true);
  };

  return (
    <div className={styles.infoContainer}>
      <div><span className={styles.organizationName}>{organization ? organization.name : ''}</span></div>
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
        fetchUserOrganizations={fetchUserOrganizations}
        changeUserOrganization={changeUserOrganization}
        createOrganization={createOrg}
        fullfill={fullfill}
        logout={logout}
        setup={setup}
        organization={organization}
        organizations={organizations}
        showDetails={setShowDetails}
      />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  user: state.user.user,
  organization: state.user.currentOrganization,
  organizations: state.user.organizations
});

const mapDispatchToProps = {
  fetchOrganization: fetchOrgInfoRoutine,
  fetchUserOrganizations: fetchUserOrganizationsRoutine,
  changeUserOrganization: changeUserOrganizationRoutine,
  createOrganization: createOrganizationRoutine.request,
  setup: createOrganizationRoutine.trigger,
  fullfill: createOrganizationRoutine.fulfill,
  logout: logotUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePopup);
