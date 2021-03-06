import React from 'react';
import { Spinner } from 'react-bootstrap';

interface IProps {
  isLoading: boolean;
  height?: string;
}

const Loader: React.FC<IProps> = ({
  isLoading,
  children,
  height = '100vh'
}) => (
  isLoading
    ? (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: 'relative', height: `${height}`
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
