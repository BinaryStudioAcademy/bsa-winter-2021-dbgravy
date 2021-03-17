import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { runQueryRoutine } from './routine';
import { ICreateQuery } from '../../common/models/queries/ICreateQuery';

interface IProps {
  runQuery: Function
}

const Preview: React.FC<IProps> = ({
  runQuery
}) => {
  const testQuery: ICreateQuery = {
    name: 'query1',
    runAutomatically: true,
    code: 'select * from "users"',
    showConfirm: true,
    appId: '22ba8f62-c96f-4daa-b6f7-67186707b045',
    resourceId: '27544918-2829-4982-8887-0f6375ad6cd3'
  };
  const [show, setShow] = useState(false);
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
        Launch demo modal
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
    </div>
  );
};

const mapDispatchToProps = {
  runQuery: runQueryRoutine
};

export default connect(null, mapDispatchToProps)(Preview);
