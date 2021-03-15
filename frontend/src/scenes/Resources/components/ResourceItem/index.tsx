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
  edit: (obj: { resource: IResource, updated?: Partial<IResource> }) => void;
}

const ResourceItem: React.FC<IProps> = ({ resource, remove, edit }) => {
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
            onClick={() => edit({ resource })}
            role="button"
            onKeyPress={() => edit({ resource })}
            tabIndex={0}
          >
            <Link to={Routes.ResourcesEdit} className={styles.linklike}>Edit</Link>
          </span>
          <span
            onClick={() => remove({ resource })}
            role="button"
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
