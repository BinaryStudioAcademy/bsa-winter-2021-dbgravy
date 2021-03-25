import React, { FunctionComponent } from 'react';
import QueryItem from '../queryBlock';
import { DropdownButton } from 'react-bootstrap';
import { IQuery } from '../../../../common/models/apps/querys';
import style from './styles.module.scss';

interface IProps {
  queryList:Array<IQuery>
  selectedQuery: IQuery|undefined
  changeQuery:(e:string) => void
}

const QueriesList:FunctionComponent<IProps> = ({
  queryList,
  selectedQuery,
  changeQuery
}) => {
  const titleQuery = selectedQuery?.name === undefined ? 'query' : selectedQuery.name;
  return (
    <DropdownButton title={titleQuery} className={style.queryList}>
      {
      queryList.map(query => (
        <QueryItem id={query.id} name={query.name} changeQuery={changeQuery} key={query.id} />
      ))
    }
    </DropdownButton>
  );
};

export default QueriesList;
