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
import { IInputText } from '../../../../common/models/editor/IInputText';
import { IOptionType } from '../../../../common/models/editor/IOption';

export interface IInspectProps {
  selectedItem: IDropItem | null,
  editComponent: Function,
  deleteComponent: Function,
  queries: IQuery[]
}

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
  const [labelInputText, setLabelInputText] = useState(selectedItem
    ? ((selectedItem as IDropItem).component as IInputText).label as string
    : '');
  const [placeholder, setPlaceholder] = useState(selectedItem
    ? ((selectedItem as IDropItem).component as IInputText).placeholder as string
    : '');

  const [textButton, setTextButton] = useState(selectedItem
    ? ((selectedItem as IDropItem).component as IButton)
    && ((selectedItem as IDropItem).component as IButton).text as string
    : '');
  const [colorButton, setColorButton] = useState(selectedItem
    ? ((selectedItem as IDropItem).component as IButton)
    && ((selectedItem as IDropItem).component as IButton).color as string
    : '');

  const [query, setQuery] = useState<ValueType<IOptionType, boolean>>();

  const [selectedQuery, setSelectedQuery] = useState<IQuery|undefined>();
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
          queryId: selectedQuery?.id,
          text: textButton,
          color: colorButton
        }
      };
      editComponent(newItem);
    }
    if (selectedItem && selectedItem.componentType === 'textInput') {
      const item = {
        ...selectedItem,
        component: {
          ...selectedItem.component,
          label: labelInputText,
          placeholder,
          queryId: selectedQuery?.id
        }
      };
      editComponent(item);
    }
    if (selectedItem && selectedItem.componentType === 'table') {
      const newItem = {
        ...selectedItem,
        name: componentNameId,
        component: {
          ...selectedItem.component,
          queryId: selectedQuery?.id
        }
      };
      editComponent(newItem);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEdit();
  };

  useEffect(() => {
    if (selectedItem) {
      const searchSelectQuery:IQuery|undefined = queries.find(elem => elem.id === selectedItem?.component?.queryId);
      setSelectedQuery(searchSelectQuery);
      if (searchSelectQuery) {
        setQuery({ value: (searchSelectQuery as IQuery).id, label: (searchSelectQuery as IQuery).name });
      }
      setComponentNameId((selectedItem as IDropItem).name);
      if (selectedItem && selectedItem.componentType === 'button') {
        setTextButton(((selectedItem as IDropItem).component as IButton).text as string);
        setColorButton(((selectedItem as IDropItem).component as IButton).color as string);
      }
      if (selectedItem && selectedItem.componentType === 'textInput') {
        setPlaceholder(((selectedItem as IDropItem).component as IInputText).placeholder as string);
        setLabelInputText(((selectedItem as IDropItem).component as IInputText).label as string);
      }
    }
  }, [selectedItem, queries]);

  const optionsQueries: IOptionType[] = queries.map(({ id, name }) => ({ value: id, label: (name as string) }));
  const handleSetQuery = (option: IOptionType) => {
    setQuery(option);
    const searchSelectQuery = queries.find(elem => elem.id === option.value);
    setSelectedQuery(searchSelectQuery as IQuery);
  };

  return (
    <div style={{ width: '100%', padding: '15px' }}>
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
                autoFocus
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
                <DropdownButton variant="primary" id="dropdown-basic">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </DropdownButton>
                <Dropdown.Menu>
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
            <Form.Label>Run query on change</Form.Label>
            <Select
              value={query as ValueType<IOptionType, boolean>}
              onChange={option => handleSetQuery(option as IOptionType)}
              options={optionsQueries}
            />
            <div style={{ padding: '5px' }} />
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
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Label>Query data</Form.Label>
            <Select
              value={query as ValueType<IOptionType, boolean>}
              onChange={option => handleSetQuery(option as IOptionType)}
              options={optionsQueries}
            />
            <div style={{ padding: '5px' }} />
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
            <Form.Label>Run query on click</Form.Label>
            <Select
              value={query as ValueType<IOptionType, boolean>}
              onChange={option => handleSetQuery(option as IOptionType)}
              options={optionsQueries}
            />
            <div style={{ padding: '5px' }} />
            <Button
              variant="primary"
              type="submit"
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
