import React from 'react';

import styles from '../styles.module.scss';

const Sidebar: React.FC = () => (
  <div className={styles.sidebar}>
    <div className={styles.section}>
      <span>Personal</span>
      <span>Account</span>
    </div>
    <div className={styles.section}>
      <span>Organization</span>
      <span className={styles.selected}>Users</span>
    </div>
  </div>
);

export default Sidebar;
