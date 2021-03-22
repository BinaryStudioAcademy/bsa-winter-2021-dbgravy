import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Routes } from '../../../../common/enums/Routes';
import { IResource } from '../../../../common/models/resources/IResource';
import { CalendarEnum } from '../../enums/CalendarEnum';
import styles from './styles.module.scss';

interface IProps {
  resource: IResource;
  remove: (obj: { resource: IResource }) => void;
}

const ResourceItem: React.FC<IProps> = ({
  resource,
  remove
}) => {
  const [display, setDisplay] = useState(false);

  return (
    <tr>
      <td>{resource.name}</td>
      <td>{resource.type}</td>
      <td>{resource.dbName}</td>
      <td><Moment calendar={CalendarEnum}>{resource.createdAt}</Moment></td>
      <td>
        <Button variant="dark" onClick={() => setDisplay(!display)}>...</Button>
        <div className={`${styles.child} ${display ? styles.none : ''}`}>
          <span
            role="button"
            tabIndex={0}
          >
            <Link to={`${Routes.ResourcesAddEdit}/${resource.id}`} className={styles.linklike}>Edit</Link>
          </span>
          <span
            onClick={() => remove({ resource })}
            role="button"
            className={styles.action}
            onKeyPress={() => remove({ resource })}
            tabIndex={0}
          >
            Delete
          </span>
        </div>
      </td>
    </tr>
  );
};

export default ResourceItem;
