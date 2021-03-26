import React, { memo, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Constructor from '../../../constructor/containers';
import Item from '../Item';
import DropArea from '../DropArea';
import Inspect from '../Inspect';
import { faGripLines, faTable, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import { connect } from 'react-redux';
import {
  fetchEditorComponentsRoutine,
  addComponentRoutine,
  updateComponentRoutine,
  localUpdateComponentRoutine,
  deleteComponentRoutine
} from '../../routines';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ComponentType } from '../../../../common/enums/ComponentType';
import { IQueryState } from '../../../../common/models/query/IQueryState';

interface IEditorProps {
  appId: string,
  showBottom: boolean,
  components: {[key: string]: IDropItem },
  fetchComponents: (payload: { appId: string }) => void,
  addComponent: (payload: { appId: string, component: IDropItem }) => void,
  updateComponent: (payload: { appId: string, component: IDropItem }) => void,
  localUpdateComponent: (payload: { component: {id: string, left: number, top: number} }) => void,
  deleteComponent: (payload: { appId: string, id: string }) => void,
  show: boolean,
  locals: string[]
  query:IQueryState,
}
const Editor: React.FC<IEditorProps> = memo(
  ({
    appId,
    showBottom,
    components,
    fetchComponents,
    addComponent,
    updateComponent,
    deleteComponent,
    locals,
    query,
    show
  }) => {
    const [active, setActive] = useState<'inspect' | 'insert'>('insert');
    const [selected, setSelected] = useState<IDropItem | null>(null);

    useEffect(() => {
      fetchComponents({ appId });
    }, []);
    const addElement = (component: IDropItem) => {
      addComponent({ appId, component });
      setActive('inspect');
    };

    const selectItem = (item: IDropItem) => {
      setSelected(item);
      setActive('inspect');
    };
    const editItem = (component: IDropItem) => {
      if (!component.component) {
        const newComponent: IDropItem = {
          ...components[component.id],
          left: component.left,
          top: component.top
        };
        updateComponent({ appId, component: newComponent });
      } else {
        updateComponent({ appId, component });
      }
    };

    const deleteItem = (id: string) => {
      deleteComponent({ appId, id });
      setSelected(null);
    };

    return (
      <div className={styles.editorBody}>
        <div className={styles.splitPane}>
          <div className={styles.paneVerticalLeft}>
            <div>
              <div className={styles.paneHorizontal}>
                <div className={`${styles.dropArea} dropArea`}>
                  <DropArea
                    elements={components}
                    selectItem={selectItem}
                    localUpdateElement={editItem}
                    appId={appId}
                  />
                </div>
                {showBottom
                  ? (
                    <div className={styles.constructorArea}>
                      <Constructor id={appId} locals={locals} query={query} />
                    </div>
                  )
                  : null}
              </div>
            </div>
          </div>
          { show ? (
            <div className={styles.paneVerticalRight}>
              <div className="h-100" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <div className="d-flex h-100 flex-wrap">
                  <div className={styles.sidebarWrp}>
                    <div className={styles.navbarTop}>
                      <button
                        type="button"
                        className={(active === 'inspect')
                          ? `${styles.navbarTopItem} ${styles.active}` : styles.navbarTopItem}
                        onClick={() => setActive('inspect')}
                      >
                        Inspect
                      </button>
                      <button
                        type="button"
                        className={(active === 'insert')
                          ? `${styles.navbarTopItem} ${styles.active}` : styles.navbarTopItem}
                        onClick={() => setActive('insert')}
                      >
                        Insert
                      </button>
                    </div>
                    <div className={styles.content}>
                      {
                        (active === 'inspect') && (
                          <Inspect
                            selectedItem={selected}
                            editComponent={editItem}
                            deleteComponent={deleteItem}
                          />
                        )
                      }
                      {
                        (active === 'insert') && (
                          <div style={{ width: '100%' }}>
                            <Item
                              appId={appId}
                              itemIcon={faGripLines}
                              itemTitle="Text Input"
                              itemDesc="Control other components or queries with text."
                              addElement={addElement}
                              itemType={ComponentType.input}
                            />
                            <Item
                              appId={appId}
                              itemIcon={faTable}
                              itemTitle="Table"
                              itemDesc="Display tabular data with pagination."
                              addElement={addElement}
                              itemType={ComponentType.table}
                            />
                            <Item
                              appId={appId}
                              itemIcon={faWindowMinimize}
                              itemTitle="Button"
                              itemDesc="Trigger actions like run queries."
                              addElement={addElement}
                              itemType={ComponentType.button}
                            />
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
            : null}
        </div>
      </div>
    );
  }
);

Editor.defaultProps = {
  components: {}
};

const mapStateToProps = (rootState: IAppState) => ({
  components: rootState.app.editor.components,
  locals: Object.keys(rootState.app.editor.locals)
});

const mapDispatchToProps = {
  fetchComponents: fetchEditorComponentsRoutine,
  addComponent: addComponentRoutine,
  updateComponent: updateComponentRoutine,
  localUpdateComponent: localUpdateComponentRoutine,
  deleteComponent: deleteComponentRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
