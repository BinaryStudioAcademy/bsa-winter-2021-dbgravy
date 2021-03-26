import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../../common/models/user/IUser';
import Loader from '../Loader';
import { Button } from 'react-bootstrap';

interface IProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  create: (payload: { user?: IUser, newOrganization: { name: string } }) => void,
  fullfill: (payload: { user?: IUser }) => void,
  setup: (payload: { user?: IUser }) => void,
  user?: IUser
}

const CreateOrganization: React.FC<IProps> = ({ setShow, create, user, fullfill, setup }) => {
  useEffect(() => {
    if (user?.newOrganization?.isLoading === false
      && user?.newOrganization?.isDone === true) {
      handleClose();
    }
  }, []);

  const handleClose = () => {
    setOrgName('');
    setShow(false);
    fullfill({ user });
  };

  const [organizationName, setOrgName] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value);
    if (user?.newOrganization?.isDone) {
      setup({ user });
    }
  };

  const onSend = () => {
    create({ user, newOrganization: { name: organizationName } });
    setOrgName('');
    handleClose();
  };

  return (
    <div className={[styles.center, styles.container].join(' ')}>
      <div>
        <span
          onClick={handleClose}
          onKeyPress={handleClose}
          role="button"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </span>
        <span className={styles.head}>Create an organization</span>
      </div>
      <input
        type="text"
        className={styles.input}
        placeholder="Organization name"
        value={organizationName}
        onChange={onChange}
      />
      {user?.newOrganization?.isLoading
        ? <Loader isLoading={user?.newOrganization?.isLoading || false} isAbsolute={false} /> : null}
      <div className={styles.btnsContainer}>
        <Button onClick={onSend}>Create</Button>
      </div>
    </div>
  );
};

export default CreateOrganization;
