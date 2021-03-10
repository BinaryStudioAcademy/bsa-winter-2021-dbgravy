import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import logo from '../../images/retool-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../common/enums/Routes';
import AddApp from './components/AddApp';
import { addAppRoutine } from './routines';
import { connect } from 'react-redux';

interface IProps {
  addApp: Function
}

const Apps: React.FC<IProps> = ({ addApp }) => {
  const handleAddApp = (appName: string): void => {
    addApp(appName);
  };
  return (
    <div className={styles['apps-wrp']}>
      <Navbar className={styles.navigation}>

        <Navbar.Brand className="p-0">
          <Image className={styles['logo-img']} src={logo} alt="retool-logo" />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link active as={Link} to={Routes.Apps} className={styles['nav-item']}>
              <FontAwesomeIcon icon={faBriefcase} />
              <span className="ml-2">Apps</span>
            </Nav.Link>
            <Nav.Link as={Link} to={Routes.Resources} className={styles['nav-item']}>
              <FontAwesomeIcon icon={faDatabase} />
              <span className="ml-2">Resources</span>
            </Nav.Link>
          </Nav>
          <Button variant="secondary" className={styles['profile-icon']}>KH</Button>
        </Navbar.Collapse>

      </Navbar>
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

        <div className={styles['list-wrp']}>

          <div className={styles['list-item']}>
            <div className={styles['app-main-info']}>
              <FontAwesomeIcon icon={faBriefcase} />
              <div className={styles['main-info']}>
                <span>Workspaces and Teams</span>
                <span className="text-secondary">Created by...</span>
              </div>
            </div>
            <div>
              <Button variant="outline-dark">...</Button>
            </div>
          </div>
          <div className={styles['list-item']}>
            <div className={styles['app-main-info']}>
              <FontAwesomeIcon icon={faBriefcase} />
              <div className={styles['main-info']}>
                <span>Workspaces and Teams</span>
                <span className="text-secondary">Created by...</span>
              </div>
            </div>
            <div>
              <Button variant="outline-dark">...</Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addApp: addAppRoutine
};

export default connect(null, mapDispatchToProps)(Apps);
