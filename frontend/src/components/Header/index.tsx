import React from 'react';
import styles from './styles.module.scss';
import { Navbar, Nav, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import logo from '../../images/retool-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../common/enums/Routes';

interface IProps {
  userId: string;
}
const Header: React.FC<IProps> = ({
  userId
}) => (
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
        <Nav.Link href={Routes.Resources} className={styles['nav-item']}>
          <FontAwesomeIcon icon={faDatabase} />
          <span className="ml-2">Resources</span>
        </Nav.Link>
      </Nav>
      <Button variant="secondary" className={styles['profile-icon']}>KH</Button>
    </Navbar.Collapse>

  </Navbar>
);

export default Header;
