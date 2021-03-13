/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Table } from 'react-bootstrap';
import { TableHeaders } from '../../enums/TableHeaderEnum';
import { CalendarEnum } from '../../enums/CalendarEnum';
import { IResource } from '../../../../common/models/resources/IResource';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteResourceRoutine, editResourseRoutine } from '../../routines';

interface IProps {
  search: string,
  resources: IResource[];
  remove: Function
  update: Function
}
const TableContainer: React.FC<IProps> = ({
  search,
  resources,
  remove,
  update
}) => (
  <Table className="table-hover table">
    <thead>
      <tr>
        {
          Object.values(TableHeaders).map(value => <th style={{ width: '180px' }} key={value}>{value}</th>)
        }
      </tr>
    </thead>
    <tbody>
      {
        resources.map(resource => (
          resource.name.includes(search)
            ? (
              <tr key={resource.id}>
                <td>{resource.name}</td>
                <td>{resource.type}</td>
                <td>{resource.dbName}</td>
                <td><Moment calendar={CalendarEnum}>{resource.createdAt}</Moment></td>
                <td><button onClick={() => remove({ resource })}>delete</button></td>
                <td><button onClick={() => update({ resource, updated: { name: `n${Math.random() * 100}` } })}>edit</button></td>
              </tr>
            )
            : null
        ))
      }
    </tbody>
  </Table>
);

const map = {
  remove: deleteResourceRoutine,
  update: editResourseRoutine
};
export default connect(null, map)(TableContainer);
