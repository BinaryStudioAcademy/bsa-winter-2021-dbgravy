import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { setNewResourcesRoutine } from '../../routines';
import { Dropdown } from 'react-bootstrap';

interface IProps {
    id:string
    name:string
}

const ResourceBlock:FunctionComponent<IProps> = ({ id, name }) => {
  const dispatch = useDispatch();
  const selectQuery = (): void | any => {
    dispatch(setNewResourcesRoutine.trigger(id));
  };

  return (
    <Dropdown.Item href="#" onClick={selectQuery}>
      {name}
    </Dropdown.Item>
  );
};
export default ResourceBlock;
