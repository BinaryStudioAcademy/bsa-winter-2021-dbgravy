import React from 'react';
import styles from './styles.module.scss';

interface IProps {
  clsName: string,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateOrganization: React.FC<IProps> = ({ clsName, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className={[styles.center, clsName].join(' ')}>
      <div>Create an organization</div>
      <input type="text" className={styles.input} placeholder="Organization name" />
      <div className={styles.error}> </div>
      <div className={styles.btnsContainer}>
        <div>Create</div>
        <div
          onClick={handleClose}
          onKeyPress={handleClose}
          role="button"
          tabIndex={0}
        >
          Back
        </div>
      </div>
    </div>
  );
};

export default CreateOrganization;
