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
      <Constructor id={id} resourceId="1a5d4975-1a30-4e0c-9777-6ab3accde4b4" />
    </div>
  );
};

export default AppEditor;
