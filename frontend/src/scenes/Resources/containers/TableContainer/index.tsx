import React from 'react';
import { Table } from 'react-bootstrap';
import { TableHeaders } from '../../enums/TableHeaderEnum';
import { CalendarEnum } from '../../enums/CalendarEnum';
import { IResource } from '../../../../common/models/resources/IResource';
import Moment from 'react-moment';

interface IProps {
  search: string,
  resources: IResource[];
}
const TableContainer: React.FC<IProps> = ({
  search,
  resources
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
              </tr>
            )
            : null
        ))
      }
    </tbody>
  </Table>
);
export default TableContainer;
