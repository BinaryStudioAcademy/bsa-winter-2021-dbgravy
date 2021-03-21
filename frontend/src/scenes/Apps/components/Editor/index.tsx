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
  const addElement = async (element: IDropItem) => {
    setElements({ ...elements, ...element });
    setActive('inspect');
  };

  const selectItem = (item: IDropItem) => {
    setSelected(item);
  };

  return (
    <div className="mt-5 h-100" style={{ maxHeight: '50vh' }}>
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
                <Inspect selectedItem={selected} />
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
                    itemType="input"
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
