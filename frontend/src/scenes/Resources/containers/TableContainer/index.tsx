import React from 'react';
import { Table } from 'react-bootstrap';
import { TableHeaders } from '../../enums/TableHeaderEnum';
import { IResource } from '../../../../common/models/resources/IResource';

interface IProps {
  resources: IResource[];
}
const TableContainer: React.FC<IProps> = ({
  resources
}) => {
  console.log('kkk');
  return (
    <Table className="table table-hover">
      <thead>
        <tr>
          {
            Object.values(TableHeaders).map(value => <th>{value}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          resources.map(resource => (
            <tr key={resource.id}>
              <td>{resource.name}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};
export default TableContainer;
