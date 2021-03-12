import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../enums/Routes';
import { Formik, FieldArray, FieldArrayRenderProps } from 'formik';
import { Form, Button, ButtonGroup, InputGroup } from 'react-bootstrap';
import { FormActions } from '../../models/enums/FormActions';

import resourceSchema from '../../../../common/models/formik/resource/resourceSchema';
import TResource from '../../../../common/models/types/TResource';
import ThandleSubmitFormData from '../../models/types/ThandleSubmitFormData';
import { Roles } from '../../../../common/enums/UserRoles';

import styles from './styles.module.scss';

const CreateUpdateResourceForm: FC<{
  handleSubmitFormData: ThandleSubmitFormData,
  initialState: TResource,
  roleUser: Roles
}> = ({ handleSubmitFormData, initialState, roleUser }) => {
  const [isSecret, setIsSecret] = useState(true);
  const handleClickTestConnection = (arrayHelpers: FieldArrayRenderProps) => {
    arrayHelpers.remove(0);
    arrayHelpers.push(FormActions.createResource);
  };

  const handleClickCreateResource = (arrayHelpers: FieldArrayRenderProps) => {
    arrayHelpers.remove(0);
    arrayHelpers.push(FormActions.createResource);
  };

  return (
    <Formik
      validationSchema={resourceSchema}
      initialValues={initialState}
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

        <Form noValidate onSubmit={handleSubmit}>
          <FieldArray
            name="resource"
            render={arrayHelpers => (
              <>
                <main className={styles.main}>
                  <Form.Group>
                    <Form.Label className={styles.requiredProperty}>Resource&#39;s type</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.type && !errors.type}
                      isInvalid={touched.type && !!errors.type}
                      disabled={isSubmitting}
                    >
                      <option>PostgreSQL</option>
                    </Form.Control>
                    {touched.type && (
                      <Form.Control.Feedback type="invalid">
                        {errors.type}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className={styles.requiredProperty}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="i.e. &#34;Production DB (readonly)&#34; or &#34;Internal Admin API&#34;"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
                      disabled={isSubmitting && roleUser !== Roles.Admin}
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

                  <Form.Group>
                    <Form.Label className={styles.requiredProperty}>Host</Form.Label>
                    <Form.Control
                      type="url"
                      name="host"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.host && !errors.host}
                      isInvalid={touched.host && !!errors.host}
                      disabled={isSubmitting}
                    />
                    {touched.host && (
                      <Form.Control.Feedback type="invalid">
                        {errors.host}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className={styles.requiredProperty}>Port</Form.Label>
                    <Form.Control
                      type="number"
                      name="port"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.port && !errors.port}
                      isInvalid={touched.port && !!errors.port}
                      disabled={isSubmitting}
                    />
                    {touched.port && (
                      <Form.Control.Feedback type="invalid">
                        {errors.port}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Database name</Form.Label>
                    <Form.Control
                      type="text"
                      name="dbName"
                      placeholder="hn_api_production"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dbName && !errors.dbName}
                      isInvalid={touched.dbName && !!errors.dbName}
                      disabled={isSubmitting}
                    />
                    {touched.dbName && (
                      <Form.Control.Feedback type="invalid">
                        {errors.dbName}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Database username</Form.Label>
                    <Form.Control
                      type="text"
                      name="dbUsername"
                      placeholder="postgres"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dbUsername && !errors.dbUsername}
                      isInvalid={touched.dbUsername && !!errors.dbUsername}
                      disabled={isSubmitting}
                    />
                    {touched.type && (
                      <Form.Control.Feedback type="invalid">
                        {errors.dbUsername}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Database password</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text
                          onClick={() => setIsSecret(!isSecret)}
                          className={styles.secret}
                        >
                          &#128711;
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type={isSecret ? 'password' : 'text'}
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.password && !errors.password}
                        isInvalid={touched.password && !!errors.password}
                        disabled={isSubmitting}
                      />
                    </InputGroup>
                    {touched.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </main>

                <footer className={styles.footer}>
                  <NavLink exact to={Routes.Resources}>
                    <Button variant="light" disabled={isSubmitting}>&larr;Back</Button>
                  </NavLink>
                  <ButtonGroup className="float-right">
                    <Button
                      variant="light"
                      className="text-primary"
                      type="submit"
                      name="testConnection"
                      disabled={isSubmitting}
                      onClick={() => handleClickTestConnection(arrayHelpers)}
                    >
                      Test connection
                    </Button>
                    <Button
                      variant="secondary"
                      type="submit"
                      name="createResource"
                      disabled={isSubmitting}
                      onClick={() => handleClickCreateResource(arrayHelpers)}
                    >
                      createResource&rarr;
                    </Button>
                  </ButtonGroup>
                </footer>
              </>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CreateUpdateResourceForm;
