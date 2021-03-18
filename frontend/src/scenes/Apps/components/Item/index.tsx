import React from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  Item: 'item'
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ItemProps {
  itemIcon: any,
  addElement: Function,
  itemTitle: string,
  itemDesc: string

}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface DropResult {
  name: string
}

export const Item: React.FC<ItemProps> = ({ itemIcon, itemTitle, itemDesc, addElement }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.Item,
    item: { width: '54' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      const { key, left, top }: any = dropResult;
      addElement({ [key]: { top, left, title: 'Name', type: 'text', itemType: 'textInput' } });
    }
  }));

  return (
    <div
      className={styles.item}
      ref={drag}
      // role="Item"
    >
      <span className={styles.itemIconWrp}>
        <FontAwesomeIcon icon={itemIcon} className={styles.itemIcon} />
      </span>
      <div className={styles.itemDescWrp}>
        <div className={styles.itemLabel}>{itemTitle}</div>
        <div className={styles.itemDesc}>{itemDesc}</div>
      </div>
    </div>
  );
};

export default Item;
