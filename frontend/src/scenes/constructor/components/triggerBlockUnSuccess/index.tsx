import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUnSuccessTriggersRoutine } from '../../routines';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITrigger } from '../../../../common/models/query/ITrigger';
import { Dropdown } from 'react-bootstrap';

interface IProps {
    id:string
    name:string
    code?:string
    status:boolean
    triggers:Array<ITrigger>
    showConfirm:boolean|undefined
}

const TriggerUnSuccessBlock:FunctionComponent<IProps> = ({ id, name }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const selectQuery = (): void | any => {
    if (!query.setNewUnSuccessTriggers.find(element => element.triggerQueryId === id)) {
      dispatch(setUnSuccessTriggersRoutine.trigger({
        queryId: query.selectQuery.selectQueryId,
        triggerQueryId: id,
        success: false
      }));
    } else {
      const index = query.setNewUnSuccessTriggers.findIndex(item => item.triggerQueryId === id);
      const updateNewTriggers = [...query.setNewUnSuccessTriggers];
      updateNewTriggers.splice(index, 1);
      dispatch(setUnSuccessTriggersRoutine.failure(updateNewTriggers));
    }
  };

  return (
    <Dropdown.Item href="#" onClick={selectQuery}>
      {name}
    </Dropdown.Item>
  );
};
export default TriggerUnSuccessBlock;
