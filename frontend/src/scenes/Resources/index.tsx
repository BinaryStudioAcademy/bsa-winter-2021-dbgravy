import React from 'react';
import styles from './styles.module.scss';
import { Navbar, Nav, Form, FormControl, Table, Image, Button } from 'react-bootstrap';
import logo from '../../images/retool-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../common/enums/Routes';

const Resources = () => (
  <div className={styles['resources-wrp']}>
    <Navbar className={styles.navigation}>

      <Navbar.Brand className="p-0">
        <Image className={styles['logo-img']} src={logo} alt="retool-logo" />
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={Routes.Apps} className={styles['nav-item']}>
            <FontAwesomeIcon icon={faBriefcase} />
            <span className="ml-2">Apps</span>
          </Nav.Link>
          <Nav.Link active href={Routes.Resources} className={styles['nav-item']}>
            <FontAwesomeIcon icon={faDatabase} />
            <span className="ml-2">Resources</span>
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
