import React, { useEffect } from 'react';
import { Container, Form, Button, ButtonGroup } from 'react-bootstrap';
import { getResourceByIdRoutine, createResourceRoutine, updateResourceRoutine } from '../../routines';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { IFetchParams } from '../../../../common/models/fetch/IFetchParams';
import { Formik } from 'formik';
import resourceSchema from '../../../../common/models/formik/resourceSchema';
import { ICreateResource } from '../../../../common/models/resources/ICreateResource';
import ThandleSubmitFormData from '../../models/ThandleSubmitForm';
import styles from './styles.module.scss';
import { Routes } from '../../../../common/enums/Routes';
import InputField from '../../../../components/InputField';
import { IAppState } from '../../../../common/models/store/IAppState';

interface IProps {
  resource: ICreateResource,
  getResource: Function;
  addResource: ThandleSubmitFormData;
  editResource: ThandleSubmitFormData;
  history: {
    push(url: string): void;
  };
}

const CreateUpdateResource: React.FC<IProps> = (
  {
    resource,
    getResource,
    addResource,
    editResource,
    history: { push }
  }
) => {
  const { id }: IFetchParams = useParams();
  useEffect(() => {
    console.log(resource);
    if (id) {
      getResource(id);
    }
  }, []);

  const handleSubmitFormData: ThandleSubmitFormData = newResource => {
    if (id) {
      console.log(newResource);
      // editResource(resource);
    } else {
      addResource(newResource);
      push(Routes.Resources);
    }
  };
  return (
    <Container className="container-md max-vh-100">
      <header className="pt-4">
        <h1>
          {
            id ? 'Edit Resource' : 'Create Resource'
          }
        </h1>
      </header>

      <Formik
        validationSchema={resourceSchema}
        initialValues={resource}
        onSubmit={handleSubmitFormData}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          errors,
          isSubmitting
        }) => (

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className={styles.requiredProperty}>Resource&#39;s type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                onChange={handleChange}
              >
                <option>postgres</option>
              </Form.Control>
              {touched.type && (
                <Form.Control.Feedback type="invalid">
                  {errors.type}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group>
              <InputField
                label="Name"
                name="name"
                type="text"
                placeholder="i.e. &#34;Production DB (readonly)&#34; or &#34;Internal Admin API&#34;"
                labelClassName
              />
              {touched.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              )}
              <Form.Text muted>
                The name for this resource when creating queries in the DBGravy editor.
              </Form.Text>
            </Form.Group>
            <InputField
              label="Host"
              name="host"
              type="url"
              placeholder=""
              labelClassName
            />
            <InputField
              label="Port"
              name="port"
              type="number"
              placeholder=""
              labelClassName
            />
            <InputField
              label="Database name"
              name="dbName"
              type="text"
              placeholder="hn_api_production"
            />
            <InputField
              label="Database username"
              name="dbUserName"
              type="text"
              placeholder="postgres"
            />
            <InputField
              label="Database password"
              name="dbPassword"
              type="password"
              placeholder="password"
            />
            <Link to={Routes.Resources} className="btn btn-light">Back</Link>
            <ButtonGroup className="float-right">
              <Button
                variant="light"
                className="text-primary"
                type="submit"
                name="testConnection"
              >
                Test connection
              </Button>
              <Button
                variant="secondary"
                type="submit"
                name="createResource"
              >
                createResource&rarr;
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>

    </Container>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  resource: rootState.resource.resource
});

const mapDispatchToProps = {
  getResource: getResourceByIdRoutine,
  addResource: createResourceRoutine,
  editResource: updateResourceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdateResource);
