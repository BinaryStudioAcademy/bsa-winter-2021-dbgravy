import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from '../../components/Editor';
import { useParams } from 'react-router';
import { IFetchParams } from '../../../../common/models/fetch/IFetchParams';
import logo from '../../../../images/Logo.svg';
import { fetchResourceRoutine } from '../../../Resources/routines';
import { connect, useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import Header from '../../../../components/Header';
import appStyles from '../../styles.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { IResource } from '../../../../common/models/resources/IResource';
import { Navbar, NavDropdown, Nav, Form, Button, Image, Col } from 'react-bootstrap';
import { Routes } from '../../../../common/enums/Routes';
import { editAppRoutine, fetchSelectAppRoutine, setNewAppNameRoutine } from '../../routines';

interface IProps {
  resources: Array<IResource>,
  fetchResources: () => void,
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
    <>
      {
        (resources.length === 0) ? (
          <div className={appStyles['apps-wrp']}>
            <Header />
            <div className="container mt-5">
              <div>
                No resources.
                {' '}
                <Link to="/resources/edit">Create new</Link>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`h-100 ${styles.appWrap}`}
            onClick={closeNameEditor}
            onKeyDown={closeNameEditor}
            role="button"
            tabIndex={0}
          >
            <Navbar bg="white" expand="lg" className={styles.mainNav}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Nav className={`${styles.leftNav} mr-auto`}>
                <Col xs={6} md={4}>
                  <Image className={styles['logo-img']} src={logo} alt="db-gravy-logo" />
                </Col>
                <NavDropdown title=" " id="basic-nav-dropdown" className={styles.dropButton}>
                  <NavLink to={Routes.Apps} activeStyle={{ color: '#000' }} className={styles.goToHome}>
                    Back to home
                  </NavLink>
                </NavDropdown>
                <Form.Group controlId="appName" className={styles.appName}>
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
                      className={styles.nameFill}
                    />
                  )
              }
                </Form.Group>
              </Nav>
              <Nav className="mr-auto">
                <FontAwesomeIcon
                  icon={showRight ? faAngleDoubleRight : faAngleDoubleLeft}
                  color={showRight ? '#808080' : '#D3D3D3'}
                  onClick={changeStatusRight}
                  size="2x"
                  className={styles.angleDouble}
                />
                <div style={{ padding: '5px' }} />
                <FontAwesomeIcon
                  icon={showBottom ? faAngleDoubleDown : faAngleDoubleUp}
                  color={showBottom ? '#808080' : '#D3D3D3'}
                  onClick={changeStatusBottom}
                  size="2x"
                  className={styles.angleDouble}
                />
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
              <Editor appId={id} show={showRight} showBottom={showBottom} />
            </DndProvider>
          </div>
        )
      }
    </>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  resources: rootState.resource.resources,
  user: rootState.user.user
});

const mapDispatchToProps = {
  fetchResources: fetchResourceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AppEditor);
