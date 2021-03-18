import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  duplicateSelectQueryRoutine,
  setSelectQueryRoutine,
  setWaiterQueryRoutine
} from '../../routines';
import { Button, Modal } from 'react-bootstrap';
import { IAppState } from '../../../../common/models/store/IAppState';

const ModalWindow:React.FC = () => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setWaiterQueryRoutine.trigger({
    id: '',
    name: '',
    code: '',
    isOpen: false
  }));
  const handleCloseNext = ():void => {
    if (!query.isDuplicate) {
      const runTitle:string = query.waitingQuery.runAutomatically ? 'Run query only when manually triggered'
        : 'Run query automatically when inputs change';
      dispatch(setSelectQueryRoutine.success({
        id: query.waitingQuery.queryId,
        name: query.waitingQuery.queryName,
        code: query.waitingQuery.queryCode,
        runAutomatically: query.waitingQuery.runAutomatically,
        showConfirm: query.waitingQuery.showConfirm,
        triggers: query.waitingQuery.queryTriggers,
        runTitle,
        isOpen: false
      }));
    } else {
      const runTitle:string = query.selectQuery.runAutomatically ? 'Run query only when manually triggered'
        : 'Run query automatically when inputs change';
      dispatch(setSelectQueryRoutine.success({
        id: query.selectQuery.selectQueryId,
        name: query.selectQuery.selectQueryName,
        code: query.selectQuery.selectQueryCode,
        runAutomatically: query.selectQuery.runAutomatically,
        triggers: query.selectQuery.selectQueryTriggers,
        showConfirm: query.selectQuery.showConfirm,
        runTitle
      }));
      dispatch(duplicateSelectQueryRoutine.trigger({
        name: `query${query.queriesAppLength}`,
        code: query.selectQuery.selectQueryCode,
        appId: '3a42e461-222a-45ac-902f-440b4471e51a',
        resourceId: '1a5d4975-1a30-4e0c-9777-6ab3accde4b4',
        triggers: query.selectQuery.selectQueryTriggers,
        runAutomatically: query.selectQuery.runAutomatically,
        showConfirm: query.selectQuery.showConfirm
      }));
    }
  };
  return (
    <Modal
      show={query.isOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You didnt save your query. Are you sure you want to discard changes?.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCloseNext}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalWindow;
