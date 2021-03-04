import React from 'react';
import { Button, FormControl } from 'react-bootstrap';

import User from '../components/User';

import styles from './styles.module.scss';

interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  status: string
  action: string;
}

const testUsers: Array<IUser> = [{
  firstName: 'Ktotot',
  lastName: 'Ochenvash',
  email: 'email@email',
  role: 'Admin',
  status: 'Active',
  action: 'Deactivate'
}];

// TODO
// Connect to redux
// Sagas / requests
// modal
// searchbox

const Users: React.FC = () => {
  const users = testUsers.map(({ firstName, lastName, email, role, status, action }) => (
    <User
      firstName={firstName}
      lastName={lastName}
      email={email}
      role={role}
      status={status}
      action={action}
      clsName={styles.userLine}
    />
  ));

  return (
    <div className={styles.container}>
      <div><h2>Users</h2></div>
      <div className={styles.userSection}>
        <span>
          There are
          <span className={styles.charge}> 0 total users </span>
          in your organization
        </span>
        <Button variant="primary">Invite new</Button>
      </div>
      <div>
        <FormControl placeholder="Search users" type="text" className="col-3" />
      </div>
      <div className={styles.usersTab}>
        <div className={[styles.userLine, styles.tabHead].join(' ')}>
          <span>Members</span>
          <span>Role</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {users}
      </div>
    </div>
  );
};

export default Users;
