import React, { MouseEvent, KeyboardEvent, ChangeEvent, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Roles } from '../../../../common/enums/UserRoles';
import { IUserEdit } from '../../../../common/models/user/IUserEdit';
import styles from '../styles.module.scss';

interface IProps {
  showModal: boolean,
  clsName: string,
  userChanges: IUserEdit,
  setShowModal: (status: boolean) => void,
  handleSend: (obj: {email: string, role: Roles, new?: boolean}) => void,
}

const InviteModal: React.FC<IProps> = ({ showModal, clsName, setShowModal, handleSend, userChanges }) => {
  const [email, setEmail] = useState('');
  const [userRole, setRole] = useState(Roles.Viewer);
  const [emailValid, setEmailValid] = useState(true);

  const handleClose = () => {
    setEmail('');
    setRole(Roles.Viewer);
    setShowModal(false);
  };

  const isEmailValid = (currentEmail: string) => /(.+)@(.+){2,}\.(.+){2,}/g.test(currentEmail.toLocaleLowerCase());

  const handleClear = (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => setEmail('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailValid(true);
  };

  const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    switch (value) {
      case 'Admin':
        setRole(Roles.Admin);
        break;

      case 'Developer':
        setRole(Roles.Developer);
        break;

      default:
        setRole(Roles.Viewer);
        break;
    }
  };

  const onSend = () => {
    if (isEmailValid(email)) {
      const newUser = {
        email,
        role: userRole,
        new: true
      };
      handleSend(newUser);
    } else {
      setEmailValid(false);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <div>Invite new member</div>
      </Modal.Header>
      <Modal.Body>
        {userChanges.isFailed ? <div className={styles.lf}>Failed to invite user</div> : null}
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            {!emailValid ? <span className={styles.lf}> Email is not valid</span> : null}
            <div className={clsName}>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                className="col-11"
                value={email}
                onChange={onChange}
              />
              <div
                className={styles.clear}
                onClick={handleClear}
                onKeyDown={handleClear}
                role="button"
                tabIndex={0}
              >
                x
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="formSelect">
            <Form.Label>Role</Form.Label>
            <div className={clsName}>
              <Form.Control
                as="select"
                size="sm"
                custom
                value={userRole}
                onChange={onSelect}
              >
                <option>{Roles.Admin}</option>
                <option>{Roles.Viewer}</option>
                <option>{Roles.Developer}</option>
              </Form.Control>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSend} disabled={userChanges.isLoading}>
          Invite
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviteModal;
