import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { Form, FormControl, Button } from 'react-bootstrap';
import Loader from '../../components/Loader/index';
import Header from '../../components/Header/index';
import TableContainer from './containers/TableContainer/index';
import { IResource } from '../../common/models/resources/IResource';
import { fetchResourceRoutine } from './routines/index';
import { IAppState } from '../../common/models/store/IAppState';
import { connect } from 'react-redux';

interface IProps {
  resources: IResource[],
  isLoading: boolean,
  fetchResources: Function
}

const Resources: React.FC<IProps> = ({
  resources,
  isLoading,
  fetchResources
}) => {
  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className={styles['resources-wrp']}>
      <Header />

      <Loader isLoading={isLoading}>

        <div className={styles['main-block-wrp']}>

          <div className={styles['before-table']}>
            <h1>Resources</h1>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="primary">Create new</Button>
            </Form>
          </div>

          <div className="table-wrp">
            <TableContainer resources={resources} />
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
  fetchResources: fetchResourceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
