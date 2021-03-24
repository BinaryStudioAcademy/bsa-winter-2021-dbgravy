import React, { useState, useCallback, useEffect } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import update from 'immutability-helper';
import DropAreaItem from '../DropAreaItem';
import { Button, Form, Table } from 'react-bootstrap';
import styles from './styles.module.scss';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import { IDragItem } from '../../../../common/models/editor/IDragItem';
// import { IInputText } from '../../../../common/models/editor/input/IInputText';
import { ComponentType } from '../../../../common/enums/ComponentType';
import { IButton } from '../../../../common/models/editor/IButton';

export interface IDropAreaProps {
  elements: {[key: string]: IDropItem },
  selectItem: Function;
  localUpdateElement: Function
}

export const DropArea: React.FC<IDropAreaProps> = ({ elements, selectItem, localUpdateElement }) => {
  const [items, setItems] = useState<{
    [key: string]: IDropItem
  }>(elements);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [itemType, setItemType] = useState('input');
  const [inputTextValue, setInputTextValue] = useState('');

  const onSelect = (id: string) => {
    setSelectedItem(id);
    if (id) {
      selectItem({ ...elements[id] });
    } else {
      selectItem(null);
    }
  };

  useEffect(() => {
    setItems({ ...elements });
    const itemKeys = Object.keys(elements);
    onSelect(itemKeys[itemKeys.length - 1]);
  }, [elements]);

  const moveItem = useCallback(
    (id: string, left: number, top: number) => {
      if (id) {
        onSelect(id);
        setItems(
          update(items, {
            [id]: {
              $merge: { left, top }
            }
          })
        );
      }
    },
    [items, setItems]
  );

  const getId = (type: ComponentType) => {
    const components = Object.keys(items).filter(el => items[el].componentType === type);
    return components.length + 1;
  };

  const [, drop] = useDrop(
    () => ({
      accept: ['table', 'textInput', 'button'],
      drop(item: IDragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const clientOffset = monitor.getSourceClientOffset() as XYCoord;
        const t = clientOffset.y;
        const l = clientOffset.x;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveItem(item.id, left, top);
        if (item.id) {
          localUpdateElement({ id: item.id, left, top });
        }
        let id: number;
        switch (item.type) {
          case ComponentType.input:
            setItemType(ComponentType.input);
            id = getId(ComponentType.input);
            return { name: `${ComponentType.input}${id}`, left: l, top: t };
          case ComponentType.table:
            setItemType(ComponentType.table);
            id = getId(ComponentType.table);
            return { name: `${ComponentType.table}${id}`, left: l, top: t };
          case ComponentType.button:
            setItemType(ComponentType.button);
            id = getId(ComponentType.button);
            return { name: `${ComponentType.button}${id}`, left: l, top: t };
          default:
            return undefined;
        }
      }
    }),
    [moveItem]
  );

  return (
    <div ref={drop} className="DropArea" style={{ height: '100%' }}>
      {Object.keys(items).map((key: string) => {
        const { left, top, name, componentType, width, height, component } = items[key];
        return (
          <DropAreaItem
            key={key}
            id={key}
            left={left}
            top={top}
            onSelect={onSelect}
            selectedItem={selectedItem}
            itemType={itemType}
            width={width}
            height={height}
          >
            <span
              className={
                (key === selectedItem) ? `${styles.label} ${styles.activeLabel}` : `${styles.label}`
              }
            >
              {name}
            </span>
            {
              (componentType === ComponentType.input) && (
                <Form style={{ display: 'flex', position: 'relative' }}>
                  <Form.Label
                    style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}
                  >
                    {name}
                  </Form.Label>
                  <Form.Control
                    name={key}
                    value={inputTextValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTextValue(e.target.value)}
                  />
                </Form>
              )
            }
            {
              (componentType === ComponentType.table) && (
                <Table striped bordered hover size="sm" style={{ height: '100%', width: '100%' }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td colSpan={2}>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              )
            }
            {
              (componentType === ComponentType.button) && (
                <Button
                  as="input"
                  type="button"
                  onClick={() => false}
                  value={(component as IButton).text ? (component as IButton).text : 'Submit'}
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: (component as IButton).color ? (component as IButton).color : 'red'
                  }}
                />
              )
            }
          </DropAreaItem>
        );
      })}
    </div>
  );
};

export default DropArea;
