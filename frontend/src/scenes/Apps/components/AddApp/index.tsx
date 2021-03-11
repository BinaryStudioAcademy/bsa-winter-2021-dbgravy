import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './styles.module.scss';

interface IAddApp {
  onAddApp(name: string): void
}

const AddApp: React.FC<IAddApp> = ({ onAddApp }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [name, setAppName] = useState<string>('');

  const handleCancel = (): void => {
    setIsShow(false);
    setAppName('');
  };

  const handleCreate = (): void => {
    if (!name) {
      return;
    }
    onAddApp(name);
    setAppName('');
    setIsShow(false);
  };

  return (
    <div className={styles.btnWrp}>
      <Button variant="primary" onClick={() => setIsShow(!isShow)}>Create new</Button>
      <Modal show={isShow} onHide={handleCancel}>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>Create a blank app</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label className={styles.required}>App name</Form.Label>
            <Form.Control
              required
              className={styles.formControl}
              type="text"
              value={name}
              placeholder="Give your app a name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppName(e.target.value)}
            />
            <Button variant="primary" className="w-100" type="submit" onClick={handleCreate}>
              Create app
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddApp;
