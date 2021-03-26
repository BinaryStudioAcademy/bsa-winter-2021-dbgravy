import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { ComponentType } from '../../../../common/enums/ComponentType';
import styles from './styles.module.scss';

const style: CSSProperties = {
  position: 'absolute',
  backgroundColor: 'white',
  cursor: 'move',
  display: 'flex',
  alignItems: 'center'
};
export interface IDropAreaItemProps {
  id: string
  left: number
  top: number,
  onSelect: Function,
  selectedItem: string | null,
  itemType: string,
  width: string | number,
  height: string | number
}

export const DropAreaItem: React.FC<IDropAreaItemProps> = ({
  id,
  left,
  top,
  children,
  onSelect,
  selectedItem,
  itemType,
  width,
  height
}) => {
  let w = width;
  let h = height;
  if (itemType === ComponentType.table && w === 0) {
    w = 'auto';
  }
  if (itemType === ComponentType.table && height === 0) {
    h = 'auto';
  }

  const [, drag] = useDrag(
    () => ({
      type: itemType,
      item: { id, left, top },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [id, left, top]
  );

  return (
    <div
      ref={drag}
      style={{ ...style, left, top, width: w, height: h }}
      role="presentation"
      onClick={() => onSelect(id)}
      className={(selectedItem === id) ? `${styles.active}` : ''}
    >
      {children}
    </div>
  );
};

export default DropAreaItem;
