import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { IApps } from '../../../../common/models/apps/IApps';
import Moment from 'react-moment';
import { CalendarEnum } from '../../../Resources/enums/CalendarEnum';
import UpdateApp from '../../containers/UpdateApp';
import { Link } from 'react-router-dom';
import DeleteModal from '../DeleteModal/index';

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
        <Button
          className={(display) ? 'dbg-button dbg-active' : 'dbg-button'}
          variant="outline-light"
          onClick={() => setDisplay(!display)}
        >
          ...
        </Button>
        <div className={`${styles.child} ${display ? styles.none : ''}`}>
          <span
            onClick={() => onEdit()}
            role="button"
            className={styles.action}
            onKeyPress={() => onEdit()}
            tabIndex={0}
          >
            Rename
          </span>
          <span
            onClick={() => setShowDeleteModal(true)}
            role="button"
            className={styles.delete}
            onKeyPress={() => deleteApp({ app })}
            tabIndex={0}
          >
            Delete
          </span>
          <span role="button" className={styles.action}>
            <Link to={`/app/editor/${app.id}`} className={styles['app-editor']}>
              App Editor
            </Link>
          </span>
        </div>
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
