import React, { FunctionComponent } from 'react';
import { IQuery } from '../../../../common/models/apps/querys';
import QueryItem from '../QueryBlock';
import { DropdownButton } from 'react-bootstrap';

interface IProps {
  queryList:Array<IQuery>,
  selectedQuery:IQuery|undefined,
  changeQuery:(e:string) => void
}

const QueriesList:FunctionComponent<IProps> = ({
  queryList,
  selectedQuery,
  changeQuery
}) => {
  const titleQuery = selectedQuery?.name === undefined ? 'query' : selectedQuery.name;
  return (
    <DropdownButton title={titleQuery}>
      {
      queryList.map(query => (
        <QueryItem id={query.id} name={query.name} changeQuery={changeQuery} />
      ))
    }
    </DropdownButton>
  );
};

export default QueriesList;
