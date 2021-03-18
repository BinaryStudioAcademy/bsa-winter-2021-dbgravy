import React, { FunctionComponent } from 'react';
import style from './style.module.scss';
import { IQuery } from '../../../../common/models/apps/querys';
import { DropdownButton } from 'react-bootstrap';
import TriggerBlock from '../triggerBlock';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITrigger } from '../../../../common/models/query/ITrigger';
import SpanCloseComponent from '../closeSpanComponent';

interface IProps {
    queryList:Array<IQuery>
    triggerList:Array<ITrigger>|[]
    status: boolean
}

const QueriesListForTriggers:FunctionComponent<IProps> = ({
  queryList,
  triggerList,
  status
}) => {
  const queries = useSelector((state: IAppState) => state.app.qur);
  return (
    <div className={style.filterWrapper}>
      <DropdownButton id="dropdown-change" title="search" className={style.dropMenuChange}>
        {
              queryList.map(query => {
                if (query.id !== queries.selectQuery.selectQueryId) {
                  if (triggerList.find(element => (
                    element.triggerQueryId === query.id && element.success === status))) {
                    return (
                      <TriggerBlock
                        status
                        id={query.id}
                        name={query.name}
                        key={query.id + status}
                        code={query.code}
                        runAutomatically={query.runAutomatically}
                        showConfirm={query.showConfirm}
                        triggers={query.triggers}
                      />
                    );
                  }
                  return (
                    <TriggerBlock
                      status
                      id={query.id}
                      name={query.name}
                      key={query.id + status}
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
                  triggerList.find(element => element.triggerQueryId === query.id && element.success === status)
                    ? (
                      <li key={query.id + status}>
                        {query.name}
                        <SpanCloseComponent id={query.id} status={status} />
                      </li>
                    )
                    : null))
        }
      </ul>
    </div>
  );
};

export default QueriesListForTriggers;
