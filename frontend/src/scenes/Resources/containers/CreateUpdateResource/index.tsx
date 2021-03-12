/* eslint-disable no-console */
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { Container } from 'react-bootstrap';

import CreateUpdateResourceForm from '../../components/CreateUpdateResourceForm';
import ThandleSubmitFormData from '../../models/types/ThandleSubmitFormData';
// import { IResouercesState } from '../../../../reducers/resources';
import TResource from '../../../../common/models/types/TResource';
import { FormActions } from '../../models/enums/FormActions';
import { Roles } from '../../../../common/enums/UserRoles';

import {
  testConnectionRoutine,
  createResourceRoutine,
  updateResourceRoutine
} from '../../routines';

interface IProps {
  initialState: TResource,
  organizationId: string,
  roleUser: Roles,
  testConnection: Routine<any>,
  createResource: Routine<any>,
  updateResource: Routine<any>
}

const CreateUpdateResource: FC<IProps> = ({
  initialState,
  organizationId,
  roleUser,
  testConnection: testConnectionAction,
  createResource: createResourceAction,
  updateResource: updateResourceAction
}) => {
  const handleSubmitFormData: ThandleSubmitFormData = async (
    { resource, ...values },
    formikHelpers
  ) => {
    try {
      switch (resource[0]) {
        case FormActions.createResource:
          if (!values.id) {
            const { id, ...payload } = values;
            await createResourceAction(payload);
          } else {
            await updateResourceAction(values);
          }
          break;

        default:
          const { id, ...payload } = values;
          await testConnectionAction(payload);
      }
    } catch {
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Container className="container-md vh-100">
      <header>
        <h1>
          {
            !initialState.id
              ? 'Create Resource'
              : `Update ${initialState.name}`
          }
        </h1>
      </header>

      <CreateUpdateResourceForm
        handleSubmitFormData={handleSubmitFormData}
        initialState={initialState}
        roleUser={roleUser}
      />

    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  initialState: state.resources.editInitialState,
  organizationId: state.user.organizationId,
  roleUser: state.user.role
});

const mapDispactchToProps = {
  testConnection: testConnectionRoutine,
  createResource: createResourceRoutine,
  updateResource: updateResourceRoutine
};

export default connect(mapStateToProps, mapDispactchToProps)(CreateUpdateResource);
