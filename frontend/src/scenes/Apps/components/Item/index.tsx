import React from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrag } from 'react-dnd';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ComponentType } from '../../../../common/enums/ComponentType';

export interface IItemProps {
  itemIcon: IconDefinition,
  appId: string,
  addElement: Function,
  itemTitle: string,
  itemDesc: string,
  itemType: ComponentType
}

interface IDropResult {
  name: string,
  left: string,
  top: string
}

export const Item: React.FC<IItemProps> = ({ appId, itemIcon, itemTitle, itemDesc, addElement, itemType }) => {
  const [, drag] = useDrag(() => ({
    type: itemType,
    item: { type: itemType },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<IDropResult>();
      if (dropResult) {
        const { left, top, name } = dropResult;
        switch (itemType) {
          case ComponentType.input:
            addElement({
              appId,
              component: {
                top,
                left,
                name,
                width: '300',
                height: '60',
                componentType: ComponentType.input,
                component: {
                  type: 'text',
                  label: 'Name',
                  defaultValue: '',
                  placeholder: ''
                }
              }
            });
            break;
          case ComponentType.table:
            addElement({
              appId,
              component: {
                top,
                left,
                name,
                height: '400',
                width: '600',
                componentType: ComponentType.table,
                component: {
                  queryId: null
                }
              }
            });
            break;
          case ComponentType.button:
            addElement({
              appId,
              component: {
                top,
                left,
                name,
                height: '60',
                width: '200',
                componentType: ComponentType.button,
                component: {
                  text: 'Select',
                  color: 'blue'
                }
              }
            });
            break;
          default:
            break;
        }
      }
    }
  }));

  return (
    <div
      className={styles.item}
      ref={drag}
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
