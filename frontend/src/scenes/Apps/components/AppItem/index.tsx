import React from 'react';
import styles from './styles.module.scss';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { IApps } from '../../../../common/models/apps/IApps';
import Moment from 'react-moment';
import { CalendarEnum } from '../../../Resources/enums/CalendarEnum';
import UpdateApp from '../../containers/UpdateApp';

interface IProps {
  app: IApps;
  deleteApp: (data: { app: IApps }) => void;
  showEdit: (data: { app: IApps, show: boolean }) => void;
}

const AppItem: React.FC<IProps> = ({
  app, showEdit, deleteApp
}) => (
  <div className={styles['list-item']}>
    <div className={styles['app-main-info']}>
      <FontAwesomeIcon icon={faBriefcase} />
      <div className={styles['main-info']}>
        <span>{app.name}</span>
        <span className="text-secondary">
          Created&ensp;
          <Moment calendar={CalendarEnum}>{app.createdAt}</Moment>
        </span>
      </div>
    </div>
    <div>
      <Button variant="outline-dark">...</Button>
    </div>
    <UpdateApp />
  </div>
);

export default AppItem;
