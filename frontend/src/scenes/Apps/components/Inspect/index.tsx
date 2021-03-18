import React from 'react';
import { Form } from 'react-bootstrap';

const Inspect: React.FC<any> = ({ selectedItem }) => {
  console.log(selectedItem);

  return (
    <div style={{ width: '100%' }}>
      {
        (selectedItem.itemType === 'textInput') && (
          <Form>
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              value=""
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
              value=""
            />
            <Form.Label>Place holder</Form.Label>
            <Form.Control
              type="text"
              value=""
            />
          </Form>
        )
      }
    </div>
  );
};

export default Inspect;
