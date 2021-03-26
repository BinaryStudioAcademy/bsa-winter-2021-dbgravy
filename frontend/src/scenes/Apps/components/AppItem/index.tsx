import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { IApps } from '../../../../common/models/apps/IApps';
import Moment from 'react-moment';
import { CalendarEnum } from '../../../Resources/enums/CalendarEnum';
import UpdateApp from '../../containers/UpdateApp';
import { Link } from 'react-router-dom';
import DeleteModal from '../DeleteModal/index';
import styled from 'styled-components';

const Drop = styled(DropdownButton)`
  .dropdown-toggle::after {
    border: none;
    margin: 0;
  }
  .dropdown-item {
    padding-bottom: 7px;
  }
  .dropdown-menu {
    box-shadow: 1px 1px 9px -1px rgba(0, 0, 0, 0.41);
    border-radius: 5px;
  }
`;

interface IProps {
  app: IApps;
  deleteApp: (data: { app: IApps }) => void;
  showEdit: (data: { app: IApps, show: boolean }) => void;
}
const AppItem: React.FC<IProps> = ({
  app, showEdit, deleteApp
}) => {
  const [display, setDisplay] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const onEdit = () => {
    showEdit({ app, show: true });
    setDisplay(!display);
  };

  const handleCancelModal = () => {
    setShowDeleteModal(false);
  };

  const handleSubmitModal = () => {
    setShowDeleteModal(false);
    deleteApp({ app });
  };

  return (
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
        <Drop
          title="..."
          variant="outline-grey"
          className={['dbg-button', styles.dd].join(' ')}
        >
          <Dropdown.Item as="button" onClick={() => onEdit()}>
            <span className={styles.action}>Rename</span>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <Link to={`/app/editor/${app.id}`} className={styles.action}>App Editor</Link>
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => setShowDeleteModal(true)}
          >
            <span className={styles.delete}>Delete</span>
          </Dropdown.Item>
        </Drop>
        <UpdateApp />
      </div>
      <DeleteModal
        show={showDeleteModal}
        cancel={handleCancelModal}
        submit={handleSubmitModal}
      />
    </div>
  );
};

export default AppItem;
