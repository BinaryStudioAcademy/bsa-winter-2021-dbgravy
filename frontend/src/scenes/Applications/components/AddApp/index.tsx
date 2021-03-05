import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './styles.module.scss';

interface IAddApp {
  onAddApp(name: string): void
}

const AddApp: React.FC<IAddApp> = ({ onAddApp }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [appName, setAppName] = useState<string>('');

  const handleCancel = (): void => {
    setIsShow(false);
    setAppName('');
  };

  const handleClick = (): void => {
    onAddApp(appName);
    setAppName('');
  };

  return (
    <div className={styles.btnWrp}>
      <Button variant="info" onClick={() => setIsShow(!isShow)}>Add Application</Button>
      {
        isShow && (
          <Form className={styles.form}>
            <Form.Control
              className={styles.formControl}
              type="text"
              value={appName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppName(e.target.value)}
            />
            <Button className={styles.btn} variant="secondary" onClick={() => handleCancel()}>Cancel</Button>
            {' '}
            <Button className={styles.btn} variant="primary" onClick={() => handleClick()}>Create</Button>
          </Form>
        )
      }
    </div>
  );
};

export default AddApp;
