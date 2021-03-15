import React, { ChangeEvent, useState, useEffect } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  fetchUsersRoutine,
  inviteNewUserRoutine,
  modalShowRoutine,
  reinviteUserRoutine,
  userActivationRoutine
} from '../../routines';
import { IUser } from '../../../../common/models/user/IUser';
import { IAppState } from '../../../../common/models/store/IAppState';
import { Status } from '../../../../common/enums/UserStatus';
import User from '../../components/User';
import InviteModal from '../../components/InviteModal';
import styles from './styles.module.scss';
import { Roles } from '../../../../common/enums/UserRoles';
import { fetchOrgInfoRoutine } from '../../../../containers/ProfilePopup/routines';
import Loader from '../../../../components/Loader';
import { IUserEdit } from '../../../../common/models/user/IUserEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  users: IUser[],
  count: number,
  organizationId?: string,
  isLoading: boolean,
  isFailed: boolean,
  showModal: boolean
  userChanges: IUserEdit,
  fetchUserOrganization: () => void,
  fetchUsers: () => void,
  inviteNew: (obj: { email: string, role: Roles, new?: boolean }) => void,
  reInvite: (obj: { id: string, email: string, role?: Roles, new?: boolean }) => void,
  activation: (obj: { id: string, status: Status }) => void,
  setShowModal: (status: boolean) => void,
}

const Users: React.FC<IProps> = ({
  users, count, isLoading, fetchUsers, inviteNew, reInvite, activation, userChanges, isFailed,
  setShowModal, showModal, fetchUserOrganization, organizationId }) => {
  useEffect(() => {
    fetchUsers();
  }, [organizationId]);

  useEffect(() => {
    fetchUserOrganization();
  }, []);

  const [searchBox, setSearch] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const displayUsers = () => (
    users
      .filter(
        ({ firstName, lastName, email }) => (
          `${firstName} ${lastName}`.toLowerCase().includes(searchBox.toLowerCase())
          || email?.toLowerCase().includes(searchBox.toLowerCase()))
      )
      .map(({ id, firstName, lastName, email, role, status }) => {
        let action;

        switch (status) {
          case Status.Active:
            action = 'Deactivate';
            break;
          case Status.Deactivated:
            action = 'Activate';
            break;
          default:
            action = 'Resend invite';
            break;
        }

        return (
          <User
            key={id}
            id={id || ''}
            firstName={firstName || ''}
            lastName={lastName || ''}
            email={email || ''}
            role={role || Roles.Viewer}
            status={status || Status.Pending}
            action={action}
            clsName={styles.userLine}
            resendInvite={reInvite}
            activateUser={activation}
            userChanges={userChanges}
          />
        );
      })
  );

  const render = () => {
    if (isFailed) {
      return (
        <div className={styles.lf}>
          {'Failed to get users '}
          <FontAwesomeIcon icon={faSyncAlt} onClick={fetchUsers} color="grey" />
        </div>
      );
    }
    return (
      <Loader isLoading={isLoading} isAbsolute={false}>{displayUsers()}</Loader>
    );
  };

  return (
    <div className={styles.container}>
      <div><h2>Users</h2></div>
      <div className={styles.rowSection}>
        <span>
          There are
          <span className={styles.charge}>
            {` ${count} total users `}
          </span>
          in your organization
        </span>
        <Button variant="primary" onClick={() => { setShowModal(true); }}>Invite new</Button>
      </div>
      <div>
        <FormControl
          placeholder="Search users"
          type="text"
          className="col-3"
          value={searchBox}
          onChange={onChange}
        />
      </div>
      <div className={styles.usersTab}>
        <div className={[styles.userLine, styles.tabHead].join(' ')}>
          <span>Members</span>
          <span>Role</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {render()}
      </div>
      <InviteModal
        showModal={showModal}
        clsName={styles.rowSection}
        setShowModal={setShowModal}
        handleSend={inviteNew}
        userChanges={userChanges}
      />
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  users: state.settings.users,
  count: state.settings.users.length,
  isLoading: state.settings.isLoading,
  isFailed: state.settings.isFailed,
  userChanges: state.settings.userChanges,
  showModal: state.settings.showModal,
  organizationId: state.user.currentOrganization?.id
});

const mapDispactchToProps = {
  fetchUsers: fetchUsersRoutine,
  inviteNew: inviteNewUserRoutine,
  reInvite: reinviteUserRoutine,
  activation: userActivationRoutine,
  setShowModal: modalShowRoutine,
  fetchUserOrganization: fetchOrgInfoRoutine
};

export default connect(mapStateToProps, mapDispactchToProps)(Users);
