import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import styles from './styles.module.scss';

const style: CSSProperties = {
  position: 'absolute',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move'
};

const ItemTypes = {
  Item: 'item'
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface DropAreaItemProps {
  id: any
  left: number
  top: number,
  onSelect: Function,
  selectedItem: any
}

export const DropAreaItem: React.FC<DropAreaItemProps> = ({
  id,
  left,
  top,
  children,
  onSelect,
  selectedItem
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Item,
      item: { id, left, top },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [id, left, top]
  );

  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    // eslint-disable-next-line
    <div ref={drag} style={{ ...style, left, top }} role="Item" onClick={() => onSelect(id)} className={ (selectedItem === id) ? `${styles.active}` : '' }>
      {children}
    </div>
  );
};

export default DropAreaItem;
