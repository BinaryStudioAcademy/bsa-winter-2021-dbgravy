import React, { FunctionComponent } from 'react';
import style from './style.module.scss';
import { IQuery } from '../../../../common/models/apps/querys';
import QueryBlock from '../QueryBlock';
import { Form } from 'react-bootstrap';

interface IProps {
    queryList:Array<IQuery>
}

const QueriesList:FunctionComponent<IProps> = ({
  queryList
}) => (
  <Form.Control as="select" multiple className={style.queriesList}>
    {
        queryList.map(query => (
          <QueryBlock
            id={query.id}
            name={query.name}
            key={query.id}
            code={query.code}
            runAutomatically={query.runAutomatically}
            showConfirm={query.showConfirm}
          />
        ))
        }
  </Form.Control>
);

export default QueriesList;
