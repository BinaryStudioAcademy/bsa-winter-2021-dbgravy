import React, { useEffect, useState } from 'react';
import QueriesList from '../components/queriesList';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.scss';
import { IAppState } from '../../../common/models/store/IAppState';
import Loader from '../../../components/Loader';
import { Form, DropdownButton, Dropdown } from 'react-bootstrap';
import {
  duplicateSelectQueryRoutine,
  setNewCodeRoutine,
  setSelectQueryRoutine,
  setWaiterQueryRoutine,
  fetchQueryRoutine,
  setNewNameQueryRoutine,
  saveSelectQueryRoutine,
  runSelectQueryRoutine,
  previewSelectQueryRoutine,
  deleteSelectQueryRoutine,
  setNewRunRoutine,
  setNewConfirmRoutine
} from '../routines';
import QueriesListForTriggers from '../components/triggerList';
import QueriesListForUnSuccessTriggers from '../components/triggerListUnSuccess';
import { deepArray } from '../../../common/helpers/arrayHelper';
import ModalWindow from '../components/ModalWindow';
import Table from '../../../components/TableComponent';
import ConfirmModal from '../components/ModalWindow/confirm';

interface IProps {
  id: string
  resourceId: string
}

const Constructor: React.FC<IProps> = ({ id, resourceId }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const [editNameField, setEditNameField] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const isDataChange: boolean = (query.selectQuery.selectQueryCode !== query.setNewCode
    || query.selectQuery.runAutomatically !== query.setNewRun
    || query.selectQuery.showConfirm !== query.setNewConfirm
  );
  const isTriggersChange: boolean = deepArray(query.selectQuery.selectQueryTriggers,
    [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]);

  const [showTable, setShowTable] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSpan, setShowSpan] = useState(false);

  useEffect(() => {
    if (query.resultData.length !== 0) {
      setShowTable(true);
      setShowSpan(false);
    } else {
      setShowTable(false);
      setShowSpan(true);
    }
  }, [query.resultData]);
  const runQuery = (): void => {
    if (query.setNewConfirm) {
      setShowConfirm(true);
    } else {
      setShowConfirm(false);
      dispatch(runSelectQueryRoutine.trigger({
        data: {
          code: query.setNewCode,
          runAutomatically: query.setNewRun,
          showConfirm: query.setNewConfirm,
          triggers: [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]
        },
        appId: id,
        resourceId: '27544918-2829-4982-8887-0f6375ad6cd3'
      }));
    }
  };

  const previewQuery = (): void => {
    dispatch(previewSelectQueryRoutine.trigger({
      data: {
        code: query.setNewCode,
        runAutomatically: query.setNewRun,
        showConfirm: query.setNewConfirm,
        triggers: [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]
      },
      id: query.selectQuery.selectQueryId,
      appId: id,
      resourceId: '27544918-2829-4982-8887-0f6375ad6cd3'
    }));
  };

  const saveCode = (): void => {
    if (isDataChange || !isTriggersChange) {
      dispatch(saveSelectQueryRoutine.trigger({
        data: {
          code: query.setNewCode,
          runAutomatically: query.setNewRun,
          showConfirm: query.setNewConfirm,
          triggers: [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]
        },
        id: query.selectQuery.selectQueryId,
        appId: id,
        resourceId: '27544918-2829-4982-8887-0f6375ad6cd3'
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
  const closeNameEditor = (e: React.FormEvent) => {
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
  const duplicateQuery = (): void => {
    if (isDataChange || !isTriggersChange) {
      dispatch(setWaiterQueryRoutine.trigger({ isOpen: true, isDuplicate: true }));
    } else {
      dispatch(setWaiterQueryRoutine.trigger({ isOpen: false, isDuplicate: true }));
      dispatch(duplicateSelectQueryRoutine.trigger({
        name: `query${query.queriesAppLength + 1}`,
        code: query.selectQuery.selectQueryCode,
        appId: id,
        resourceId,
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
        resourceId,
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
  function changeName(e: React.FormEvent) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    dispatch(setNewNameQueryRoutine.trigger({ name: target.value }));
  }
  function changeCode(e: React.FormEvent) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    dispatch(setNewCodeRoutine.trigger({ code: target.value }));
  }
  const deleteQuery = () => {
    dispatch(deleteSelectQueryRoutine.trigger({
      id: query.selectQuery.selectQueryId,
      appId: id
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
              <Form.Control type="button" value="Preview" onClick={previewQuery} />
              {
                isDataChange || !isTriggersChange ? (
                  <Form.Control type="button" value="Save" onClick={saveCode} />
                )
                  : (<Form.Control type="button" value="Run" onClick={runQuery} />)
              }
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
          {
            showTable ? <Table values={query.resultData} /> : null
          }
          {
            showSpan ? <span>No rows to display</span> : null
          }
        </Form.Group>
      </Form>
      <ModalWindow />
      {
        showConfirm ? <ConfirmModal appId={id} /> : null
      }
    </Loader>
  );
};

export default Constructor;
