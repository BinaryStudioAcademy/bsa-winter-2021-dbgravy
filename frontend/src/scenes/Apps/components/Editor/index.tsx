import React, { useState, memo } from 'react';
import styles from './styles.module.scss';
import Item from '../Item';
import DropArea from '../DropArea';
import Inspect from '../Inspect';
import { faGripLines, faTable, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { IDropItem } from '../../../../common/models/editor/IDropItem';

const Editor: React.FC = memo(() => {
  const [active, setActive] = useState('insert');
  const [elements, setElements] = useState({});
  const [selected, setSelected] = useState<IDropItem | null>(null);
  const addElement = (element: IDropItem) => {
    setElements({ ...elements, ...element });
    setActive('inspect');
  };
  const selectItem = (item: IDropItem) => {
    setSelected(item);
  };

  const editItem = (element: IDropItem, elementId: string, isEditingId: boolean) => {
    const newElements: {[key: string]: IDropItem } = { ...elements };
    newElements[elementId] = element;
    if (isEditingId) {
      delete newElements[element.id];
    }
    setElements({ ...newElements });
  };

  const deleteItem = (id: string) => {
    const newElements: {[key: string]: IDropItem } = { ...elements };
    delete newElements[id];
    setElements({ ...newElements });
    setSelected(null);
  };

  return (
    <div className="h-100" style={{ maxHeight: '50vh' }}>
      <div className="d-flex h-100 flex-wrap">
        <div className={`${styles.dropArea} dropArea`}>
          <DropArea elements={elements} selectItem={selectItem} />
        </div>
        <div className={styles.sidebarWrp}>
          <div className={styles.navbarTop}>
            <button
              type="button"
              className={(active === 'inspect') ? `${styles.navbarTopItem} ${styles.active}` : styles.navbarTopItem}
              onClick={() => setActive('inspect')}
            >
              Inspect
            </button>
            <button
              type="button"
              className={(active === 'insert') ? `${styles.navbarTopItem} ${styles.active}` : styles.navbarTopItem}
              onClick={() => setActive('insert')}
            >
              Insert
            </button>
          </div>
          <div className={styles.content}>
            {
              (active === 'inspect') && (
                <Inspect selectedItem={selected} editItem={editItem} deleteItem={deleteItem} />
              )
            }
            {
              (active === 'insert') && (
                <>
                  <Item
                    itemIcon={faGripLines}
                    itemTitle="Text Input"
                    itemDesc="Control other components or queries with text."
                    addElement={addElement}
                    itemType="textInput"
                  />
                  <Item
                    itemIcon={faTable}
                    itemTitle="Table"
                    itemDesc="Display tabular data with pagination."
                    addElement={addElement}
                    itemType="table"
                  />
                  <Item
                    itemIcon={faWindowMinimize}
                    itemTitle="Button"
                    itemDesc="Trigger actions like run queries."
                    addElement={addElement}
                    itemType="button"
                  />
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
});

export default Editor;
