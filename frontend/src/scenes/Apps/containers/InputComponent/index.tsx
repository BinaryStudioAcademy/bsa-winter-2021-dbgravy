import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ILocal } from '../../../../common/models/editor/ILocal';
import { IInputText } from '../../../../common/models/editor/input/IInputText';
import { IQuery } from '../../../../common/models/queries/IQuery';
import { IAppState } from '../../../../common/models/store/IAppState';
import { runSelectQueryRoutine } from '../../../constructor/routines';
import {
  setNewInputValue
} from '../../routines';

interface IProps {
  component: IInputText,
  id: string,
  setInputValue: (obj: { id: string, value: string }) => void,
  runQuery: (o: any) => void,
  queries: Array<IQuery | any>,
  locals: ILocal[]
}
const AppItem: React.FC<IProps> = ({
  component,
  id,
  setInputValue,
  runQuery,
  queries,
  locals
}) => {
  const [inputTextValue, setInputTextValue] = useState('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const timeOutId = setTimeout(() => saveInput(component.queryId), 1000);
      return () => clearTimeout(timeOutId);
    }
    return () => false;
  }, [inputTextValue]);

  useEffect(() => {
    setInputTextValue(locals.find(e => e.id === id)?.value || '');
  }, [component]);

  const saveInput = (queryId?: string) => {
    if (queryId) {
      const queryData = (queries as IQuery[]).find(e => e.id === queryId);
      const { id: qId, code, showConfirm, name, triggers, appId, resourceId } = queryData as IQuery & { triggers: [] };

      const value = {
        data: {
          id: qId, code, showConfirm, name, triggers
        },
        appId,
        resourceId,
        triggered: []
      };
      runQuery(value);
    }
    setInputValue({ id, value: inputTextValue });
  };

  return (
    <Form style={{ display: 'flex', position: 'relative' }}>
      <Form.Label
        style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}
      >
        {(component as IInputText).label}
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

const mapStateToProps = (state: IAppState) => ({
  queries: state.app.qur.queriesApp,
  locals: state.app.editor.locals
});

const mapDispatchToProps = ({
  setInputValue: setNewInputValue,
  runQuery: runSelectQueryRoutine
});

export default connect(mapStateToProps, mapDispatchToProps)(AppItem);
