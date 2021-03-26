import React from 'react';
import styles from './styles.module.scss';
import { IApps } from '../../../../common/models/apps/IApps';
import AppItem from '../../components/AppItem/index';

interface IProps {
  appsList: IApps[];
  search: string;
  deleteApp: (data: { app: IApps }) => void;
  showEdit: (data: { app: IApps, show: boolean }) => void;
  access: boolean
}

const AppsList: React.FC<IProps> = ({ search, appsList, deleteApp, showEdit, access
}) => (
  <div className={styles['list-wrp']}>
    {
      appsList.map(app => (
        app.name.toLowerCase().includes(search.trim().toLowerCase())
          ? (
            <AppItem
              key={app.id}
              app={app}
              deleteApp={deleteApp}
              showEdit={showEdit}
              access={access}
            />
          )
          : null
      ))
    }
  </div>
);

export default AppsList;
