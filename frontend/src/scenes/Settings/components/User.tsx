import React from 'react';
import { Routine } from 'redux-saga-routines';
import { Status } from '../../../common/enums/UserStatus';
import { Roles } from '../../../common/enums/UserRoles';
import styles from './styles.module.scss';

interface IProps {
  id: string
  firstName: string,
  lastName: string,
  email: string,
  role: Roles,
  status: Status
  action: string;
  clsName: string,
  resendInvite: Routine<any>,
  activateUser: Routine<any>,
  userChanges: {
    id?: string,
    isLoading?: boolean,
    isFailed?: boolean
  }
}

const User: React.FC<IProps> = ({
  id, firstName, lastName, email, role, status,
  action, clsName, resendInvite, activateUser, userChanges }) => {
  const firstLetter = (s: string) => s[0];

  const onClick = () => {
    switch (status) {
      case Status.Active:
        activateUser({ id, status: Status.Deactivated });
        break;

      case Status.Deactivated:
        activateUser({ id, status: Status.Active });
        break;

      default:
        resendInvite({ id, email });
    }
  };

  const renderAction = () => (userChanges.id === id && userChanges.isLoading
    ? <div>Loading...</div>
    : (
      <span
        className={styles.action}
        onClick={onClick}
        onKeyPress={onClick}
        role="button"
        tabIndex={0}
      >
        {action}
        {userChanges.id === id && userChanges.isFailed ? <span className={styles.failed}>!</span> : null}
      </span>
    )
  );

  return (
    <div className={clsName}>
      <div className={styles.uData}>
        <div className={styles.image}>{`${firstLetter(firstName)} ${firstLetter(lastName)}`}</div>
        <div className={styles.credits}>
          <span>{`${firstName} ${lastName}`}</span>
          <span>{email}</span>
        </div>
      </div>
      <span className={styles.userRole}>{role}</span>
      <span className={styles.userStatus}>{status}</span>
      {renderAction()}
    </div>
  );
};

export default User;
