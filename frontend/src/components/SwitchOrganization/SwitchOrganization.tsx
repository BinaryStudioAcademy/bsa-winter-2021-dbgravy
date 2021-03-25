import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IUserOrganization } from '../../common/models/user/IUserOrganization';
import { ListGroup } from 'react-bootstrap';
import Loader from '../Loader';
import { IBindingCallback1 } from '../../common/models/callback/IBindingCallback1';
import styles from './styles.module.scss';

interface IProps {
  organizations: IUserOrganization[];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  changeUserOrganization: IBindingCallback1<string>;
}

const SwitchOrganization: React.FC<IProps> = ({ organizations, changeUserOrganization, setShow }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleClose = () => {
    setShow(false);
  };

  const handleClick = (id: string) => {
    changeUserOrganization(id);
    setShow(false);
  };

  return (
    <div className={[styles.center, styles.container].join(' ')}>
      <div className={styles.head}>
        <span
          onClick={handleClose}
          onKeyPress={handleClose}
          role="button"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <span>Switch organization</span>
      </div>
      <input
        type="text"
        className={styles.input}
        placeholder="Organization name"
        onChange={ev => setSearchValue(ev.target.value)}
      />
      <Loader isLoading={!organizations.length}>
        <div className={styles.listContainer}>
          <ListGroup>
            {
              organizations
                .map(organization => (
                  organization.name?.toLowerCase().includes(searchValue.trim().toLowerCase())
                    ? (
                      <ListGroup.Item
                        action
                        variant="light"
                        key={organization.id}
                        onClick={() => handleClick(organization.id)}
                      >
                        {organization.name}
                      </ListGroup.Item>
                    )
                    : null))
}
          </ListGroup>
        </div>
      </Loader>
    </div>
  );
};

export default SwitchOrganization;
