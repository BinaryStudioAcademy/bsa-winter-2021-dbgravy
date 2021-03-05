import React from 'react';
import styles from './styles.module.scss';
import { Navbar, Nav, Form, FormControl, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import logo from '../images/retool-logo.png';
import appsIcon from '../images/briefcase-solid.svg';
import resourcesIcon from '../images/database-solid.svg';

const Resources = () => (
  <div className={styles['resources-wrp']}>
    <Navbar className={styles.navigation}>

      <Navbar.Brand className="p-0">
        <img className={styles['logo-img']} src={logo} alt="retool-logo" />
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/apps">
            <img src={appsIcon} className={styles['navbar-icons']} alt="apps-icon" />
            <span>Apps</span>
          </Nav.Link>
          <Nav.Link active href="/resources">
            <img src={resourcesIcon} className={styles['navbar-icons']} alt="resources-icon" />
            <span>Resources</span>
          </Nav.Link>
        </Nav>
        <Button variant="secondary" className={styles['profile-icon']}>KH</Button>
      </Navbar.Collapse>

    </Navbar>

    <div className={styles['main-block-wrp']}>

      <div className={styles['before-table']}>
        <h1>Resources</h1>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="primary">Create new</Button>
        </Form>
      </div>

      <div className="table-wrp">
        <Table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">RESOURCE NAME</th>
              <th scope="col">DATABASE TYPE</th>
              <th scope="col">DATABASE NAME</th>
              <th scope="col">CREATED</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>...</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>...</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>...</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  </div>
);

export default Resources;
