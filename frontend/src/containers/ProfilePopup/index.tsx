import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faArrowRight, faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import CreateOrganization from './components/CreateOrganization';
import { IAppState } from '../../common/models/store/IAppState';
import { connect } from 'react-redux';
import { Roles } from '../../common/enums/UserRoles';
import { fetchOrgInfoRoutine, createOrganizationRoutine } from './routines';
import { Routine } from 'redux-saga-routines';

interface IProps {
  name: string,
  lastname: string,
  organization: string,
  organizationId: string,
  role: Roles,
  fetchOrganization: Routine<any>,
  createOrganizationRoutine: Routine<any>
}

const ProfilePopup: React.FC<IProps> = ({ name, lastname, organization, role,
  fetchOrganization, organizationId }) => {
  useEffect(() => {
    fetchOrganization();
  }, [organizationId]);
  const [showCreator, setShowCreator] = useState(false);
  const firstLetter = (s: string) => s[0];

  const renderContent = () => (
    <div className={styles.container}>
      <div className={styles.block}>
        <span className={styles.primary}>
          {organization}
        </span>
        <span className={styles.secondary}>{role}</span>
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
        <div className={styles.image}>{firstLetter(name)}</div>
        <div className={styles.block}>
          <span className={styles.primary}>{`${name} ${lastname}`}</span>
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

  return (
    <div>
      {showCreator ? (
        <CreateOrganization
          clsName={styles.container}
          setShow={setShowCreator}
          create={createOrganizationRoutine}
        />
      )
        : renderContent()}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  lastname: state.user.lastname,
  name: state.user.firstname,
  organization: state.user.currentOrganization.name,
  role: state.user.currentOrganization.role,
  organizationId: state.user.organizationId
});

const mapDispatchToProps = {
  fetchOrganization: fetchOrgInfoRoutine,
  createOrganization: createOrganizationRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePopup);
