import React, { useEffect, useState } from 'react';
import { IApps } from '../../../../common/models/apps/IApps';
import { Modal, Form, Button } from 'react-bootstrap';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import { editAppRoutine, showEditRoutine } from '../../routines';

interface IProps {
  app?: IApps;
  isShow?: boolean,
  isFailed?: boolean
  showEdit: (data: { app?: IApps, show: boolean }) => void;
  edit: (data: { app: IApps, name: string }) => void;
}

const UpdateApp: React.FC<IProps> = ({ app, edit, isShow, showEdit, isFailed }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(app?.name || '');
  }, [app?.name]);

  const handleClose = () => {
    setName('');
    showEdit({ show: false });
  };

  const handleEdit = () => {
    if (!name) {
      return;
    }
    if (app && name) {
      edit({ app, name });
    }
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title>Rename an app</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {!isFailed ? <span>Failed to rename app</span> : null}
          <Form.Label className={styles.required}>App name</Form.Label>
          <Form.Control
            required
            className={styles.formControl}
            type="text"
            value={name}
            placeholder="New app name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <Button variant="primary" className="w-100" type="submit" onClick={handleEdit}>
            Rename app
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state: IAppState) => ({
  app: state.application.modal?.app,
  isShow: state.application.modal?.show
});

const mapDispatchToProps = {
  edit: editAppRoutine,
  showEdit: showEditRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateApp);
