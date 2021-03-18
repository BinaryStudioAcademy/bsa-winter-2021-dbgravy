import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';
import { Navbar, Nav, Image } from 'react-bootstrap';
import logo from '../../images/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../common/enums/Routes';
import ProfilePopup from '../../containers/ProfilePopup';

const Header = () => (
  <Navbar className={styles.navigation}>
    <Navbar.Brand className="p-0">
      <Image className={styles['logo-img']} src={logo} alt="db-gravy-logo" />
    </Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        {
          Routes.Apps as string === window.location.pathname
            ? (
              <NavLink to={Routes.Apps} activeStyle={{ color: '#000' }} className={styles['nav-item']}>
                <FontAwesomeIcon icon={faBriefcase} />
                <span className="ml-2">Apps</span>
              </NavLink>
            ) : (
              <NavLink exact to={Routes.Apps} className={styles['nav-item']}>
                <FontAwesomeIcon icon={faBriefcase} />
                <span className="ml-2">Apps</span>
              </NavLink>
            )
        }
        {
          Routes.Resources as string === window.location.pathname
            ? (
              <NavLink exact to={Routes.Resources} activeStyle={{ color: '#000' }} className={styles['nav-item']}>
                <FontAwesomeIcon icon={faDatabase} />
                <span className="ml-2">Resources</span>
              </NavLink>
            ) : (
              <NavLink exact to={Routes.Resources} className={styles['nav-item']}>
                <FontAwesomeIcon icon={faDatabase} />
                <span className="ml-2">Resources</span>
              </NavLink>
            )
        }
      </Nav>
      <ProfilePopup />
    </Navbar.Collapse>

  </Navbar>
);

export default Header;
