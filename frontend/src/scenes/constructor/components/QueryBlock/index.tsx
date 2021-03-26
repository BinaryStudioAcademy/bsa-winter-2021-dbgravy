import React, { FunctionComponent } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectQueryRoutine, setWaiterQueryRoutine, takeResourcesTableAndColumns } from '../../routines';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITrigger } from '../../../../common/models/query/ITrigger';
import { deepArray } from '../../../../common/helpers/arrayHelper';

interface IProps {
  id: string,
  name: string,
  code?: string,
  triggers: Array<ITrigger>,
  showConfirm: boolean | undefined
  resourceId: string
}

const QueryBlock: FunctionComponent<IProps> = ({
  id, name, code, showConfirm, triggers, resourceId }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const isDataChange = (query.selectQuery.selectQueryCode === query.setNewCode
    && query.selectQuery.showConfirm === query.setNewConfirm
    && query.selectQuery.resourceId === query.setNewResource?.id);
  const isTriggersChange: boolean = deepArray(query.selectQuery.selectQueryTriggers,
    [...query.setNewSuccessTriggers, ...query.setNewUnSuccessTriggers]);
  const selectQuery = (): void | any => {
    if (isDataChange && isTriggersChange) {
      if (resourceId !== query.setNewResource?.id) {
        dispatch(takeResourcesTableAndColumns.trigger(query.resources.find(element => element.id === resourceId)));
      }
      dispatch(setSelectQueryRoutine.success({
        id, name, code, triggers, showConfirm, resourceId
      }));
    } else {
      dispatch(setWaiterQueryRoutine.trigger({
        id, name, code, showConfirm, triggers, resourceId, isOpen: true, isDuplicate: false
      }));
    }
  };
  return (
    <option
      onClick={selectQuery}
      className={[style.query, style.list].join(' ')}
      role="button"
      tabIndex={0}
    >
      {name}
    </option>
  );
};

export default QueryBlock;
