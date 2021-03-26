import React, { useState, useCallback, useEffect } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import update from 'immutability-helper';
import DropAreaItem from '../DropAreaItem';
import styles from './styles.module.scss';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import { IDragItem } from '../../../../common/models/editor/IDragItem';
import { IInputText } from '../../../../common/models/editor/IInputText';
import { ComponentType } from '../../../../common/enums/ComponentType';
import { IButton } from '../../../../common/models/editor/IButton';
import InputComponent from '../../containers/InputComponent';
import TableData from '../tableDATA';
import { IQuery } from '../../../../common/models/apps/querys';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import ButtonComponent from '../ButtonComponent';

export interface IDropAreaProps {
  elements: {[key: string]: IDropItem },
  selectItem: Function;
  localUpdateElement: Function;
  appId:string;
}

export const DropArea: React.FC<IDropAreaProps> = ({ elements, selectItem, localUpdateElement, appId }) => {
  const queries: Array<IQuery> = useSelector((state: IAppState) => state.app.qur.queriesApp);
  const [items, setItems] = useState<{
    [key: string]: IDropItem
  }>(elements);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [itemType, setItemType] = useState('input');
  const onSelect = (id: string) => {
    setSelectedItem(id);
    if (id) {
      selectItem({ ...elements[id] });
      setItemType(elements[id].componentType);
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
    <div ref={drop} style={{ height: '100%', overflowY: 'auto', minHeight: '94vh' }}>
      {Object.keys(items).map((key: string) => {
        const { left, top, name, componentType, width, height, component, id } = items[key];
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
                <InputComponent component={component as IInputText} id={id} />
              )
            }
            {
              (componentType === ComponentType.table) && (
                <TableData selectItem={component} queryList={queries} />
              )
            }
            {
              (componentType === ComponentType.button) && (
              <ButtonComponent component={(component as IButton)} id={appId} />
              )
            }
          </DropAreaItem>
        );
      })}
    </div>
  );
};

export default DropArea;
