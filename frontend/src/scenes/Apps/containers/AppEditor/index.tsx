import React from 'react';
import styles from './styles.module.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from '../../components/Editor';

const AppEditor: React.FC<any> = () => (
  <div className={styles.appEditor}>
    <DndProvider backend={HTML5Backend}>
      <Editor />
    </DndProvider>
    <div style={{ height: '500px', width: '100%', background: 'skyblue' }} />
  </div>
);

export default AppEditor;
