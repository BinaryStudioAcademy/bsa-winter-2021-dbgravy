import React from 'react';
import styles from './styles.module.scss';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import logo from '../images/retool-logo.png';
import appsIcon from '../images/briefcase-solid.svg';
import resourcesIcon from '../images/database-solid.svg';
import { Routes } from '../../common/enums/Routes';

const Apps = () => (
  <div className={styles['resources-wrp']}>
    <Navbar className={styles.navigation}>

      <Navbar.Brand className="p-0">
        <img className={styles['logo-img']} src={logo} alt="retool-logo" />
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link active href={Routes.Apps}>
            <img src={appsIcon} className={styles['navbar-icons']} alt="apps-icon" />
            <span>Apps</span>
          </Nav.Link>
          <Nav.Link href={Routes.Resources}>
            <img src={resourcesIcon} className={styles['navbar-icons']} alt="resources-icon" />
            <span>Resources</span>
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
          <Button variant="primary">Create new</Button>
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
            <img src={appsIcon} className={styles['navbar-icons']} alt="apps-icon" />
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

export default Apps;
