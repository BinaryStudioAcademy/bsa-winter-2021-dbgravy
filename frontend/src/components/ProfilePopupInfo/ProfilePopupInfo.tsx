import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faSyncAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import UserAttrButton from '../UserAttrButton/UserAttrButton';
import { IUser } from '../../common/models/user/IUser';
import CreateOrganization from '../CreateOrganization/CreateOrganization';
import Loader from '../Loader';
import { IUserOrganization } from '../../common/models/user/IUserOrganization';
import { Routes } from '../../common/enums/Routes';
import { Link } from 'react-router-dom';

interface IProps {
  user: IUser,
  organization?: IUserOrganization
  fetchOrganization: (user?: IUser) => void,
  createOrganization: (payload: { user?: IUser, newOrganization: { name: string } }) => void,
  fullfill: (payload: { user?: IUser }) => void,
  logout: () => void,
  setup: (payload: { user?: IUser }) => void,
  isShow: boolean
}

const ProfilePopupInfo: React.FC<IProps> = (
  { user, createOrganization, fetchOrganization, fullfill, logout, organization, isShow, setup }
) => {
  useEffect(() => {
    fetchOrganization(user);
  }, []);

  const [showCreator, setShowCreator] = useState(false);

  const logoutUser = () => {
    logout();
  };

  const isLoadFail = () => {
    if (organization && organization.isLoading) {
      return (
        <div className={[styles.block, styles.loading].join(' ')}>
          <Loader isLoading={organization.isLoading || false} isAbsolute={false} />
        </div>
      );
    }
    if (organization && organization.isFailed) {
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
          {organization?.name}
        </span>
        <span className={styles.secondary}>{organization?.role}</span>
        <span>
          <FontAwesomeIcon icon={faCog} color="grey" />
          <Link to={Routes.Settings} className={styles.linklike}>Organization settings</Link>
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
          setup={setup}
        />
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.hide}>
          {isLoadFail()}
        </div>
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

  return (<div className={isShow ? styles.none : ''}>{render()}</div>);
};

export default ProfilePopupInfo;
