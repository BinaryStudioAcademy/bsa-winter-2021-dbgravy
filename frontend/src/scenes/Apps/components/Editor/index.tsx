import React, { useState, memo } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines, faTable } from '@fortawesome/free-solid-svg-icons';
import Item from '../Item';
import DropArea from '../DropArea';
import Inspect from '../Inspect';

const Editor: React.FC = memo(() => {
  const [active, setActive] = useState('insert');
  const [elements, setElements] = useState({});
  const [selected, setSelected] = useState(null);
  const addElement = async (element: any) => {
    setElements({ ...elements, ...element });
    setActive('inspect');
  };

  const selectItem = (item: any) => {
    setSelected(item);
  };

  return (
    <div className="mt-5 h-100 mb-5" style={{ maxHeight: '50vh' }}>
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
                  />
                  <div
                    className={styles.item}
                  >
                    <span className={styles.itemIconWrp}>
                      <FontAwesomeIcon icon={faTable} className={styles.itemIcon} />
                    </span>
                    <div className={styles.itemDescWrp}>
                      <div className={styles.itemLabel}>Table</div>
                      <div className={styles.itemDesc}>Display tabular data with pagination.</div>
                    </div>
                  </div>
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
