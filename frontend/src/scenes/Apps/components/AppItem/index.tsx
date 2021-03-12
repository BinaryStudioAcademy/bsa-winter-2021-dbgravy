import React from 'react';
import styles from './styles.module.scss';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { IApps } from '../../../../common/models/apps/IApps';
import Moment from 'react-moment';
import { CalendarEnum } from '../../../Resources/enums/CalendarEnum';
// import { Link } from 'react-router-dom';

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
        <span className="text-secondary">
          Created&ensp;
          <Moment calendar={CalendarEnum}>{app.createdAt}</Moment>
        </span>
      </div>
    </div>
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="outline-dark" id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </div>
);

export default AppItem;
