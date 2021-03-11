import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getResourceByIdRoutine } from '../../routines';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IFetchParams } from '../../../../common/models/fetch/IFetchParams';

interface IProps {
  getResource: Function;
}

const CreateUpdateResource: React.FC<IProps> = (
  {
    getResource
  }
) => {
  const { id }: IFetchParams = useParams();
  useEffect(() => {
    if (id) {
      getResource(id);
    }
  }, []);
  return (
    <Container className="container-md vh-100">
      <header>
        <h1>
          jjjjj
        </h1>
      </header>

      {/* <CreateUpdateResourceForm handleSubmitFormData={handleSubmitFormData} /> */}

    </Container>
  );
};

const mapDispatchToProps = {
  getResource: getResourceByIdRoutine
};

export default connect(null, mapDispatchToProps)(CreateUpdateResource);
