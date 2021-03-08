import React, { useState } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faArrowRight, faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import CreateOrganization from './components/CreateOrganization';

const Popup: React.FC = () => {
  const [showCreator, setShowCreator] = useState(false);

  const renderContent = () => (
    <div className={styles.container}>
      <div className={styles.block}>
        <span className={styles.primary}>Organization name</span>
        <span className={styles.secondary}>role</span>
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
        <span>
          <FontAwesomeIcon icon={faSyncAlt} color="grey" />
          Switch Organization
        </span>
      </div>
      <div className={[styles.block, styles.line].join(' ')}>
        <div className={styles.image}>U</div>
        <div className={styles.block}>
          <span className={styles.primary}>FirstName LastName</span>
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
        />
      )
        : renderContent()}
    </div>
  );
};

export default Popup;
