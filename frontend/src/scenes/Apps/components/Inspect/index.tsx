import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import styles from './styles.module.scss';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';

export interface IInspectProps {
  selectedItem: IDropItem | null,
  deleteComponent: IBindingCallback1<string>
}

const Inspect: React.FC<IInspectProps> = ({ selectedItem, deleteComponent }) => {
  const [labelInputText, setLabelInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [defaultValueInputText, setDefaultValueInputText] = useState('');
  const [textButton, setTextButton] = useState('');
  const [colorButton, setColorButton] = useState('');

  const handleDeletedComponent = ({ id }: IDropItem): void => {
    deleteComponent(id);
  };

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
        (selectedItem && selectedItem.componentType === 'input') && (
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
      {
        selectedItem
        && (
          <div className={styles.buttonContainer}>
            <Button
              variant="outline-secondary"
              size="sm"
              className={styles.deleteButton}
              onClick={() => handleDeletedComponent(selectedItem)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </div>
        )
      }
    </div>
  );
};

export default Inspect;
