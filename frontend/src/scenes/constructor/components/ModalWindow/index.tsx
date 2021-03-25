import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  duplicateSelectQueryRoutine,
  setSelectQueryRoutine,
  setWaiterQueryRoutine, takeResourcesTableAndColumns
} from '../../routines';
import { Button, Modal } from 'react-bootstrap';
import { IAppState } from '../../../../common/models/store/IAppState';

interface IProps {
  id:string
}

const ModalWindow:FunctionComponent<IProps> = ({ id }) => {
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
      if (query.waitingQuery.resourceId !== query.setNewResource?.id) {
        dispatch(
          takeResourcesTableAndColumns.trigger(
            query.resources.find(element => element.id === query.waitingQuery.resourceId)
          )
        );
      }
      dispatch(setSelectQueryRoutine.success({
        id: query.waitingQuery.queryId,
        name: query.waitingQuery.queryName,
        code: query.waitingQuery.queryCode,
        showConfirm: query.waitingQuery.showConfirm,
        triggers: query.waitingQuery.queryTriggers,
        resourceId: query.waitingQuery.resourceId,
        isOpen: false
      }));
    } else {
      dispatch(setSelectQueryRoutine.success({
        id: query.selectQuery.selectQueryId,
        name: query.selectQuery.selectQueryName,
        code: query.selectQuery.selectQueryCode,
        triggers: query.selectQuery.selectQueryTriggers,
        resourceId: query.selectQuery.resourceId,
        showConfirm: query.selectQuery.showConfirm
      }));
      dispatch(duplicateSelectQueryRoutine.trigger({
        name: `query${query.queriesAppLength}`,
        code: query.selectQuery.selectQueryCode,
        appId: id,
        resourceId: query.selectQuery.resourceId,
        triggers: query.selectQuery.selectQueryTriggers,
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
