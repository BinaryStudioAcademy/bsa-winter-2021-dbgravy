import React, { FunctionComponent } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectQueryRoutine, setWaiterQueryRoutine } from '../../routines';
import { IAppState } from '../../../../common/models/store/IAppState';

interface IProps {
    id:string,
    name:string,
    code?:string,
    runAutomatically:boolean|undefined,
    showConfirm:boolean|undefined
}

const QueryBlock:FunctionComponent<IProps> = ({ id, name, code, runAutomatically, showConfirm }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const selectQuery = ():void|any => {
    if (query.selectQuery.selectQueryCode === query.setNewCode
        && query.selectQuery.runAutomatically === query.setNewRun
        && query.selectQuery.showConfirm === query.setNewConfirm
    ) {
      const runTitle = runAutomatically ? 'Run query only when manually triggered'
        : 'Run query automatically when inputs change';
      dispatch(setSelectQueryRoutine.success({
        id, name, code, runAutomatically, showConfirm, runTitle
      }));
    } else {
      dispatch(setWaiterQueryRoutine.trigger({
        id, name, code, runAutomatically, showConfirm, isOpen: true, isDuplicate: false
      }));
    }
  };
  return (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <option onClick={selectQuery} className={style.App} role="button" tabIndex={0}>
      {name}
    </option>
  );
};

export default QueryBlock;
