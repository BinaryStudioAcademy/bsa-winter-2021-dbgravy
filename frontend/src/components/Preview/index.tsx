import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { runQueryRoutine } from './routine';
import { ICreateQuery } from '../../common/models/queries/ICreateQuery';
import Table from '../TableComponent/index';
import { IAppState } from '../../common/models/store/IAppState';

interface IProps {
  isLoading: boolean,
  resultData: any,
  runQuery: Function
}

const Preview: React.FC<IProps> = ({
  isLoading,
  resultData,
  runQuery
}) => {
  const testQuery: ICreateQuery = {
    name: 'query1',
    runAutomatically: true,
    // eslint-disable-next-line
    code: 'select * from "Users"',
    showConfirm: true,
    appId: '22ba8f62-c96f-4daa-b6f7-67186707b045',
    resourceId: '27544918-2829-4982-8887-0f6375ad6cd3'
  };
  const [show, setShow] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showSpan, setShowSpan] = useState(false);
  const [valuesArray, setValues] = useState([]);

  useEffect(() => {
    if (!resultData) {
      setShowTable(false);
      setShowSpan(false);
      setValues([]);
    } else if (resultData.length !== 0) {
      setValues(resultData);
      setShowTable(true);
      setShowSpan(false);
    } else {
      setShowTable(false);
      setShowSpan(true);
    }
  }, [resultData]);

  const handleSubmit = () => {
    setShow(false);
    runQuery(testQuery);
  };
  const handleShow = () => {
    if (testQuery.showConfirm) {
      setShow(true);
    } else {
      runQuery(testQuery);
    }
  };

  return (
    <div className="min-vh-100 vw-100">
      <Button variant="primary" onClick={handleShow}>
        Preview
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm action</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure you want to run ${testQuery.name} ?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      {
        showTable ? <Table values={valuesArray} /> : null
      }
      {
        showSpan ? <span>No rows to display</span> : null
      }
    </div>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  isLoading: rootState.query.isLoading,
  resultData: rootState.query.resultData
});

const mapDispatchToProps = {
  runQuery: runQueryRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
