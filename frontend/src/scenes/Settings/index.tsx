import React from 'react';
import Header from '../../components/Header';

import Sidebar from './components/SideBar';
import Users from './containers/Users';

import styles from './styles.module.scss';

const Settings: React.FC = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.main}>
      <Sidebar />
      <Users />
    </div>
  </div>
);

export default Settings;
