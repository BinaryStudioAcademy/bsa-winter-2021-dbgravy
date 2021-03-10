/* eslint-disable no-console */
import React, { FC } from 'react';
import { Container } from 'react-bootstrap';

import CreateUpdateResourceForm from '../../components/CreateUpdateResourceForm';
import ThandleSubmitFormData from '../../models/types/ThandleSubmitFormData';

const CreateUpdateResource: FC<{}> = () => {
  const handleSubmitFormData: ThandleSubmitFormData = (
    values,
    formikHelpers
  ) => {
    console.log(values);
    console.log(formikHelpers);
  };

  return (
    <Container className="container-md vh-100">
      <header>
        <h1>
          Create Resource Update[Resource name]
        </h1>
      </header>

      <CreateUpdateResourceForm handleSubmitFormData={handleSubmitFormData} />

    </Container>
  );
};

export default CreateUpdateResource;
