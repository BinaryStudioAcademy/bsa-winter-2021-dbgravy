import React, { useState, useEffect } from 'react';
import { Form, Card, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import styles from './styles.module.scss';

export interface IInspectProps {
  selectedItem: IDropItem | null,
  editItem: Function,
  deleteItem: Function
}

const Inspect: React.FC<IInspectProps> = ({ selectedItem, editItem, deleteItem }) => {
  const [componentNameId, setComponentNameId] = useState(selectedItem
    ? (selectedItem as IDropItem).id as string
    : '');
  const [toggleComponentNameId, setToggleComponentNameId] = useState(false);
  const [labelInputText, setLabelInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [defaultValueInputText, setDefaultValueInputText] = useState('');
  const [textButton, setTextButton] = useState('');
  const [colorButton, setColorButton] = useState('');

  const DropdownButton = styled(Dropdown.Toggle)`
    :after {
        display: none;
    }
  `;

  const handleBlur = () => {
    editItem(selectedItem, componentNameId, true);
    setToggleComponentNameId(false);
  };

  useEffect(() => {
    setComponentNameId((selectedItem as IDropItem).id);
  }, [selectedItem]);

  return (
    <div style={{ width: '100%' }}>
      {
        (!selectedItem) && (
          <div className={styles.noSelect}>
            No components selected. Click on a component to select it.
          </div>
        )
      }
      {
        (selectedItem && (
          toggleComponentNameId ? (
            <InputGroup className="mb-3">
              <FormControl
                value={componentNameId}
                type="text"
                placeholder="Component name"
                onChange={
                  ev => setComponentNameId(ev.target.value)
                }
                onBlur={handleBlur}
              />
              <Button>
                <FontAwesomeIcon icon={faEllipsisV} />
              </Button>
            </InputGroup>
          ) : (
            <Card className={styles.elementInfoCard}>
              <Card.Header className={styles.cardHeader} onClick={() => setToggleComponentNameId(true)}>
                <span>{componentNameId}</span>
              </Card.Header>
              <Dropdown>
                <DropdownButton variant="success" id="dropdown-basic">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </DropdownButton>
                <Dropdown.Menu>
                  <Dropdown.Header>Dropdown</Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="1" onClick={() => deleteItem(componentNameId)}>
                    <span style={{ color: 'red' }}>Delete</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card>
          )
        ))
      }
      {
        (selectedItem && selectedItem.componentType === 'textInput') && (
          <Form>
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              value={labelInputText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabelInputText(e.target.value)}
            />
            <Form.Label>Input type</Form.Label>
            <Form.Control as="select">
              <option>text</option>
              <option>password</option>
              <option>date</option>
            </Form.Control>
            <Form.Label>Default value</Form.Label>
            <Form.Control
              type="text"
              value={defaultValueInputText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDefaultValueInputText(e.target.value)}
            />
            <Form.Label>Place holder</Form.Label>
            <Form.Control
              type="text"
              value={placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceholder(e.target.value)}
            />
          </Form>
        )
      }
      {
        (selectedItem && selectedItem.componentType === 'table') && (
          <Form>
            <Form.Control as="textarea" rows={3} />
          </Form>
        )
      }
      {
        (selectedItem && selectedItem.componentType === 'button') && (
          <Form>
            <Form.Label>Text</Form.Label>
            <Form.Control
              type="text"
              value={textButton}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextButton(e.target.value)}
            />
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              value={colorButton}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColorButton(e.target.value)}
            />
          </Form>
        )
      }
    </div>
  );
};

export default Inspect;
