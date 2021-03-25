import React from 'react';
import { Table } from 'react-bootstrap';
import { TableHeaders } from '../../enums/TableHeaderEnum';
import { IResource } from '../../../../common/models/resources/IResource';
import ResourceItem from '../ResourceItem';

interface IProps {
  search: string;
  resources: IResource[];
  remove: (obj: { resource: IResource }) => void;
  access: boolean;
}
const TableContainer: React.FC<IProps> = ({
  search,
  resources,
  remove,
  access
}) => (
  <Table className="table-hover table">
    <thead>
      <tr>
        {
          Object.values(TableHeaders).map(value => <th key={value}>{value}</th>)
        }
      </tr>
    </thead>
    <tbody>
      {
        resources.map(resource => (
          resource.name.includes(search)
            ? (
              <ResourceItem access={access} resource={resource} remove={remove} key={resource.id} />
            )
            : null
        ))
      }
    </tbody>
  </Table>
);

export default TableContainer;
