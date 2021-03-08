import React from 'react';
import styles from './styles.module.scss';
import { Form, FormControl, Button } from 'react-bootstrap';
// import Loader from '../../components/Loader/index';
import Header from '../../components/Header/index';
import TableContainer from './containers/TableContainer/index';

const Resources = () => {
  const userId = '1';

  const resources = [
    {
      id: '1',
      name: '1'
    },
    {
      id: '2',
      name: '2'
    }
  ];

  return (
    <div className={styles['resources-wrp']}>

      <Header userId={userId} />

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
    </div>
  );
};

export default Resources;
