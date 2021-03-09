import React, { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Routine } from 'redux-saga-routines';

interface IProps {
  clsName: string,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  create: Routine<any>
}

const CreateOrganization: React.FC<IProps> = ({ clsName, setShow }) => {
  const handleClose = () => {
    setOrgName('');
    setShow(false);
  };

  const [organizationName, setOrgName] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setOrgName(e.target.value);

  const onSend = () => {
    setOrgName('');
    handleClose();
  };

  return (
    <div className={[styles.center, clsName].join(' ')}>
      <div>
        <span
          onClick={handleClose}
          onKeyPress={handleClose}
          role="button"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="sm" />
        </span>
        <span>Create an organization</span>
      </div>
      <input
        type="text"
        className={styles.input}
        placeholder="Organization name"
        value={organizationName}
        onChange={onChange}
      />
      <div className={styles.error}> </div>
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
