import React from 'react';
import styles from './styles.module.scss';
import { IApps } from '../../../../common/models/apps/IApps';
import AppItem from '../../components/AppItem/index';

interface IProps {
  appsList: IApps[];
}

const AppsList: React.FC<IProps> = ({
  appsList
}) => (
  <div className={styles['list-wrp']}>
    {
      appsList.map(app => <AppItem key={app.id} app={app} />)
    }
  </div>
);

export default AppsList;
