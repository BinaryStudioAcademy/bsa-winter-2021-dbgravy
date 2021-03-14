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
  fetchQueryRoutine, setNewNameQueryRoutine, saveSelectQueryRoutine, deleteSelectQueryRoutine
} from '../routines';

interface IProps {
    id:string
}

const Constructor:React.FC<IProps> = () => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const [editNameField, setEditNameField] = useState(true);
  const handleClose = () => dispatch(setWaiterQueryRoutine.trigger({
    id: '',
    name: '',
    code: '',
    isOpen: false
  }));
  const handleCloseNext = () => {
    dispatch(setSelectQueryRoutine.success({
      id: query.waitingQuery.QueryId,
      name: query.waitingQuery.QueryName,
      code: query.waitingQuery.QueryCode,
      isOpen: false,
      NewCode: query.waitingQuery.QueryCode
    }));
  };
  const saveCode = () => {
    if (query.selectQuery.selectQueryCode !== query.setNewCode) {
      dispatch(saveSelectQueryRoutine.trigger({
        data: { code: query.setNewCode },
        id: query.selectQuery.selectQueryId,
        appId: '3a42e461-222a-45ac-902f-440b4471e51a'
      }));
      dispatch(setSelectQueryRoutine.success({
        id: query.selectQuery.selectQueryId,
        name: query.setNewName,
        code: query.setNewCode
      }));
    }
  };
  const closeNameEditor = (e:any) => {
    if (e.target.id === 'queryName') {
      setEditNameField(false);
    } else if (query.setNewName !== query.selectQuery.selectQueryName) {
      dispatch(saveSelectQueryRoutine.trigger({
        id: query.selectQuery.selectQueryId,
        appId: '3a42e461-222a-45ac-902f-440b4471e51a',
        data: { name: query.setNewName }
      }));
      dispatch(setSelectQueryRoutine.success({
        id: query.selectQuery.selectQueryId,
        name: query.setNewName,
        code: query.selectQuery.selectQueryCode,
        isOpen: false
      }));
      setEditNameField(true);
    } else {
      setEditNameField(true);
    }
  };
  const duplicateQuery = () => {
    dispatch(duplicateSelectQueryRoutine.trigger({
      name: `query${query.queriesAppLength}`,
      code: query.selectQuery.selectQueryCode,
      appId: '3a42e461-222a-45ac-902f-440b4471e51a',
      resourceId: '1a5d4975-1a30-4e0c-9777-6ab3accde4b4',
      runAutomatically: true,
      showConfirm: true
    }));
  };
  function changeName(e:any) {
    const { target } = e;
    dispatch(setNewNameQueryRoutine.trigger({ name: target.value }));
  }
  function changeCode(e:any) {
    const { target } = e;
    dispatch(setNewCodeRoutine.trigger({ code: target.value }));
  }
  const deleteQuery = () => {
    dispatch(deleteSelectQueryRoutine.trigger({
      id: query.selectQuery.selectQueryId,
      appId: '3a42e461-222a-45ac-902f-440b4471e51a'
    }));
  };
  useEffect(() => {
    const id = '3a42e461-222a-45ac-902f-440b4471e51a';
    dispatch(fetchQueryRoutine.trigger({ id }));
  }, []);
  return (
    <Loader isLoading={query.isLoading}>
      <Form className={style.wrapper} onClick={closeNameEditor}>
        <Form.Group controlId="queryLeftSide" className={style.LeftSide}>
          <Form.Group className={style.searchWrapper} controlId="exampleForm.ControlInput1">
            <Form.Control type="Search" placeholder="Search" className={style.searchInput} />
            <Button variant="primary" type="submit" className={style.newBtn}>
              +New
            </Button>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className={style.ShowingAll}>
              Showing all:
              {query.queriesAppLength}
            </Form.Label>
            <QueriesList queryList={query.queriesApp} />
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
            <Form.Label className={style.row} />
            <Form.Control
              as="textarea"
              value={query.setNewCode}
              rows={5}
              onChange={changeCode}
              className={style.codeEditor}
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
