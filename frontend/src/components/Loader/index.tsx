import React from 'react';
import { Spinner } from 'react-bootstrap';

interface IProps {
  isLoading: boolean;
  isAbsolute?: boolean
}

const Loader: React.FC<IProps> = ({
  isLoading,
  isAbsolute = true,
  children
}) => (
  isLoading
    ? (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: isAbsolute ? 'absolute' : 'inherit', height: '100%'
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
