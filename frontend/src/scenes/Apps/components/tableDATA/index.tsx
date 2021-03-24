import React, { FunctionComponent } from 'react';
import { Table } from 'react-bootstrap';
import { IQuery } from '../../../../common/models/apps/querys';
import { IComponent } from '../../../../common/models/editor/IDropItem';

interface IProps {
  selectItem:IComponent
  queryList: Array<IQuery>
}

const TableData:FunctionComponent<IProps> = ({
  queryList,
  selectItem
}) => {
  const searchSelectQuery:IQuery|undefined = queryList.find(elem => elem.id === selectItem?.queryId);
  const dataName = searchSelectQuery?.data !== undefined ? Object.keys(searchSelectQuery?.data[0]) : ['name', 'age'];
  return (
    <Table striped bordered hover size="sm" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
      <thead>
        <tr>
          {
            dataName.map(name => <th>{name}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          searchSelectQuery?.data
            ? searchSelectQuery?.data.map((elem:{[key:string]:string|number}) => (
              <tr>
                {
              (Object.values(elem)).map(item => <td>{item}</td>)
            }
              </tr>
            )) : null
      }
      </tbody>
    </Table>
  );
};

export default TableData;
