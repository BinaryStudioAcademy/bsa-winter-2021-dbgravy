import React from 'react';
import { Modal } from 'react-bootstrap';

interface IProps {
  show: boolean,
  message: string
}

const QueryResult: React.FC<IProps> = ({ show, message }) => (
  <Modal
    show={show}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Body>
      {message}
    </Modal.Body>
  </Modal>
);
export default QueryResult;
