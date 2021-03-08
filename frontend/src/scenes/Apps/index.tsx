import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { Navbar, Nav, Form, FormControl, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import logo from '../../images/retool-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../common/enums/Routes';
import AddApp from './components/AddApp';
import { addAppRoutine, fetchAppRoutine } from './routines';
import { connect } from 'react-redux';
import AppsList from './containers/AppsList/index';
import { IApps } from '../../common/models/apps/IApps';
import { IAppState } from '../../common/models/store/IAppState';
import Loader from '../../components/Loader/index';

interface IProps {
  isLoading: boolean,
  addApp: Function,
  fetchApps: Function,
  apps: IApps[]
}

const Apps: React.FC<IProps> = ({ fetchApps, addApp, apps, isLoading }) => {
  useEffect(() => {
    fetchApps();
  }, []);

  const handleAddApp = (appName: string): void => {
    addApp(appName);
  };

  return (
    <div className={styles['apps-wrp']}>
      {
        console.log(isLoading)
      }
      <Navbar className={styles.navigation}>

        <Navbar.Brand className="p-0">
          <Image className={styles['logo-img']} src={logo} alt="retool-logo" />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link active href={Routes.Apps} className={styles['nav-item']}>
              <FontAwesomeIcon icon={faBriefcase} />
              <span className="ml-2">Apps</span>
            </Nav.Link>
            <Nav.Link href={Routes.Resources} className={styles['nav-item']}>
              <FontAwesomeIcon icon={faDatabase} />
              <span className="ml-2">Resources</span>
            </Nav.Link>
          </Nav>
          <Button variant="secondary" className={styles['profile-icon']}>KH</Button>
        </Navbar.Collapse>

      </Navbar>
      <Loader isLoading={isLoading}>
        <div className={styles['main-block-wrp']}>

          <div className={styles['before-table']}>
            <h1>All</h1>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <AddApp onAddApp={handleAddApp} />
            </Form>
          </div>

          <Form>
            <Form.Check
              type="checkbox"
              label="Select all"
            />
          </Form>
          <AppsList appsList={apps} />
        </div>
      </Loader>
    </div>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  isLoading: rootState.application.isLoading,
  apps: rootState.application.apps
});

const mapDispatchToProps = {
  addApp: addAppRoutine,
  fetchApps: fetchAppRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Apps);
