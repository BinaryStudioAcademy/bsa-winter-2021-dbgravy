import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Roles } from '../../../../common/enums/UserRoles';
import { inviteEmailSchema } from '../../../../common/models/formik/ValidationSchemas';
import { IUserEdit } from '../../../../common/models/user/IUserEdit';
import styles from '../styles.module.scss';

interface IProps {
  showModal: boolean,
  clsName: string,
  userChanges: IUserEdit,
  setShowModal: (status: boolean) => void,
  handleSend: (obj: { email: string, role: Roles, new?: boolean }) => void,
}

const InviteModal: React.FC<IProps> = ({ showModal, clsName, setShowModal, handleSend, userChanges }) => {
  useEffect(() => {
    if (!(userChanges.isFailed && userChanges.isLoading)) {
      formik.resetForm({});
    }
  }, [userChanges.isLoading, userChanges.isFailed]);

  const [isChange, setChange] = useState(false);

  const onSend = (values: { email: string, role: Roles }) => {
    const { email, role } = values;
    const newUser = {
      email,
      role,
      new: true
    };
    handleSend(newUser);
    setChange(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      role: Roles.Viewer
    },
    validationSchema: inviteEmailSchema,
    onSubmit: (values, { setSubmitting }) => {
      onSend(values);
      setSubmitting(false);
    }
  });

  const handleClose = () => {
    setShowModal(false);
    formik.resetForm({});
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invite new member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userChanges.isFailed && !isChange ? (<div className={styles.lf}>User not found</div>) : null}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            {formik.errors.email && formik.touched.email
              ? (<div className={styles.lf}>{formik.errors.email}</div>) : null}
            <div className={clsName}>
              <Form.Control
                type="text"
                name="email"
                placeholder="name@example.com"
                className="col-12"
                value={formik.values.email}
                onChange={e => { formik.handleChange(e); setChange(true); }}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <div className={clsName}>
              <Form.Control
                as="select"
                size="sm"
                custom
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <option>{Roles.Admin}</option>
                <option>{Roles.Viewer}</option>
                <option>{Roles.Developer}</option>
              </Form.Control>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={userChanges.isLoading}>
            Invite
          </Button>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default InviteModal;
