import React, { memo, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Item from '../Item';
import DropArea from '../DropArea';
import Inspect from '../Inspect';
import { faGripLines, faTable, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { IDropItem } from '../../../../common/models/editor/IDropItem';
import { connect } from 'react-redux';
import {
  addComponentRoutine,
  deleteComponentRoutine,
  fetchEditorComponentsRoutine,
  updateComponentRoutine
} from '../../routines';
import { IAppState } from '../../../../common/models/store/IAppState';
import { IUpdateComponent } from '../../../../common/models/editor/IUpdateComponent';
import { ComponentType } from '../../../../common/enums/ComponentType';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';

interface IEditorProps {
  appId: string,
  components: {[key: string]: IDropItem },
  fetchComponents: (payload: { appId: string }) => void,
  addComponent: (payload: { appId: string, component: IDropItem }) => void,
  updateComponent: (payload: { appId: string, component: IUpdateComponent }) => void,
  deleteComponent: IBindingCallback1<string>,
  show:boolean
}

const Editor: React.FC<IEditorProps> = memo(
  ({ appId, components, fetchComponents, addComponent, updateComponent, deleteComponent, show }) => {
    useEffect(() => {
      fetchComponents({ appId });
    }, []);

    const [active, setActive] = useState<'inspect' | 'insert'>('insert');
    const [selected, setSelected] = useState<IDropItem | null>(null);
    const addElement = (component: IDropItem) => {
      addComponent({ appId, component });
    };

    const updateElement = (component: IUpdateComponent) => {
      updateComponent({ appId, component });
    };
    const selectItem = (item: IDropItem) => {
      setSelected(item);
      setActive('inspect');
    };

    return (
      <div className="h-100">
        <div className="d-flex h-100 flex-wrap">
          <div className={`${styles.dropArea} dropArea`}>
            <DropArea
              elements={components}
              selectItem={selectItem}
              updateElement={updateElement}
              appId={appId}
            />
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
                    <Inspect selectedItem={selected} deleteComponent={deleteComponent} />
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

Editor.defaultProps = {
  components: {}
};

const mapStateToProps = (rootState: IAppState) => ({
  components: rootState.app.editor.components
});

const mapDispatchToProps = {
  fetchComponents: fetchEditorComponentsRoutine,
  addComponent: addComponentRoutine,
  updateComponent: updateComponentRoutine,
  deleteComponent: deleteComponentRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
