import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Routine } from 'redux-saga-routines';
import { IUser } from '../../../common/models/user/IUser';
import Loader from '../../../components/Loader';

interface IProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  create?: Routine<any>,
  user?: IUser,
  fullfill: Routine<any>
}

const CreateOrganization: React.FC<IProps> = ({ setShow, create, user, fullfill }) => {
  useEffect(() => {
    if (user?.newOrganization?.isLoading === true
      && user?.newOrganization?.isFailed === true) {
      handleClose();
    }
  }, []);

  const handleClose = () => {
    setOrgName('');
    setShow(false);
    fullfill({ user });
  };

  const [organizationName, setOrgName] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setOrgName(e.target.value);

  const onSend = () => {
    setOrgName('');
    create({ user, newOrganization: { name: organizationName } });
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
          <FontAwesomeIcon icon={faArrowLeft} size="sm" />
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
      <div className={user?.newOrganization?.isFailed ? styles.error : styles.po}>
        {user?.newOrganization?.isLoading
          ? <Loader isLoading={user?.newOrganization?.isLoading || false} isAbsolute={false} /> : null}
        {user?.newOrganization?.isFailed ? 'Failed to create new organization.' : ' '}
      </div>
      <div className={styles.btnsContainer}>
        <div
          onClick={onSend}
          onKeyPress={onSend}
          role="button"
          tabIndex={0}
        >
          Create
        </div>
      </div>
    </div>
  );
};

export default CreateOrganization;
