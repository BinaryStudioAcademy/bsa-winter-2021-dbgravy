import React from 'react';
import { Status } from '../../../../common/enums/UserStatus';
import { Roles } from '../../../../common/enums/UserRoles';
import styles from '../styles.module.scss';
import Loader from '../../../../components/Loader';
import { IUserEdit } from '../../../../common/models/user/IUserEdit';

interface IProps {
  id: string
  firstName: string,
  lastName: string,
  email: string,
  role: Roles,
  status: Status
  action: string;
  clsName: string,
  userChanges: IUserEdit,
  resendInvite: (obj: { id: string, email: string, role?: Roles }) => void,
  activateUser: (obj: { id: string, status: Status }) => void,
}

const User: React.FC<IProps> = ({
  id, firstName, lastName, email, role, status,
  action, clsName, resendInvite, activateUser, userChanges }) => {
  const firstLetter = (s: string) => s[0];
  const toCapital = (string: string) => `${string[0].toUpperCase()}${string.slice(1)}`;

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
    ? <Loader isLoading={userChanges.isLoading} isAbsolute={false} />
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
      <span className={styles.userRole}>{toCapital(role)}</span>
      <span className={styles.userStatus}>{toCapital(status)}</span>
      {renderAction()}
    </div>
  );
};

export default User;
