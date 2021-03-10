import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Form, FormControl } from 'react-bootstrap';
import AddApp from './components/AddApp';
import { addAppRoutine, fetchAppRoutine } from './routines';
import { connect } from 'react-redux';
import AppsList from './containers/AppsList/index';
import { IApps } from '../../common/models/apps/IApps';
import { IAppState } from '../../common/models/store/IAppState';
import Loader from '../../components/Loader/index';
import Header from '../../components/Header/index';

interface IProps {
  isLoading: boolean,
  addApp: Function,
  fetchApps: Function,
  apps: IApps[]
}

const Apps: React.FC<IProps> = ({ fetchApps, addApp, apps, isLoading }) => {
  useEffect(() => {
    fetchApps();
  }, []);

  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = (search: string): void => {
    setSearchValue(search);
  };

  const handleAddApp = (name: string): void => {
    addApp(name);
  };

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
                  ev => handleSearch(ev.target.value)
                }
                value={searchValue}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <AddApp onAddApp={handleAddApp} />
            </Form>
          </div>

          <Form>
            <Form.Check
              type="checkbox"
              label="Select all"
            />
          </Form>

          <AppsList search={searchValue} appsList={apps} />
        </div>
      </Loader>
    </div>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  isLoading: rootState.application.isLoading,
  apps: rootState.application.apps
});

const mapDispatchToProps = {
  addApp: addAppRoutine,
  fetchApps: fetchAppRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Apps);
