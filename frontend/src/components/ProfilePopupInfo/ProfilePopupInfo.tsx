import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faSyncAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import UserAttrButton from '../UserAttrButton/UserAttrButton';
import { IUser } from '../../common/models/user/IUser';
import CreateOrganization from '../CreateOrganization/CreateOrganization';
import Loader from '../Loader';
import { clearStorage } from '../../common/helpers/storageHelper';

interface IProps {
  user?: IUser,
  fetchOrganization: (user?: IUser) => void,
  createOrganization: (payload: { user?: IUser, newOrganization: { name: string } }) => void,
  fullfill: (payload: { user?: IUser }) => void,
  logout: () => void
}

const ProfilePopupInfo: React.FC<IProps> = ({ user, createOrganization, fetchOrganization, fullfill, logout }) => {
  useEffect(() => {
    fetchOrganization(user);
  }, [user?.organizationId]);

  const [showCreator, setShowCreator] = useState(false);

  const logoutUser = () => {
    clearStorage();
    logout();
  };

  const isLoadFail = () => {
    if (user?.currentOrganization?.isLoading) {
      return (
        <div className={[styles.block, styles.loading].join(' ')}>
          <Loader isLoading={user?.currentOrganization?.isLoading || false} isAbsolute={false} />
        </div>
      );
    }
    if (user?.currentOrganization?.isFailed) {
      return (
        <div className={[styles.block, styles.failed].join(' ')}>
          Failed to fetch organization.
          <br />
          Do you have one?
        </div>
      );
    }

    return (
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
    );
  };

  const render = () => {
    if (showCreator) {
      return (
        <CreateOrganization
          setShow={setShowCreator}
          create={createOrganization}
          user={user}
          fullfill={fullfill}
        />
      );
    }

    return (
      <div className={styles.container}>
        {isLoadFail()}
        <div className={styles.block}>
          <span
            onClick={() => setShowCreator(true)}
            role="button"
            tabIndex={0}
            onKeyPress={() => setShowCreator(true)}
          >
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
          <span
            onClick={() => logoutUser()}
            role="button"
            tabIndex={0}
            onKeyPress={() => logoutUser()}
          >
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
