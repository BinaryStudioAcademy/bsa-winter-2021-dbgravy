import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Form, FormControl } from 'react-bootstrap';
import AddApp from './components/AddApp';
import { addAppRoutine, deleteAppRoutine, fetchAppRoutine, showEditRoutine } from './routines';
import { connect } from 'react-redux';
import AppsList from './containers/AppsList/index';
import { IApps } from '../../common/models/apps/IApps';
import { IAppState } from '../../common/models/store/IAppState';
import Loader from '../../components/Loader/index';
import Header from '../../components/Header/index';

interface IProps {
  addApp: (name: string) => void;
  fetchApps: () => void;
  deleteApp: (data: { app: IApps }) => void;
  showEdit: (data: { app: IApps, show: boolean }) => void;
  isEdit?: boolean;
  isLoading: boolean;
  apps: IApps[];
}

const Apps: React.FC<IProps> = ({ fetchApps, addApp, apps, isLoading, deleteApp, showEdit, isEdit }) => {
  useEffect(() => {
    fetchApps();
  }, []);

  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className={styles['apps-wrp']}>

      <Header />

      <Loader isLoading={isLoading}>
        <div className={styles['main-block-wrp']}>
          <div className={styles['before-table']}>
            <h1>All</h1>
            <Form inline>
              <FormControl
                onChange={
                  ev => setSearchValue(ev.target.value)
                }
                value={searchValue}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <AddApp onAddApp={name => addApp(name)} />
            </Form>
          </div>

          <AppsList
            search={searchValue}
            appsList={apps}
            deleteApp={deleteApp}
            showEdit={showEdit}
          />
        </div>
      </Loader>
    </div>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  isLoading: rootState.app.application.isLoading,
  apps: rootState.app.application.apps
});

const mapDispatchToProps = {
  addApp: addAppRoutine,
  fetchApps: fetchAppRoutine,
  showEdit: showEditRoutine,
  deleteApp: deleteAppRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Apps);
