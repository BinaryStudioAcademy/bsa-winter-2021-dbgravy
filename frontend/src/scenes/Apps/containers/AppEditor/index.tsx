import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from '../../components/Editor';
import Constructor from '../../../constructor/containers';
import { useParams } from 'react-router';
import { IFetchParams } from '../../../../common/models/fetch/IFetchParams';
import { fetchResourceRoutine } from '../../../Resources/routines';
import { connect } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import Header from '../../../../components/Header';
import appStyles from '../../styles.module.scss';
import { Link } from 'react-router-dom';

interface IProps {
  resources: any,
  fetchResources: () => void
}

const AppEditor: React.FC<IProps> = ({ resources, fetchResources }) => {
  const { id }: IFetchParams = useParams();
  useEffect(() => {
    fetchResources();
  }, []);
  return (
    <div className={appStyles['apps-wrp']}>
      <Header />
      {
        (resources.length === 0) ? (
          <div className="container mt-5">
            <div>
              No resources.
              {' '}
              <Link to="/resources/edit">Create new</Link>
            </div>
          </div>
        ) : (
          <div className={styles.appEditor}>
            <DndProvider backend={HTML5Backend}>
              <Editor appId={id} />
            </DndProvider>
            <Constructor id={id} />
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  resources: rootState.resource.resources
});

const mapDispatchToProps = {
  fetchResources: fetchResourceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AppEditor);
