import React, { useState, useCallback, useEffect } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import update from 'immutability-helper';
import DropAreaItem from '../DropAreaItem';
import { Button, Form, Table } from 'react-bootstrap';
import styles from './styles.module.scss';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import { IDragItem } from '../../../../common/models/editor/IDragItem';
import { IInputText } from '../../../../common/models/editor/IInputText';

export interface IDropAreaProps {
  elements: {[key: string]: IDropItem },
  selectItem: Function;
}

export const DropArea: React.FC<IDropAreaProps> = ({ elements, selectItem }) => {
  const [items, setItems] = useState<{
    [key: string]: IDropItem
  }>(elements);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [itemType, setItemType] = useState('');
  const [inputTextValue, setInputTextValue] = useState('');

  const onSelect = (id: string) => {
    setSelectedItem(id);
    selectItem(elements[id]);
  };

  useEffect(() => {
    setItems({ ...items, ...elements });
    const itemKeys = Object.keys(elements);
    onSelect(itemKeys[itemKeys.length - 1]);
    selectItem(elements[itemKeys[itemKeys.length - 1]]);
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
        const number = Object.entries(items)
          .filter(([key, value]) => {
            if (value.componentType === item.type) return true;
            return false;
          }).length;
        switch (item.type) {
          case 'textInput':
            setItemType('textInput');
            return { key: `textinput${number + 1}`, left: l, top: t };
          case 'table':
            setItemType('table');
            return { key: `table${number + 1}`, left: l, top: t };
          case 'button':
            setItemType('button');
            return { key: `button${number + 1}`, left: l, top: t };
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
        const { left, top, title, componentType, width, height, component } = items[key];
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
              {key}
            </span>
            {
              (componentType === 'textInput') && (
                <Form style={{ display: 'flex', position: 'relative' }}>
                  <Form.Label
                    style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}
                  >
                    {title}
                  </Form.Label>
                  <Form.Control
                    type={(component as IInputText).type}
                    name={key}
                    value={inputTextValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTextValue(e.target.value)}
                  />
                </Form>
              )
            }
            {
              (componentType === 'table') && (
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
              (componentType === 'button') && (
                <Button
                  as="input"
                  type="button"
                  onClick={() => false}
                  value="Submit"
                  style={{ height: '100%', width: '100%' }}
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
