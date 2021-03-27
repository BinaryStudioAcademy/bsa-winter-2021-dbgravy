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
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import Header from '../../../../components/Header';
import appStyles from '../../styles.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { IResource } from '../../../../common/models/resources/IResource';
import { Navbar, NavDropdown, Nav, Form, Button, Image, Col } from 'react-bootstrap';
import { Routes } from '../../../../common/enums/Routes';
import {
  editAppRoutine,
  fetchSelectAppRoutine,
  setCurrentlyAppId,
  setNewAppNameRoutine
} from '../../routines';
import { switchLoadingRoutine } from '../../../constructor/routines';
import Loader from '../../../../components/Loader';

interface IProps {
  isPreview?: boolean
}

const AppEditor: React.FC<IProps> = ({ isPreview }) => {
  const { id }: IFetchParams = useParams();
  const dispatch = useDispatch();
  const app = useSelector((state: IAppState) => state.app.application);
  const query = useSelector((state:IAppState) => state.app.qur);
  const resources: Array<IResource> = useSelector((state:IAppState) => state.resource.resources);
  const [editNameField, setEditNameField] = useState<boolean>(true);
  const [showBottom, setHiddenBottom] = useState<boolean>(true);
  const [showRight, setHiddenRight] = useState<boolean>(true);
  const closeNameEditor = (e: React.FormEvent) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.id === 'appName') {
      setEditNameField(false);
    } else if (app.setSelectAppName !== app.setSelectApp?.name) {
      dispatch(editAppRoutine.trigger({ app: app.setSelectApp, name: app.setSelectAppName }));
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
    if (id !== app.currentlyApp && id) {
      dispatch(switchLoadingRoutine.trigger());
      dispatch(setCurrentlyAppId.trigger(id));
      dispatch(fetchSelectAppRoutine.trigger({ id }));
      dispatch(fetchResourceRoutine.trigger({ id }));
    }
  }, [app.currentlyApp]);

  return (
    <>
      <Loader isLoading={query.isLoading}>
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

              <Nav className={`${styles.leftNav} ${styles.mrAuto}`}>
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
                    defaultValue={app.setSelectAppName}
                    className={styles.nameFill}
                  />
                )
                  : (
                    <Form.Control
                      type="text"
                      defaultValue={app.setSelectAppName}
                      onChange={changeName}
                      className={styles.nameFill}
                    />
                  )
              }
                </Form.Group>
              </Nav>
              {!isPreview ? (
                <Nav>
                  <div className={styles.angleDouble}>
                    <FontAwesomeIcon
                      icon={showRight ? faAngleDoubleRight : faAngleDoubleLeft}
                      color={showRight ? '#808080' : '#D3D3D3'}
                      onClick={changeStatusRight}
                      size="lg"
                      className={styles.angleDoubleFirst}
                    />
                  </div>
                  <div className={styles.angleDouble}>
                    <FontAwesomeIcon
                      icon={showBottom ? faAngleDoubleDown : faAngleDoubleUp}
                      color={showBottom ? '#808080' : '#D3D3D3'}
                      onClick={changeStatusBottom}
                      size="lg"
                      className={styles.angleDoubleSecond}
                    />
                  </div>
                </Nav>
              ) : null}
              <Nav className="ml-auto">
                <Button onClick={changeStatusBottom}>
                  {!isPreview ? (
                    <NavLink
                      to={`/app/preview/${app.currentlyApp}`}
                      activeStyle={{ color: '#000' }}
                      className={styles.preview}
                    >
                      Preview
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`/app/editor/${app.currentlyApp}`}
                      activeStyle={{ color: '#000' }}
                      className={styles.preview}
                    >
                      Edit
                    </NavLink>
                  )}
                </Button>
              </Nav>
            </Navbar>
            <DndProvider backend={HTML5Backend}>
              <Editor
                appId={id}
                show={isPreview ? false : showRight}
                showBottom={isPreview ? false : showBottom}
                query={query}
              />
            </DndProvider>
          </div>
        )
      }
      </Loader>
    </>
  );
};

export default AppEditor;
