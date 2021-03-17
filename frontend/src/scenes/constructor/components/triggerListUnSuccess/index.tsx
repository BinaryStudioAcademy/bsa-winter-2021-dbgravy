import React, { FunctionComponent } from 'react';
import style from './style.module.scss';
import { IQuery } from '../../../../common/models/apps/querys';
import { DropdownButton } from 'react-bootstrap';
import TriggerUnSuccessBlock from '../triggerBlockUnSuccess';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITrigger } from '../../../../common/models/query/ITrigger';

interface IProps {
    queryList:Array<IQuery>
    triggerList:Array<ITrigger>|[]
}

const QueriesListForUnSuccessTriggers:FunctionComponent<IProps> = ({
  queryList,
  triggerList
}) => {
  const queries = useSelector((state: IAppState) => state.app.qur);
  return (
    <div className={style.filterWrapper}>
      <DropdownButton id="dropdown-change-success" title="search" className={style.dropMenuChange}>
        {
              queryList.map(query => {
                if (query.id !== queries.selectQuery.selectQueryId) {
                  if (triggerList.find(element => (
                    element.triggerQueryId === query.id && element.success))) {
                    return (
                      <TriggerUnSuccessBlock
                        status
                        id={query.id}
                        name={query.name}
                        key={query.id + true}
                        code={query.code}
                        runAutomatically={query.runAutomatically}
                        showConfirm={query.showConfirm}
                        triggers={query.triggers}
                      />
                    );
                  }
                  return (
                    <TriggerUnSuccessBlock
                      status
                      id={query.id}
                      name={query.name}
                      key={query.id + true}
                      code={query.code}
                      runAutomatically={query.runAutomatically}
                      showConfirm={query.showConfirm}
                      triggers={query.triggers}
                    />
                  );
                } return null;
              })
          }
      </DropdownButton>
      <ul className={style.triggerArray}>
        {
                queryList.map(query => (
                  triggerList.find(element => element.triggerQueryId === query.id && !element.success)
                    ? (
                      <li key={query.id + true}>
                        {query.name}
                      </li>
                    )
                    : null))
        }
      </ul>
    </div>
  );
};

export default QueriesListForUnSuccessTriggers;
