import React from 'react';
import styles from './styles.module.scss';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { IApps } from '../../../../common/models/apps/IApps';

interface IProps {
  app: IApps;
}

const AppItem: React.FC<IProps> = ({
  app
}) => (
  <div className={styles['list-item']}>
    <div className={styles['app-main-info']}>
      <FontAwesomeIcon icon={faBriefcase} />
      <div className={styles['main-info']}>
        <span>{app.name}</span>
        <span className="text-secondary">Created by...</span>
      </div>
    </div>
    <div>
      <Button variant="outline-dark">...</Button>
    </div>
  </div>
);

export default AppItem;
