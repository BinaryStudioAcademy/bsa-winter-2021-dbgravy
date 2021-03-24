import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import styles from './styles.module.scss';
import { IAppState } from '../../../../common/models/store/IAppState';
import { IQuery } from '../../../../common/models/queries/IQuery';
import QueriesList from '../queryList';
import { connect } from 'react-redux';
import { addTableInfoRoutine } from '../../routines';

export interface IInspectProps {
  selectedItem: IDropItem | null
  queries: IQuery[],
  addTableInfo: Function
}

const Inspect: React.FC<IInspectProps> = ({ selectedItem, addTableInfo, queries }) => {
  const [labelInputText, setLabelInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [defaultValueInputText, setDefaultValueInputText] = useState('');
  const [textButton, setTextButton] = useState('');
  const [colorButton, setColorButton] = useState('');
  const searchSelectQuery:IQuery|undefined = queries.find(elem => elem.id === selectedItem?.table?.queryId);
  console.log(selectedItem);
  const [selectedQuery, setSelectedQuery] = useState<IQuery|undefined>(searchSelectQuery);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (selectedItem?.componentType) {
      case 'button':
        addTableInfo(selectedItem);
        break;
      case 'table':
        addTableInfo(selectedItem);
        break;
      default:
        break;
    }
    // addComponent(selectedItem);
  };
  const changeSelectQuery = (id:string) => {
    const newSelectQuery = queries.find(elem => elem.id === id);
    setSelectedQuery(newSelectQuery);
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
            <QueriesList queryList={queries} selectedQuery={selectedQuery} changeQuery={changeSelectQuery} />
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </Button>
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
  addTableInfo: addTableInfoRoutine
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Inspect);
