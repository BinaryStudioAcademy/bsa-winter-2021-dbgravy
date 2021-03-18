import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { runQueryRoutine, previewQueryRoutine } from './routine';
import { ICreateQuery } from '../../common/models/queries/ICreateQuery';
import Table from '../TableComponent/index';
import { IAppState } from '../../common/models/store/IAppState';

interface IProps {
  isLoading: boolean,
  resultData: any,
  runQuery: (query: ICreateQuery) => void,
  previewQuery: (query: ICreateQuery) => void
}

const Preview: React.FC<IProps> = ({
  isLoading,
  resultData,
  runQuery,
  previewQuery
}) => {
  const testQuery: ICreateQuery = {
    id: '22ba8f62-c96f-4daa-b6f7-67186707b041',
    name: 'query1',
    runAutomatically: true,
    // eslint-disable-next-line
    code: 'select * from "Users"',
    showConfirm: true,
    appId: '22ba8f62-c96f-4daa-b6f7-67186707b045',
    resourceId: '27544918-2829-4982-8887-0f6375ad6cd3'
  };
  // const testQuery2: ICreateQuery = {
  //   name: 'query2',
  //   runAutomatically: true,
  // eslint-disable-next-line
  //   code: 'INSERT INTO "Users" (id, "firstName", "secondName") VALUES (\'40e6215d-b8c0-4896-987c-f30f3678f618\', \'Joe5\', \'Cool5\');',
  //   showConfirm: true,
  //   appId: '22ba8f62-c96f-4daa-b6f7-67186707b045',
  //   resourceId: '27544918-2829-4982-8887-0f6375ad6cd3'
  // };
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
    previewQuery(testQuery);
  };
  const handleShow = () => {
    if (testQuery.showConfirm) {
      setShow(true);
    } else {
      previewQuery(testQuery);
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
  isLoading: rootState.app.qur.isLoading,
  resultData: rootState.app.qur.resultData
});

const mapDispatchToProps = {
  runQuery: runQueryRoutine,
  previewQuery: previewQueryRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
