import React from 'react';
import styles from './styles.module.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from '../../components/Editor';
import Constructor from '../../../constructor/containers';
import { useParams } from 'react-router';
import { IFetchParams } from '../../../../common/models/fetch/IFetchParams';

const AppEditor: React.FC<any> = () => {
  const { id }: IFetchParams = useParams();
  return (
    <div className={styles.appEditor}>
      <DndProvider backend={HTML5Backend}>
        <Editor appId={id} />
      </DndProvider>
      <Constructor id={id} />
    </div>
  );
};

export default AppEditor;
