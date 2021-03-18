import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { faBriefcase, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { IApps } from '../../../../common/models/apps/IApps';
import Moment from 'react-moment';
import { CalendarEnum } from '../../../Resources/enums/CalendarEnum';
import UpdateApp from '../../containers/UpdateApp';
import { Link } from 'react-router-dom';
import { setCurrentlyAppId } from '../../routines';

interface IProps {
  app: IApps;
  deleteApp: (data: { app: IApps }) => void;
  showEdit: (data: { app: IApps, show: boolean }) => void;
}
const AppItem: React.FC<IProps> = ({
  app, showEdit, deleteApp
}) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const openAppEditor = () => {
    dispatch(setCurrentlyAppId.trigger(app.id));
  };
  const onEdit = () => {
    showEdit({ app, show: true });
    setDisplay(!display);
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
        <Button variant="dark" onClick={() => setDisplay(!display)}>
          <FontAwesomeIcon icon={faCaretDown} color="white" />
        </Button>
        <div className={`${styles.child} ${display ? styles.none : ''}`}>
          <span
            onClick={() => onEdit()}
            role="button"
            onKeyPress={() => onEdit()}
            tabIndex={0}
          >
            Edit
          </span>
          <span
            onClick={() => deleteApp({ app })}
            role="button"
            onKeyPress={() => deleteApp({ app })}
            tabIndex={0}
          >
            Delete
          </span>
          <Button
            onClick={openAppEditor}
          >
            <Link to={`/app/editor/${app.id}`}>
              App Editor
            </Link>
          </Button>
        </div>
        <UpdateApp />
      </div>
    </div>
  );
};

export default AppItem;
