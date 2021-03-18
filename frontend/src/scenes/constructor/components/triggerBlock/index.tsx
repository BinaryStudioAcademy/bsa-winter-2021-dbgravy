import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccessTriggersRoutine } from '../../routines';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITrigger } from '../../../../common/models/query/ITrigger';
import { Dropdown } from 'react-bootstrap';

interface IProps {
    id:string
    name:string
    code?:string
    status:boolean
    triggers:Array<ITrigger>
    runAutomatically:boolean|undefined
    showConfirm:boolean|undefined
}

const TriggerBlock:FunctionComponent<IProps> = ({ id, name, status }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const selectQuery = (): void | any => {
    if (!query.setNewSuccessTriggers.find(element => element.triggerQueryId === id)) {
      dispatch(setSuccessTriggersRoutine.trigger({
        queryId: query.selectQuery.selectQueryId,
        triggerQueryId: id,
        success: status
      }));
    } else {
      const index = query.setNewSuccessTriggers.findIndex(item => item.triggerQueryId === id);
      const updateNewTriggers = [...query.setNewSuccessTriggers];
      updateNewTriggers.splice(index, 1);
      dispatch(setSuccessTriggersRoutine.failure(updateNewTriggers));
    }
  };

  return (
    <Dropdown.Item href="#" onClick={selectQuery}>
      {name}
    </Dropdown.Item>
  );
};
export default TriggerBlock;
