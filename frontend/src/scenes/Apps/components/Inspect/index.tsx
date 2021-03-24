import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import styles from './styles.module.scss';
import { addInputRoutine } from '../../routines/index';
import { connect } from 'react-redux';
import QueriesList from '../QueriesList/index';
import { IQuery } from '../../../../common/models/apps/querys';
import { IAppState } from '../../../../common/models/store/IAppState';

export interface IInspectProps {
  selectedItem: IDropItem | null,
  addInput: Function,
  queries: IQuery[]
}

const Inspect: React.FC<IInspectProps> = ({ selectedItem, addInput, queries }) => {
  const searchSelectQuery = queries.find(elem => elem.id === selectedItem?.component.queryId);
  const [labelInputText, setLabelInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [textButton, setTextButton] = useState('');
  const [colorButton, setColorButton] = useState('');
  const [selectedQuery, setSelectedQuery] = useState<IQuery | undefined>(searchSelectQuery);
  const changeSelectQuery = (id: string) => {
    const newSelectQuery = queries.find(elem => elem.id === id);
    setSelectedQuery(newSelectQuery);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedItem?.component);
    switch (selectedItem?.componentType) {
      case 'input':
        const input = {
          label: labelInputText,
          placeholder,
          queryId: selectedQuery?.id,
          componentId: '3cb98059-d01b-4bee-a67a-5fca4e248d69'
        };
        addInput(input);
        break;
      default:
        break;
    }
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
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              value={labelInputText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabelInputText(e.target.value)}
            />
            <Form.Label>Placeholder</Form.Label>
            <Form.Control
              type="text"
              value={placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceholder(e.target.value)}
            />
            <QueriesList queryList={queries} selectedQuery={selectedQuery} changeQuery={changeSelectQuery} />
            <Button
              variant="primary"
              type="submit"
            >
              Save
            </Button>
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

const mapStateToProps = (state: IAppState) => ({
  queries: state.app.qur.queriesApp
});

const mapDispatchToProps = {
  addInput: addInputRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Inspect);
