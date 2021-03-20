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
  updateElement: Function
}

export const DropArea: React.FC<IDropAreaProps> = ({ elements, selectItem, updateElement }) => {
  const [items, setItems] = useState<{
    [key: string]: IDropItem
  }>(elements);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [itemType, setItemType] = useState('input');
  const [inputTextValue, setInputTextValue] = useState('');

  const onSelect = (id: string) => {
    setSelectedItem(id);
    selectItem(elements[id]);
    setItemType(elements[id].componentType);
  };

  useEffect(() => {
    setItems({ ...items, ...elements });
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
      accept: ['table', 'input', 'button'],
      drop(item: IDragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const clientOffset = monitor.getSourceClientOffset() as XYCoord;
        const t = clientOffset.y;
        const l = clientOffset.x;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveItem(item.id, left, top);
        if (item.id) {
          updateElement({ id: item.id, left, top });
        }
        switch (item.type) {
          case 'input':
            setItemType('input');
            return { key: 'input', left: l, top: t };
          case 'table':
            setItemType('table');
            return { key: 'table', left: l, top: t };
          case 'button':
            setItemType('button');
            return { key: 'button', left: l, top: t };
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
              {componentType}
            </span>
            {
              (componentType === 'input') && (
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
