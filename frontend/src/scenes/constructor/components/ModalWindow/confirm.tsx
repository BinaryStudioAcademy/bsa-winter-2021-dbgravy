import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { IAppState } from '../../../../common/models/store/IAppState';

interface IProps {
  showConfirm: boolean
  isCancel: () => void;
  isSubmit: () => void;
}

const ConfirmModal: React.FC<IProps> = ({ showConfirm, isSubmit, isCancel }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  return (
    <Modal
      show={showConfirm}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {`Are you sure you want to run ${query.selectQuery.selectQueryName} ?`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={isCancel}>
          Close
        </Button>
        <Button variant="primary" onClick={isSubmit}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmModal;
