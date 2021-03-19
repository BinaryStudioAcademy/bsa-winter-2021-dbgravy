import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  runSelectQueryRoutine
} from '../../routines';
import { Button, Modal } from 'react-bootstrap';
import { IAppState } from '../../../../common/models/store/IAppState';

interface IProps {
  appId: string;
}

const ConfirmModal: React.FC<IProps> = ({ appId }) => {
  const query = useSelector((state: IAppState) => state.app.qur);

  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  const handleRunQuery = (): void => {
    setShow(false);
    dispatch(runSelectQueryRoutine.trigger({
      data: {
        code: query.setNewCode,
        runAutomatically: query.setNewRun,
        showConfirm: query.setNewConfirm,
        triggers: [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]
      },
      appId,
      resourceId: '27544918-2829-4982-8887-0f6375ad6cd3'
    }));
  };
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
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
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleRunQuery}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmModal;
