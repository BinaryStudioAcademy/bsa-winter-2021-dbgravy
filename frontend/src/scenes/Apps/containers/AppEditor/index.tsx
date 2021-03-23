import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from '../../components/Editor';
import Constructor from '../../../constructor/containers';
import { useParams } from 'react-router';
import { IFetchParams } from '../../../../common/models/fetch/IFetchParams';
import { fetchResourceRoutine } from '../../../Resources/routines';
import { connect, useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import Header from '../../../../components/Header';
import appStyles from '../../styles.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { IResource } from '../../../../common/models/resources/IResource';
import { Navbar, NavDropdown, Nav, Form, Button } from 'react-bootstrap';
import { Routes } from '../../../../common/enums/Routes';

import { editAppRoutine, fetchSelectAppRoutine, setNewAppNameRoutine } from '../../routines';

interface IProps {
  resources: Array<IResource>,
  fetchResources: () => void
}

const AppEditor: React.FC<IProps> = ({ resources, fetchResources }) => {
  const { id }: IFetchParams = useParams();
  useEffect(() => {
    fetchResources();
  }, []);
  const query = useSelector((state: IAppState) => state.app.application);
  const dispatch = useDispatch();
  const [editNameField, setEditNameField] = useState<boolean>(true);
  const [showBottom, setHiddenBottom] = useState<boolean>(true);
  const [showRight, setHiddenRight] = useState<boolean>(true);
  const closeNameEditor = (e: React.FormEvent) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.id === 'appName') {
      setEditNameField(false);
    } else if (query.setSelectAppName !== query.setSelectApp?.name) {
      dispatch(editAppRoutine.trigger({ app: query.setSelectApp, name: query.setSelectAppName }));
      setEditNameField(true);
    } else {
      setEditNameField(true);
    }
  };
  function changeName(e:React.FormEvent) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    dispatch(setNewAppNameRoutine.trigger({ name: target.value }));
  }
  function changeStatusBottom() {
    if (!showBottom) {
      setHiddenBottom(true);
    } else {
      setHiddenBottom(false);
    }
  }
  const changeStatusRight = () => {
    if (!showRight) {
      setHiddenRight(true);
    } else {
      setHiddenRight(false);
    }
  };
  useEffect(() => {
    dispatch(fetchSelectAppRoutine.trigger({ id }));
  }, []);

  return (
    <div className={appStyles['apps-wrp']}>
      <Header />
      {
        (resources.length === 0) ? (
          <div className="container mt-5">
            <div>
              No resources.
              {' '}
              <Link to="/resources/edit">Create new</Link>
            </div>
          </div>
        ) : (
          <div
            className="h-100"
            onClick={closeNameEditor}
            onKeyDown={closeNameEditor}
            role="button"
            tabIndex={0}
          >
            <Navbar bg="light" expand="lg" className={styles.mainNav}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav className={`${styles.leftNav} mr-auto ml-5`}>
                <NavDropdown title=" " id="basic-nav-dropdown" className={styles.dropButton}>
                  <NavLink to={Routes.Apps} activeStyle={{ color: '#000' }} className={styles.goToHome}>
                    Back to home
                  </NavLink>
                </NavDropdown>
                <Form.Group controlId="appName">
                  {
                editNameField ? (
                  <Form.Control
                    type="button"
                    defaultValue={query.setSelectAppName}
                    className={styles.nameFill}
                  />
                )
                  : (
                    <Form.Control
                      type="text"
                      defaultValue={query.setSelectAppName}
                      onChange={changeName}
                    />
                  )
              }
                </Form.Group>
              </Nav>
              <Nav className="mr-auto">
                <Button onClick={changeStatusBottom}>Hidden bot</Button>
                <Button onClick={changeStatusRight}>Hidden right</Button>
              </Nav>
              <Nav>
                <Button onClick={changeStatusBottom}>
                  <NavLink to={`/app/preview/${id}`} activeStyle={{ color: '#000' }} className={styles.preview}>
                    Preview
                  </NavLink>
                </Button>
              </Nav>
            </Navbar>
            <DndProvider backend={HTML5Backend}>
              <Editor appId={id} show={showRight} />
            </DndProvider>
            {showBottom
              ? (<Constructor id={id} />)
              : null}
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  resources: rootState.resource.resources
});

const mapDispatchToProps = {
  fetchResources: fetchResourceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AppEditor);
