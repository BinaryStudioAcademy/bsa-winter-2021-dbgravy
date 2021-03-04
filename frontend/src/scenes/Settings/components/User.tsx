import React from 'react';

import styles from './styles.module.scss';

interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  status: string
  action: string;
  clsName: string
}

const User: React.FC<IUser> = ({ firstName, lastName, email, role, status, action, clsName }) => {
  const firstLetter = (s: string) => s[0];

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
      <span className={styles.selected}>{action}</span>
    </div>
  );
};

export default User;
