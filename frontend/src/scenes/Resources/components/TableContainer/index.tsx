import React from 'react';
import { Table } from 'react-bootstrap';
import { TableHeaders } from '../../enums/TableHeaderEnum';
import { IResource } from '../../../../common/models/resources/IResource';
import ResourceItem from '../ResourceItem';

interface IProps {
  search: string;
  resources: IResource[];
  remove: (obj: { resource: IResource }) => void;
  edit: (obj: { resource: IResource }) => void;
}
const TableContainer: React.FC<IProps> = ({
  search,
  resources,
  remove,
  edit
}) => (
  <Table className="table-hover table">
    <thead>
      <tr>
        {
          Object.values(TableHeaders).map(value => <th style={{ width: '300px' }} key={value}>{value}</th>)
        }
        <th> </th>
      </tr>
    </thead>
    <tbody>
      {
        resources.map(resource => (
          resource.name.includes(search)
            ? (
              <ResourceItem resource={resource} remove={remove} edit={edit} key={resource.id} />
            )
            : null
        ))
      }
    </tbody>
  </Table>
);

export default TableContainer;
