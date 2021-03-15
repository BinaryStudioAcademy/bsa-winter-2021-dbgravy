import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Form, FormControl } from 'react-bootstrap';
import Loader from '../../components/Loader/index';
import Header from '../../components/Header/index';
import TableContainer from './components/TableContainer/index';
import { IResource } from '../../common/models/resources/IResource';
import { fetchResourceRoutine, deleteResourceRoutine, updateResourceRoutine } from './routines/index';
import { IAppState } from '../../common/models/store/IAppState';
import { connect } from 'react-redux';
import { Routes } from '../../common/enums/Routes';
import { Link } from 'react-router-dom';

interface IProps {
  resources: IResource[],
  isLoading: boolean,
  fetchResources: () => void,
  remove: (obj: { resource: IResource }) => void,
  edit: (obj: { resource: IResource }) => void
}

const Resources: React.FC<IProps> = ({
  resources,
  isLoading,
  fetchResources,
  remove,
  edit
}) => {
  useEffect(() => {
    fetchResources();
  }, []);

  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = (search: string): void => {
    setSearchValue(search);
  };

  return (
    <div className={styles['resources-wrp']}>
      <Header />

      <Loader isLoading={isLoading}>

        <div className={styles['main-block-wrp']}>

          <div className={styles['before-table']}>
            <h1>Resources</h1>
            <Form inline>
              <FormControl
                value={searchValue}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={ev => handleSearch(ev.target.value)}
              />
              <Link to={Routes.ResourcesAddEdit} className="btn btn-primary">Create new</Link>
            </Form>
          </div>

          <div className="table-wrp">
            <TableContainer search={searchValue} resources={resources} remove={remove} edit={edit} />
          </div>
        </div>
      </Loader>
    </div>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  isLoading: rootState.resource.isLoading,
  resources: rootState.resource.resources
});

const mapDispatchToProps = {
  fetchResources: fetchResourceRoutine,
  remove: deleteResourceRoutine,
  edit: updateResourceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
