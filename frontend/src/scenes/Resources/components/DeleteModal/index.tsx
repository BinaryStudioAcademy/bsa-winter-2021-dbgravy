import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IProps {
  show: boolean,
  cancel: () => void,
  submit: () => void
}

const DeleteModal: React.FC<IProps> = ({ show, cancel, submit }) => (
  <Modal
    show={show}
    backdrop="static"
    keyboard={false}
    centered
  >
    <Modal.Header>
      <Modal.Title>Are you sure you want to delete this resource?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      This resource is&nbsp;
      <b>permanent</b>
      ! It cannot be undone
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={cancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={submit}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);
export default DeleteModal;
