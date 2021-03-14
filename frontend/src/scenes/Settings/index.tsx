import React from 'react';

import Sidebar from './components/SideBar';
import Users from './containers/Users';

import styles from './styles.module.scss';

const Settings: React.FC = () => (
  <div className={styles.container}>
    <Sidebar />
    <Users />
  </div>
);

export default Settings;
