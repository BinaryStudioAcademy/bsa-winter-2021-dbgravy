import React from 'react';
import { Table } from 'react-bootstrap';
import { TableHeaders } from '../../enums/TableHeaderEnum';
import { CalendarEnum } from '../../enums/CalendarEnum';
import { IResource } from '../../../../common/models/resources/IResource';
import Moment from 'react-moment';

interface IProps {
  resources: IResource[];
}
const TableContainer: React.FC<IProps> = ({
  resources
}) => (
  <Table className="table table-hover">
    <thead>
      <tr>
        {
          Object.values(TableHeaders).map(value => <th key={value}>{value}</th>)
        }
      </tr>
    </thead>
    {resources.length !== 0 ? (
      <tbody>
        {
          resources.map(resource => (
            <tr key={resource.id}>
              <td>{resource.name}</td>
              <td>{resource.type}</td>
              <td>{resource.dbName}</td>
              <td><Moment calendar={CalendarEnum}>{resource.createdAt}</Moment></td>
            </tr>
          ))
        }
      </tbody>
    )
      : null}
  </Table>
);
export default TableContainer;
