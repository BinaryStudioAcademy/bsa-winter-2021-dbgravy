import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IInputText } from '../../../../common/models/editor/input/IInputText';
import {
  setNewInputValue
} from '../../routines';

interface IProps {
  component: IInputText,
  id: string,
  setInputValue: Function
}
const AppItem: React.FC<IProps> = ({
  component,
  id,
  setInputValue
}) => {
  const [inputTextValue, setInputTextValue] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => saveInput(component.queryId), 1000);
    return () => clearTimeout(timeOutId);
  }, [inputTextValue]);

  useEffect(() => {
    setInputTextValue(component.localValue || '');
  }, [component]);

  const saveInput = (queryId?: string) => {
    if (queryId) {
      console.log(component.queryId);

      // const query = //
      //   runQuery(query);
    }
    setInputValue({ key: id, value: inputTextValue });
  };

  return (
    <Form style={{ display: 'flex', position: 'relative' }}>
      <Form.Label
        style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}
      >
        {(component as IInputText).label}
        {id}
      </Form.Label>
      <Form.Control
        placeholder={(component as IInputText).placeholder}
        name={id}
        value={inputTextValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTextValue(e.target.value)}
      />
    </Form>
  );
};

const mapDispatchToProps = ({
  setInputValue: setNewInputValue
});

export default connect(null, mapDispatchToProps)(AppItem);
