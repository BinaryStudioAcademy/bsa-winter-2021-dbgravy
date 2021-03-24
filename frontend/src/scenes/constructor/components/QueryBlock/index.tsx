import React, { FunctionComponent } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectQueryRoutine, setWaiterQueryRoutine, takeResourcesTableAndColumns } from '../../routines';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITrigger } from '../../../../common/models/query/ITrigger';
import { deepArray } from '../../../../common/helpers/arrayHelper';

interface IProps {
    id:string,
    name:string,
    code?:string,
    triggers:Array<ITrigger>,
    runAutomatically:boolean|undefined,
    showConfirm:boolean|undefined
    resourceId:string
}

const QueryBlock:FunctionComponent<IProps> = ({
  id, name, code, runAutomatically, showConfirm, triggers, resourceId }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const isDataChange = (query.selectQuery.selectQueryCode === query.setNewCode
        && query.selectQuery.runAutomatically === query.setNewRun
        && query.selectQuery.showConfirm === query.setNewConfirm
        && query.selectQuery.resourceId === query.setNewResource?.id);
  const isTriggersChange:boolean = deepArray(query.selectQuery.selectQueryTriggers,
    [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]);
  const selectQuery = ():void|any => {
    if (isDataChange && isTriggersChange) {
      const runTitle = runAutomatically ? 'Run query only when manually triggered'
        : 'Run query automatically when inputs change';
      if (resourceId !== query.setNewResource?.id) {
        dispatch(takeResourcesTableAndColumns.trigger(query.resources.find(element => element.id === resourceId)));
      }
      dispatch(setSelectQueryRoutine.success({
        id, name, code, runAutomatically, triggers, showConfirm, runTitle, resourceId
      }));
    } else {
      dispatch(setWaiterQueryRoutine.trigger({
        id, name, code, runAutomatically, showConfirm, triggers, resourceId, isOpen: true, isDuplicate: false
      }));
    }
  };
  return (
    <option onClick={selectQuery} className={style.App} role="button" tabIndex={0}>
      {name}
    </option>
  );
};

export default QueryBlock;
