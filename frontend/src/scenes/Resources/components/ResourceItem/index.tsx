import React, { useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Routes } from '../../../../common/enums/Routes';
import { IResource } from '../../../../common/models/resources/IResource';
import { CalendarEnum } from '../../enums/CalendarEnum';
import styles from './styles.module.scss';
import DeleteModal from '../DeleteModal/index';
import { Dropdown, DropdownButton } from 'react-bootstrap';
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
  resource: IResource;
  remove: (obj: { resource: IResource }) => void;
}

const ResourceItem: React.FC<IProps> = ({
  resource,
  remove
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCancelModal = () => {
    setShowDeleteModal(false);
  };

  const handleSubmitModal = () => {
    setShowDeleteModal(false);
    remove({ resource });
  };

  return (
    <tr>
      <td>{resource.name}</td>
      <td>{resource.type}</td>
      <td>{resource.dbName}</td>
      <td><Moment calendar={CalendarEnum}>{resource.createdAt}</Moment></td>
      <td>
        <Drop
          title="..."
          variant="outline-grey"
          className={['dbg-button', styles.dd].join(' ')}
        >
          <Dropdown.Item as="button">
            <Link to={`${Routes.ResourcesAddEdit}/${resource.id}`} className={styles.linklike}>Edit</Link>
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => setShowDeleteModal(true)}
          >
            <span className={styles.action}>Delete</span>
          </Dropdown.Item>
        </Drop>
      </td>
      <DeleteModal
        show={showDeleteModal}
        cancel={handleCancelModal}
        submit={handleSubmitModal}
      />
    </tr>
  );
};

export default ResourceItem;
