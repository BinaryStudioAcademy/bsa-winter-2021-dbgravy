import React, { useEffect, useState } from 'react';
import QueriesList from '../components/queriesList';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.scss';
import { IAppState } from '../../../common/models/store/IAppState';
import Loader from '../../../components/Loader';
import { Button, Form, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import {
  duplicateSelectQueryRoutine,
  setNewCodeRoutine,
  setSelectQueryRoutine,
  setWaiterQueryRoutine,
  fetchQueryRoutine,
  setNewNameQueryRoutine,
  saveSelectQueryRoutine,
  deleteSelectQueryRoutine,
  setNewRunRoutine,
  setNewConfirmRoutine
} from '../routines';
import QueriesListForTriggers from '../components/triggerList';
import QueriesListForUnSuccessTriggers from '../components/triggerListUnSuccess';

interface IProps {
    id:string
}

const Constructor:React.FC<IProps> = ({ id }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const [editNameField, setEditNameField] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const handleClose = () => dispatch(setWaiterQueryRoutine.trigger({
    id: '',
    name: '',
    code: '',
    isOpen: false
  }));
  const isDataChange:boolean = (query.selectQuery.selectQueryCode !== query.setNewCode
      || query.selectQuery.runAutomatically !== query.setNewRun
      || query.selectQuery.showConfirm !== query.setNewConfirm
  );
  const isTriggersChange:boolean = (
    query.selectQuery.selectQueryTriggers.every(
      element => [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers].includes(element)
              && query.selectQuery.selectQueryTriggers.length
              === [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers].length
    ));
  const handleCloseNext = ():void => {
    if (!query.isDuplicate) {
      const runTitle:string = query.waitingQuery.runAutomatically ? 'Run query only when manually triggered'
        : 'Run query automatically when inputs change';
      dispatch(setSelectQueryRoutine.success({
        id: query.waitingQuery.QueryId,
        name: query.waitingQuery.QueryName,
        code: query.waitingQuery.QueryCode,
        runAutomatically: query.waitingQuery.runAutomatically,
        showConfirm: query.waitingQuery.showConfirm,
        triggers: query.waitingQuery.QueryTriggers,
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
        appId: id,
        resourceId: '1a5d4975-1a30-4e0c-9777-6ab3accde4b4',
        triggers: query.selectQuery.selectQueryTriggers,
        runAutomatically: query.selectQuery.runAutomatically,
        showConfirm: query.selectQuery.showConfirm
      }));
    }
  };
  const saveCode = ():void => {
    if (isDataChange || !isTriggersChange) {
      dispatch(saveSelectQueryRoutine.trigger({
        data: { code: query.setNewCode,
          runAutomatically: query.setNewRun,
          showConfirm: query.setNewConfirm,
          triggers: [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]
        },
        id: query.selectQuery.selectQueryId,
        appId: id
      }));
      const runTitle = query.setNewRun ? 'Run query only when manually triggered'
        : 'Run query automatically when inputs change';
      dispatch(setSelectQueryRoutine.success({
        id: query.selectQuery.selectQueryId,
        name: query.setNewName,
        code: query.setNewCode,
        runAutomatically: query.setNewRun,
        triggers: [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers],
        showConfirm: query.setNewConfirm,
        runTitle
      }));
    }
  };
  const closeNameEditor = (e:React.FormEvent) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.id === 'queryName') {
      setEditNameField(false);
    } else if (query.setNewName !== query.selectQuery.selectQueryName) {
      dispatch(saveSelectQueryRoutine.trigger({
        id: query.selectQuery.selectQueryId,
        appId: id,
        data: { name: query.setNewName }
      }));
      dispatch(setSelectQueryRoutine.success({
        id: query.selectQuery.selectQueryId,
        name: query.setNewName,
        code: query.selectQuery.selectQueryCode,
        runAutomatically: query.selectQuery.runAutomatically,
        triggers: [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers],
        showConfirm: query.selectQuery.showConfirm,
        isOpen: false,
        runTitle: query.runAutomaticallyTitle
      }));
      setEditNameField(true);
    } else {
      setEditNameField(true);
    }
  };
  const duplicateQuery = ():void => {
    if (isDataChange || !isTriggersChange) {
      dispatch(setWaiterQueryRoutine.trigger({ isOpen: true, isDuplicate: true }));
    } else {
      dispatch(setWaiterQueryRoutine.trigger({ isOpen: false, isDuplicate: true }));
      dispatch(duplicateSelectQueryRoutine.trigger({
        name: `query${query.queriesAppLength + 1}`,
        code: query.selectQuery.selectQueryCode,
        appId: id,
        resourceId: '1a5d4975-1a30-4e0c-9777-6ab3accde4b4',
        triggers: query.selectQuery.selectQueryTriggers,
        runAutomatically: query.selectQuery.runAutomatically,
        showConfirm: query.selectQuery.showConfirm
      }));
    }
  };
  const createQuery = () => {
    if (isDataChange || !isTriggersChange) {
      dispatch(setWaiterQueryRoutine.trigger({ isOpen: true, isDuplicate: true }));
    } else {
      dispatch(setWaiterQueryRoutine.trigger({ isOpen: false, isDuplicate: true }));
      dispatch(duplicateSelectQueryRoutine.trigger({
        name: `query${query.queriesAppLength + 1}`,
        code: '',
        appId: id,
        resourceId: '1a5d4975-1a30-4e0c-9777-6ab3accde4b4',
        triggers: [],
        runAutomatically: true,
        showConfirm: true
      }));
    }
  };
  const changeRunFalse = () => {
    if (query.setNewRun) {
      dispatch(setNewRunRoutine.trigger({ status: false, title: 'Run query automatically when inputs change' }));
    }
  };
  const changeRunTrue = () => {
    if (!query.setNewRun) {
      dispatch(setNewRunRoutine.trigger({ status: true, title: 'Run query only when manually triggered' }));
    }
  };
  const changeConfirm = () => {
    if (query.setNewConfirm) {
      dispatch(setNewConfirmRoutine.trigger(false));
    } else {
      dispatch(setNewConfirmRoutine.trigger(true));
    }
  };
  function changeName(e:React.FormEvent) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    dispatch(setNewNameQueryRoutine.trigger({ name: target.value }));
  }
  function changeCode(e:React.FormEvent) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    dispatch(setNewCodeRoutine.trigger({ code: target.value }));
  }
  const deleteQuery = () => {
    dispatch(deleteSelectQueryRoutine.trigger({
      id: query.selectQuery.selectQueryId,
      appId: '3a42e461-222a-45ac-902f-440b4471e51a'
    }));
  };
  useEffect(() => {
    dispatch(fetchQueryRoutine.trigger({ id }));
  }, []);
  return (
    <Loader isLoading={query.isLoading}>
      <Form className={style.wrapper} onClick={closeNameEditor}>
        <Form.Group controlId="queryLeftSide" className={style.LeftSide}>
          <Form.Group className={style.searchWrapper} controlId="exampleForm.ControlInput1">
            <Form.Control
              type="Text"
              placeholder="Search"
              className={style.searchInput}
              onChange={
                ev => setSearchValue(ev.target.value)
              }
              value={searchValue}
            />
            <DropdownButton id="dropdown-change" title="+ New" className={style.newBtn}>
              <Dropdown.Item href="#" onClick={createQuery}>Resource query</Dropdown.Item>
            </DropdownButton>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className={style.ShowingAll}>
              Showing all:
              {query.queriesAppLength}
            </Form.Label>
            <QueriesList queryList={query.queriesApp} search={searchValue} />
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="queryRightSide" className={style.RightSide}>
          <Form.Group controlId="queryName" className={style.RightSideHeader}>
            {
              editNameField ? (
                <Form.Control
                  type="button"
                  defaultValue={query.setNewName}
                  className={style.queryHeader}
                />
              )
                : (
                  <Form.Control
                    type="text"
                    defaultValue={query.setNewName}
                    onChange={changeName}
                    className={style.queryHeader}
                  />
                )
            }
            <Form.Group controlId="queryRightSide" className={style.RightBar}>
              <DropdownButton id="dropdown-basic-button" title="..." className={style.dropMenu}>
                <Dropdown.Item href="#" onClick={duplicateQuery}>Duplicate</Dropdown.Item>
                <Dropdown.Item href="#" className={style.delete} onClick={deleteQuery}>Delete</Dropdown.Item>
              </DropdownButton>
              <Form.Control type="button" value="Run" onClick={saveCode} />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="ControlTextarea">
            <DropdownButton id="dropdown-change" title={query.runAutomaticallyTitle} className={style.dropMenuChange}>
              <Dropdown.Item href="#" onClick={changeRunTrue}>Run query only when manually triggered</Dropdown.Item>
              <Dropdown.Item href="#" onClick={changeRunFalse}>
                Run query automatically when inputs change
              </Dropdown.Item>
            </DropdownButton>
            <Form.Label className={style.row} />
            <Form.Control
              as="textarea"
              value={query.setNewCode}
              rows={5}
              onChange={changeCode}
              className={style.codeEditor}
            />
            <Form.Label className={style.row} />
            {
            query.setNewConfirm ? (
              <Form.Check
                type="checkbox"
                id="checkbox"
                label="Show a confirmation modal before running"
                className={style.checkBox}
                onClick={changeConfirm}
                defaultChecked
              />
            )
              : (
                <Form.Check
                  type="checkbox"
                  id="checkbox"
                  label="Show a confirmation modal before running"
                  className={style.checkBox}
                  onClick={changeConfirm}
                />
              )
          }
            <Form.Label className={style.row} />
            <div className={style.baseMargin}>On success trigger</div>
            <QueriesListForTriggers queryList={query.queriesApp} triggerList={query.setNewSuccessTriggers} status />
            <div className={style.baseMargin}>On failure trigger</div>
            <QueriesListForUnSuccessTriggers
              queryList={query.queriesApp}
              triggerList={query.setNewUnSuccessTriggers}
            />
          </Form.Group>
        </Form.Group>
      </Form>
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
    </Loader>
  );
};

export default Constructor;
