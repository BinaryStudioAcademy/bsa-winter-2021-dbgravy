import React, { FunctionComponent } from 'react';
import { IQuery } from '../../../../common/models/apps/querys';
import { IComponent } from '../../../../common/models/editor/IDropItem';
import TableComponent from '../../../../components/TableComponent';
import { Table } from 'react-bootstrap';

interface IProps {
  selectItem:IComponent
  queryList: Array<IQuery>
}

const TableData:FunctionComponent<IProps> = ({
  queryList,
  selectItem
}) => {
  const searchSelectQuery:IQuery|undefined = queryList.find(elem => elem.id === selectItem?.queryId);
  const dataName = searchSelectQuery?.data !== undefined ? Object.keys(searchSelectQuery?.data[0])
    : ['#', 'FirstName', 'LastName', 'UserName'];
  return (
    searchSelectQuery?.data
      ? (
        <TableComponent
          values={searchSelectQuery.data}
          columnWidth={300}
          rowHeight={70}
        />
      ) : (
        <Table bordered hover size="sm" style={{ height: '100%', width: '100%' }}>
          <thead>
            <tr>
              {
                  dataName.map(name => <th key={name}>{name}</th>)
                }
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      )

  );
};

export default TableData;
