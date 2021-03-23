import React, { memo, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Item from '../Item';
import DropArea from '../DropArea';
import Inspect from '../Inspect';
import { faGripLines, faTable, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import { connect } from 'react-redux';
import { fetchEditorComponentsRoutine, addComponentRoutine, updateComponentRoutine } from '../../routines';
import { IAppState } from '../../../../common/models/store/IAppState';
import { IUpdateComponent } from '../../../../common/models/editor/IUpdateComponent';
import { ComponentType } from '../../../../common/enums/ComponentType';
interface IEditorProps {
  appId: string,
  components: {[key: string]: IDropItem },
  fetchComponents: (payload: { appId: string }) => void,
  addComponent: (payload: { appId: string, component: IDropItem }) => void,
  updateComponent: (payload: { appId: string, component: IUpdateComponent }) => void
  show:boolean
}
const Editor: React.FC<IEditorProps> = memo(
  ({ appId, components, fetchComponents, addComponent, updateComponent, show }) => {
    const [active, setActive] = useState<'inspect' | 'insert'>('insert');
    const [elements, setElements] = useState({});
    const [selected, setSelected] = useState<IDropItem | null>(null);

    const addElement = (component: IDropItem) => {
      setElements({ ...elements, ...component });
      addComponent({ appId, component });
      setActive('inspect');
    };

    const selectItem = (item: IDropItem) => {
      setSelected(item);
      setActive('inspect');
    };

    const editItem = (component: IDropItem, elementId: string, isEditingId: boolean) => {
      updateComponent({ appId, component });
      const newElements: {[key: string]: IDropItem } = { ...elements };
      newElements[elementId] = component;
      if (isEditingId) {
        delete newElements[component.id];
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
            <DropArea elements={elements} selectItem={selectItem} updateElement={editItem}/>
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
          { show ? (
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
                        itemType={ComponentType.input}
                      />
                      <Item
                        itemIcon={faTable}
                        itemTitle="Table"
                        itemDesc="Display tabular data with pagination."
                        addElement={addElement}
                        itemType={ComponentType.table}
                      />
                      <Item
                        itemIcon={faWindowMinimize}
                        itemTitle="Button"
                        itemDesc="Trigger actions like run queries."
                        addElement={addElement}
                        itemType={ComponentType.button}
                      />
                    </>
                  )
                }
              </div>
            </div>
          )
            : null}
        </div>
      </div>
    );
  }
);

const mapStateToProps = (rootState: IAppState) => ({
  components: rootState.app.editor.components
});

const mapDispatchToProps = {
  fetchComponents: fetchEditorComponentsRoutine,
  addComponent: addComponentRoutine,
  updateComponent: updateComponentRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
