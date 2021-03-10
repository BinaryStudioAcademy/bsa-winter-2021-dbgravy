import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { Navbar, Nav, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import logo from '../../images/retool-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../common/enums/Routes';

const Header = () => (
  <Navbar className={styles.navigation}>
    <Navbar.Brand className="p-0">
      <Image className={styles['logo-img']} src={logo} alt="retool-logo" />
    </Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link to={Routes.Apps} className={styles['nav-item']}>
          <FontAwesomeIcon icon={faBriefcase} />
          <span className="ml-2">Apps</span>
        </Link>
        <Link to={Routes.Resources} className={styles['nav-item']}>
          <FontAwesomeIcon icon={faDatabase} />
          <span className="ml-2">Resources</span>
        </Link>
      </Nav>
      <Button variant="secondary" className={styles['profile-icon']}>KH</Button>
    </Navbar.Collapse>

  </Navbar>
);

export default Header;
