import React from 'react';
import { Spinner } from 'react-bootstrap';

interface IProps {
  isLoading: boolean;
}

const Loader: React.FC<IProps> = ({
  isLoading,
  children
}) => (
  isLoading
    ? (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: 'absolute', height: '100%'
        }}
      >
        <Spinner animation="border" variant="secondary" role="status" />
      </div>
    ) : (
      <>
        {children}
      </>
    )
);

export default Loader;
