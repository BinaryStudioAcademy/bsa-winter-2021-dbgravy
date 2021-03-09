import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './styles.module.scss';

interface IProps {
  firstName: string,
  lastName: string,
  showDetails?: React.Dispatch<React.SetStateAction<boolean>>,
  details?: boolean
}

const UserAttrButton: React.FC<IProps> = ({ firstName, lastName, showDetails, details }) => {
  const firstLetter = (str: string) => str[0].toUpperCase();

  const handleClick = () => {
    if (typeof details === 'boolean' && showDetails) {
      showDetails(!details);
    }
  };

  return (
    <Button variant="secondary" onClick={handleClick} className={styles.profileicon}>
      <span>{`${firstLetter(firstName)}${firstLetter(lastName)}`}</span>
    </Button>
  );
};

export default UserAttrButton;
