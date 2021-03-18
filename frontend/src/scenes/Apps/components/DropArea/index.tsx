import React, { useState, useCallback, useEffect } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import update from 'immutability-helper';
import DropAreaItem from '../DropAreaItem';
import { Form } from 'react-bootstrap';
import styles from './styles.module.scss';

const ItemTypes = {
  Item: 'item'
};
// eslint-disable-next-line @typescript-eslint/naming-convention
interface DragItem {
  type: string
  id: string
  top: number
  left: number
}

export const DropArea: React.FC<any> = ({ elements, selectItem }) => {
  const [items, setItems] = useState<{
    [key: string]: {
      top: number
      left: number
      title: string,
      type: string
    }
  }>(elements);

  const [selectedItem, setSelectedItem] = useState(null);

  const onSelect = (id: any) => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.Item,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      hover(item: DragItem, monitor) {},
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const droppedItem: any = monitor.getItem();
        const clientOffset: any = monitor.getSourceClientOffset() || { x: 0, y: 0 };
        const t = clientOffset.y - droppedItem.width;
        const l = clientOffset.x;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveItem(item.id, left, top);
        return { key: `textinput${Object.keys(items).length + 1}`, left: l, top: t };
      }
    }),
    [moveItem]
  );

  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <div ref={drop} className="DropArea" role="DropArea" style={{ height: '100%' }}>
      {Object.keys(items).map((key: string) => {
        const { left, top, title, type } = items[key];
        return (
          <DropAreaItem
            key={key}
            id={key}
            left={left}
            top={top}
            onSelect={onSelect}
            selectedItem={selectedItem}
          >
            <span
              className={
                (key === selectedItem) ? `${styles.label} ${styles.activeLabel}` : `${styles.label}`
              }
            >
              {key}
            </span>
            <Form style={{ display: 'flex', position: 'relative' }}>
              <Form.Label style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>{title}</Form.Label>
              <Form.Control
                type={type}
                name={key}
              />
            </Form>
          </DropAreaItem>
        );
      })}
    </div>
  );
};

export default DropArea;
