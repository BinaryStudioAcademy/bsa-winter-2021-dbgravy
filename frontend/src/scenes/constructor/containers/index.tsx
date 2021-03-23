import React, { useEffect, useState } from 'react';
import QueriesList from '../components/queriesList';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.scss';
import { IAppState } from '../../../common/models/store/IAppState';
import Loader from '../../../components/Loader';
import { Form, DropdownButton, Dropdown } from 'react-bootstrap';
import {
  duplicateSelectQueryRoutine,
  setSelectQueryRoutine,
  setWaiterQueryRoutine,
  fetchQueryRoutine,
  setNewNameQueryRoutine,
  saveSelectQueryRoutine,
  runSelectQueryRoutine,
  previewSelectQueryRoutine,
  deleteSelectQueryRoutine,
  setNewRunRoutine,
  setNewConfirmRoutine, takeResourcesTableAndColumns, setNewCodeRoutine
} from '../routines';
import QueriesListForTriggers from '../components/triggerList';
import QueriesListForUnSuccessTriggers from '../components/triggerListUnSuccess';
import { deepArray } from '../../../common/helpers/arrayHelper';
import ModalWindow from '../components/ModalWindow';
import { fetchResourceRoutine } from '../../Resources/routines';
import ResourceList from '../components/ResourceList';
import QueryEditor from '../../../components/QueryCodeEditor';
import Table from '../../../components/TableComponent';
import ConfirmModal from '../components/ModalWindow/confirm';
import QueryResult from '../components/ModalWindow/queryResult';

interface IProps {
  id: string
}

const Constructor: React.FC<IProps> = ({ id }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();

  const [editNameField, setEditNameField] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showQuery, setShowQuery] = useState(false);

  const isDataChange: boolean = (query.selectQuery.selectQueryCode !== query.setNewCode
    || query.selectQuery.runAutomatically !== query.setNewRun
    || query.selectQuery.showConfirm !== query.setNewConfirm
    || query.selectQuery.resourceId !== query.setNewResource?.id
  );
  const isTriggersChange: boolean = deepArray(query.selectQuery.selectQueryTriggers,
    [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]);

  const handleCancelConfirmModal = () => {
    setShowConfirm(false);
  };
  const handleSubmitConfirmModal = () => {
    setShowConfirm(false);
    runQuery();
  };

  const hadleRunButton = () => {
    if (query.selectQuery.showConfirm) {
      setShowConfirm(true);
    } else {
      runQuery();
    }
  };

  const isEmptyData = query.selectQuery.data.length === 0;

  const runQuery = (): void => {
    dispatch(runSelectQueryRoutine.trigger({
      data: {
        id: query.selectQuery.selectQueryId,
        code: query.setNewCode,
        runAutomatically: query.setNewRun,
        showConfirm: query.setNewConfirm,
        name: query.selectQuery.selectQueryName,
        triggers: [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]
      },
      appId: id,
      resourceId: query.selectQuery.resourceId,
      triggered: []
    }));
  };

  const previewQuery = (): void => {
    dispatch(previewSelectQueryRoutine.trigger({
      data: {
        code: query.setNewCode,
        name: query.selectQuery.selectQueryName,
        runAutomatically: query.setNewRun,
        showConfirm: query.setNewConfirm
      },
      id: query.selectQuery.selectQueryId,
      appId: id,
      resourceId: query.selectQuery.resourceId
    }));
  };

  const saveCode = (): void => {
    if (isDataChange || !isTriggersChange) {
      dispatch(saveSelectQueryRoutine.trigger({
        data: {
          code: query.setNewCode,
          runAutomatically: query.setNewRun,
          showConfirm: query.setNewConfirm,
          triggers: [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers],
          resourceId: query.setNewResource?.id
        },
        id: query.selectQuery.selectQueryId,
        appId: id,
        resourceId: query.selectQuery.resourceId
      }));
      const runTitle = query.setNewRun ? 'Run query only when manually triggered'
        : 'Run query automatically when inputs change';
      dispatch(setSelectQueryRoutine.success({
        id: query.selectQuery.selectQueryId,
        name: query.setNewName,
        code: query.setNewCode,
        runAutomatically: query.setNewRun,
        triggers: [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers],
        resourceId: query.setNewResource?.id,
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
        resourceId: query.selectQuery.resourceId,
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
        resourceId: query.selectQuery.resourceId,
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
        resourceId: query.selectQuery.resourceId,
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
    console.log('1');
    if (!query.setNewConfirm) {
      dispatch(setNewConfirmRoutine.trigger(true));
    } else {
      dispatch(setNewConfirmRoutine.trigger(false));
    }
  };
  function changeCode(e: string) {
    dispatch(setNewCodeRoutine.trigger({ code: e }));
  }
  function changeName(e:React.FormEvent) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    dispatch(setNewNameQueryRoutine.trigger({ name: target.value }));
  }
  const deleteQuery = () => {
    dispatch(deleteSelectQueryRoutine.trigger({
      id: query.selectQuery.selectQueryId,
      appId: id
    }));
  };
  useEffect(() => {
    dispatch(fetchResourceRoutine.trigger());
  }, []);

  useEffect(() => {
    dispatch(fetchQueryRoutine.trigger({ id }));
  }, [query.resources]);

  useEffect(() => {
    if (!query.isLoading) {
      dispatch(takeResourcesTableAndColumns.trigger(query.setNewResource));
    }
  }, [query.isLoading]);

  useEffect(() => {
    if (query.selectQuery.queryMessage.length !== 0) {
      setShowQuery(true);
      setTimeout(() => setShowQuery(false), 1000);
    }
  }, [query.selectQuery.queryMessage]);
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
                  : (<Form.Control type="button" value="Run" onClick={hadleRunButton} />)
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
            <Form.Group controlId="Resource" className={style.resource}>
              <Form.Label className={style.resourceText}>Resource:</Form.Label>
              <ResourceList resourceList={query.resources} resourceName={query.setNewResource?.name} />
            </Form.Group>
            <Form.Label className={style.row} />
            <QueryEditor tables={query.setSelectResourceTable} changeCode={changeCode} codeValue={query.setNewCode} />
            <Form.Label className={style.row} />
            <Form.Label className={style.row} />
            <div className={style.checkBoxWrapper}>
              <div
                onClick={changeConfirm}
                onKeyDown={changeConfirm}
                role="button"
                tabIndex={0}
                className={style.Confirm}
              >
                {
              !query.setNewConfirm ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3
                     3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19
                     3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761
                      2.238-5 5-5h14c2.762 0 5 2.239 5 5z"
                  />
                </svg>
              )
                : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418
                     8.591zm-5.041-15c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0
                     3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5
                     5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"
                    />
                  </svg>
                )
            }
              </div>
              <span className={style.spanText}>Show a confirmation modal before running</span>
            </div>
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
            !isEmptyData && (
              <div style={{ padding: '20px' }}>
                <Table
                  key={query.isResultLoading.toString()}
                  values={[...query.selectQuery.data]}
                  columnWidth={300}
                  rowHeight={70}
                />
              </div>
            )
          }
          {
            isEmptyData && <span style={{ padding: '20px' }}>No rows to display</span>
          }
        </Form.Group>
      </Form>
      <ModalWindow id={id} />
      <ConfirmModal
        showConfirm={showConfirm}
        isCancel={handleCancelConfirmModal}
        isSubmit={handleSubmitConfirmModal}
      />
      <QueryResult show={showQuery} message={query.selectQuery.queryMessage} />
    </Loader>
  );
};

export default Constructor;
