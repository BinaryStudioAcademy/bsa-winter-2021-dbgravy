import React, { FunctionComponent } from 'react';
import { Dropdown } from 'react-bootstrap';

interface IProps {
  id:string,
  name:string,
  changeQuery:(e:string) => void
}

const QueryItem:FunctionComponent<IProps> = ({
  id, name, changeQuery }) => {
  const selectQuery = ():void|any => {
    changeQuery(id);
  };
  return (
    <Dropdown.Item href="#" onClick={selectQuery}>
      {name}
    </Dropdown.Item>
  );
};

export default QueryItem;
