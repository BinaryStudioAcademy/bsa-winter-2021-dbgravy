import React, { FunctionComponent } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectQueryRoutine, setWaiterQueryRoutine } from '../../routines';
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
}

const QueryBlock:FunctionComponent<IProps> = ({ id, name, code, runAutomatically, showConfirm, triggers }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const isDataChange = (query.selectQuery.selectQueryCode === query.setNewCode
        && query.selectQuery.runAutomatically === query.setNewRun
        && query.selectQuery.showConfirm === query.setNewConfirm);
  const isTriggersChange:boolean = deepArray(query.selectQuery.selectQueryTriggers,
    [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]);
  const selectQuery = ():void|any => {
    if (isDataChange && isTriggersChange) {
      const runTitle = runAutomatically ? 'Run query only when manually triggered'
        : 'Run query automatically when inputs change';
      dispatch(setSelectQueryRoutine.success({
        id, name, code, runAutomatically, triggers, showConfirm, runTitle
      }));
    } else {
      dispatch(setWaiterQueryRoutine.trigger({
        id, name, code, runAutomatically, showConfirm, triggers, isOpen: true, isDuplicate: false
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
