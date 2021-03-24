import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { IInputText } from '../../../../common/models/editor/input/IInputText';
import {
  setNewInputValue
} from '../../routines';
// import { queries } from '../../../../reducers/queries';

interface IProps {
  input: IInputText,
  name: string
}
const AppItem: React.FC<IProps> = ({
  input,
  name
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(input.value);

  useEffect(() => {
    const timeOutId = setTimeout(() => startQuery(input.queryId), 1000);
    return () => clearTimeout(timeOutId);
  }, [value]);

  const startQuery = (queryId: string | undefined) => {
    if (queryId) {
      // const query = //
      //   runQuery(query);
    } else {
      dispatch(setNewInputValue.trigger({ name, value }));
    }
  };

  const handleChangeValue = (text: string) => {
    setValue(text);
  };

  return (
    <Form style={{ display: 'flex', position: 'relative' }}>
      <Form.Label
        style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}
      >
        {/* {title} */}
      </Form.Label>
      <Form.Control
        // type={(component as IInputText).type}
        // name={key}
        // value={inputTextValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeValue(e.target.value)}
      />
    </Form>
  );
};

export default AppItem;
