import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faSyncAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import UserAttrButton from './UserAttrButton';
import { IUser } from '../../../common/models/user/IUser';
import { Routine } from 'redux-saga-routines';
import CreateOrganization from './CreateOrganization';

interface IProps {
  user?: IUser,
  fetchOrganization?: Routine<any>,
  createOrganization?: Routine<any>
}

const ProfilePopupInfo: React.FC<IProps> = ({ user, createOrganization, fetchOrganization }) => {
  useEffect(() => {
    fetchOrganization(user);
  }, [user?.organizationId]);

  const [showCreator, setShowCreator] = useState(false);

  const render = () => {
    if (showCreator) {
      return <CreateOrganization setShow={setShowCreator} />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.block}>
          <span className={styles.primary}>
            {user?.currentOrganization?.name}
          </span>
          <span className={styles.secondary}>{user?.currentOrganization?.role}</span>
          <span>
            <FontAwesomeIcon icon={faCog} color="grey" />
            Organization settings
          </span>
        </div>
        <div className={styles.block}>
          <span onClick={() => setShowCreator(true)} role="button" tabIndex={0} onKeyPress={() => setShowCreator(true)}>
            <FontAwesomeIcon icon={faPlus} color="grey" />
            Create organization
          </span>
          <span role="button">
            <FontAwesomeIcon icon={faSyncAlt} color="grey" />
            Switch Organization
          </span>
        </div>
        <div className={[styles.block, styles.line].join(' ')}>
          <UserAttrButton
            firstName={user?.firstName || ''}
            lastName={user?.lastName || ''}
          />
          <div className={styles.block}>
            <span className={styles.primary}>{`${user?.firstName} ${user?.lastName}`}</span>
            <span className={styles.link}>View profile</span>
          </div>
        </div>
        <div className={styles.block}>
          <span>
            <FontAwesomeIcon icon={faArrowRight} size="sm" color="grey" />
            Logout
          </span>
        </div>
      </div>
    );
  };

  return (<div>{render()}</div>);
};

export default ProfilePopupInfo;
