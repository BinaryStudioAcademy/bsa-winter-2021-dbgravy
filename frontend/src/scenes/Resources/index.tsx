import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Form, FormControl, InputGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader/index';
import Header from '../../components/Header/index';
import TableContainer from './components/TableContainer/index';
import { IResource } from '../../common/models/resources/IResource';
import { fetchResourceRoutine, deleteResourceRoutine } from './routines/index';
import { IAppState } from '../../common/models/store/IAppState';
import { connect } from 'react-redux';
import { Routes } from '../../common/enums/Routes';
import { Link } from 'react-router-dom';

interface IProps {
  resources: IResource[],
  isLoading: boolean,
  fetchResources: () => void,
  remove: (obj: { resource: IResource }) => void
}

const Resources: React.FC<IProps> = ({
  resources,
  isLoading,
  fetchResources,
  remove
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
            <Form inline className={styles.form}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className={styles['input-group-search']}>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  value={searchValue}
                  type="text"
                  placeholder="Search"
                  className={`mr-sm-2 border-left-0 ${styles['form-control-search']}`}
                  onChange={ev => handleSearch(ev.target.value)}
                />
              </InputGroup>
              <Link to={Routes.ResourcesAddEdit} className="btn btn-primary">Create new</Link>
            </Form>
          </div>
          {!resources.length ? (
            <Card className={`text-center ${styles['card-element-nothing']}`}>
              <Card.Body className={styles['card-body-nothing']}>
                <Card.Text className={styles['card-body-text-nothing']}>
                  Nothing here.
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <div className="table-wrp">
              <TableContainer search={searchValue} resources={resources} remove={remove} />
            </div>
          )}
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
  remove: deleteResourceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
