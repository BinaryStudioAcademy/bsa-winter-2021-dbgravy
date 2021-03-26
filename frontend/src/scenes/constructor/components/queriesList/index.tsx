import React, { FunctionComponent } from 'react';
import style from './style.module.scss';
import { IQuery } from '../../../../common/models/apps/querys';
import QueryBlock from '../QueryBlock';
import { Form } from 'react-bootstrap';

interface IProps {
    queryList:Array<IQuery>,
    search:string
}

const QueriesList:FunctionComponent<IProps> = ({
  queryList,
  search
}) => (
  <Form.Control as="select" multiple className={style.queriesList}>
    {
      queryList.map(query => (
        query.name.toLowerCase().includes(search.trim().toLowerCase())
          ? (
            <QueryBlock
              id={query.id}
              name={query.name}
              key={query.id}
              resourceId={query.resourceId}
              code={query.code}
              showConfirm={query.showConfirm}
              triggers={query.triggers}
            />
          )
          : null
      ))
    }
  </Form.Control>
);

export default QueriesList;
