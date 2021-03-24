import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewResourcesRoutine, takeResourcesTableAndColumns } from '../../routines';
import { Dropdown } from 'react-bootstrap';
import { IAppState } from '../../../../common/models/store/IAppState';

interface IProps {
    id:string
    name:string,
    onChangeResource: Function
}

const ResourceBlock:FunctionComponent<IProps> = ({ id, name, onChangeResource }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const selectQuery = (): any => {
    dispatch(setNewResourcesRoutine.trigger(id));
    if (id !== query.setNewResource?.id) {
      dispatch(takeResourcesTableAndColumns.trigger(query.resources.find(element => element.id === id)));
    }
    onChangeResource(id);
  };

  return (
    <Dropdown.Item href="#" onClick={selectQuery}>
      {name}
    </Dropdown.Item>
  );
};
export default ResourceBlock;
