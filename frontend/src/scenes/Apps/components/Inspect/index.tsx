import React, { useState, useEffect } from 'react';
import {
  addComponentRoutine
} from '../../routines';
import { connect } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import { Form, Card, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import Select, { ValueType } from 'react-select';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import styles from './styles.module.scss';
import { IQuery } from '../../../../common/models/apps/querys';
import { IButton } from '../../../../common/models/editor/IButton';

export interface IInspectProps {
  selectedItem: IDropItem | null,
  editComponent: Function,
  deleteComponent: Function,
  queries: IQuery[]
}

type OptionType = {
  value: string;
  label: string;
};

const DropdownButton = styled(Dropdown.Toggle)`
  :after {
      display: none;
  }
`;

const Inspect: React.FC<IInspectProps> = ({ selectedItem, editComponent, deleteComponent, queries }) => {
  const [componentNameId, setComponentNameId] = useState(selectedItem
    ? (selectedItem as IDropItem).name as string
    : '');
  const [toggleComponentNameId, setToggleComponentNameId] = useState(false);
  const [labelInputText, setLabelInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [defaultValueInputText, setDefaultValueInputText] = useState('');
  const [textButton, setTextButton] = useState(selectedItem
    ? ((selectedItem as IDropItem).component as IButton).text as string
    : '');
  const [colorButton, setColorButton] = useState(selectedItem
    ? ((selectedItem as IDropItem).component as IButton).color as string
    : '');

  const [typeAction, setTypeAction] = useState<ValueType<OptionType, boolean>>();
  const [query, setQuery] = useState<ValueType<OptionType, boolean>>();

  const handleEditNameId = () => {
    setToggleComponentNameId(false);
  };

  const handleEdit = () => {
    if (selectedItem && selectedItem.componentType === 'button') {
      const newItem = {
        ...selectedItem,
        name: componentNameId,
        component: {
          ...selectedItem.component,
          text: textButton,
          color: colorButton
        } };
      editComponent(newItem);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEdit();
  };

  useEffect(() => {
    if (selectedItem) {
      setComponentNameId((selectedItem as IDropItem).name);
      if (selectedItem && selectedItem.componentType === 'button') {
        setTextButton(((selectedItem as IDropItem).component as IButton).text as string);
        setColorButton(((selectedItem as IDropItem).component as IButton).color as string);
      }
    }
  }, [selectedItem]);

  const optionsTypeAction: OptionType[] = [
    { value: 'Run a query', label: 'Run a query' }
  ];

  const optionsQueries: OptionType[] = queries.map(({ name, code }) => ({ value: name, label: (code as string) }));
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
                onBlur={handleEditNameId}
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
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() => deleteComponent((selectedItem as IDropItem).id)}
                  >
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
          <Form onSubmit={e => handleSubmit(e)}>
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
            <Form.Label>On click</Form.Label>
            <Select
              value={typeAction as ValueType<OptionType, boolean>}
              onChange={option => setTypeAction(option)}
              options={optionsTypeAction}
            />
            <div style={{ padding: '5px' }} />
            <Select
              value={query as ValueType<OptionType, boolean>}
              onChange={option => setQuery(option)}
              options={optionsQueries}
            />
            <div style={{ padding: '5px' }} />
            <Button
              variant="primary"
              type="submit"
              // disabled={!(typeAction && query)}
            >
              Save
            </Button>
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
  addComponent: addComponentRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Inspect);
