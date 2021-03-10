import React from 'react';
import styles from './styles.module.scss';
import { IApps } from '../../../../common/models/apps/IApps';
import AppItem from '../../components/AppItem/index';

interface IProps {
  appsList: IApps[];
  search: string;
}

const AppsList: React.FC<IProps> = ({
  search,
  appsList
}) => (
  <div className={styles['list-wrp']}>
    {
      appsList.map(app => (
        app.name.includes(search)
          ? (<AppItem key={app.id} app={app} />)
          : null
      ))
    }
  </div>
);

export default AppsList;
