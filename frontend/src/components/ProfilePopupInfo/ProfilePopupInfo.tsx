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
import SwitchOrganization from '../SwitchOrganization/SwitchOrganization';
import { IBindingCallback1 } from '../../common/models/callback/IBindingCallback1';
import { Roles } from '../../common/enums/UserRoles';

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
  isShow: boolean
}

const ProfilePopupInfo: React.FC<IProps> = (
  { user,
    createOrganization,
    fetchOrganization,
    fetchUserOrganizations,
    changeUserOrganization,
    fullfill,
    logout,
    organization,
    organizations,
    isShow,
    setup }
) => {
  useEffect(() => {
    fetchOrganization(user);
    fetchUserOrganizations();
  }, []);

  const [showCreator, setShowCreator] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);

  const logoutUser = () => {
    logout();
  };

  const isLoadFail = () => {
    if (organization && organization.isLoading) {
      return (
        <div className={[styles.block, styles.loading].join(' ')}>
          <Loader isLoading={organization.isLoading} isAbsolute={false} />
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
      <div>
        <div className={styles['org-block']}>
          <span className={styles.primary}>
            {organization?.name}
          </span>
          <span className={styles.secondary}>
            {organization?.role}
          </span>
        </div>
        {
          (organization?.role === Roles.Admin) && (
            <div className={styles['options-wrp']}>
              <span className={styles.lilpad}>
                <FontAwesomeIcon icon={faCog} color="grey" />
                <Link to={Routes.Settings} className={styles.linklike}>Organization settings</Link>
              </span>
            </div>
          )
        }
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

    if (showSwitcher) {
      return (
        <SwitchOrganization
          setShow={setShowSwitcher}
          organizations={organizations}
          changeUserOrganization={changeUserOrganization}
        />
      );
    }

    return (
      <div className={styles.container}>
        {isLoadFail()}
        <div className={styles['opt-block']}>
          <div className={styles['options-wrp']}>
            <span
              onClick={() => setShowCreator(true)}
              role="presentation"
              onKeyPress={() => setShowCreator(true)}
              className={styles.lilpad}
            >
              <FontAwesomeIcon icon={faPlus} color="grey" />
              Create organization
            </span>
          </div>
          <div className={styles['options-wrp']}>
            <span
              onClick={() => setShowSwitcher(true)}
              role="button"
              tabIndex={0}
              onKeyPress={() => setShowSwitcher(true)}
              className={styles.lilpad}
            >
              <FontAwesomeIcon icon={faSyncAlt} color="grey" />
              Switch Organization
            </span>
          </div>
        </div>
        <div className={[styles.block, styles.line].join(' ')} style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <UserAttrButton
            firstName={user?.firstName || ''}
            lastName={user?.lastName || ''}
          />
          <div className={styles.block}>
            <span className={styles.primary}>{`${user?.firstName} ${user?.lastName}`}</span>
          </div>
        </div>
        <div className={styles['options-wrp']}>
          <span
            onClick={() => logoutUser()}
            role="presentation"
            onKeyPress={() => logoutUser()}
            className={styles.lilpad}
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
