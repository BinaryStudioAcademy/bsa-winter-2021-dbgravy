import React from 'react';
import styles from './styles.module.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from '../../components/Editor';
import Constructor from '../../../constructor/containers';
import { useParams } from 'react-router';

const AppEditor: React.FC<any> = () => {
  const { id }:any = useParams();
  return (
    <div className={styles.appEditor}>
      <DndProvider backend={HTML5Backend}>
        <Editor />
      </DndProvider>
      <Constructor id={id} resourceId="27544918-2829-4982-8887-0f6375ad6cd3" />
    </div>
  );
};

export default AppEditor;
