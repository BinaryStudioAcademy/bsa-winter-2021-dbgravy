import React, { FunctionComponent, useState } from 'react';
import Select, { ValueType } from 'react-select';
import { IOptionType } from '../../../../common/models/editor/IOption';
import styles from './style.module.scss';
import { IQuery } from '../../../../common/models/apps/querys';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITrigger } from '../../../../common/models/query/ITrigger';
import { setSuccessTriggersRoutine } from '../../routines';

interface IProps {
    queryList:Array<IQuery>
    triggerList:Array<ITrigger>
    status?: boolean
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

const QueriesListForTriggersWrapper:FunctionComponent<IProps> = ({
  queryList,
  triggerList,
  status
}) => {
  const [triggers, setTriggers] = useState<ValueType<IOptionType, boolean>[]>([]);

  const queries = useSelector((state: IAppState) => state.app.qur);

  const dispatch = useDispatch();
  const selectQuery = (id: string): void | any => {
    if (!queries.setNewSuccessTriggers.find(element => element.triggerQueryId === id)) {
      dispatch(setSuccessTriggersRoutine.trigger({
        queryId: queries.selectQuery.selectQueryId,
        triggerQueryId: id,
        success: true
      }));
    } else {
      const index = queries.setNewSuccessTriggers.findIndex(item => item.triggerQueryId === id);
      const updateNewTriggers = [...queries.setNewSuccessTriggers];
      updateNewTriggers.splice(index, 1);
      dispatch(setSuccessTriggersRoutine.failure(updateNewTriggers));
    }
  };

  const queryOptions: IOptionType[] = queryList
    .map(queryElement => {
      if (queryElement.id !== queries.selectQuery.selectQueryId) {
        if (triggerList.find(element => (
          element.triggerQueryId === queryElement.id))) {
          return queryElement;
        }
      }
      return null;
    })
    .filter(notEmpty)
    .map(({ name, id }) => ({ value: id, label: name }));
  const handleSelectTrigger = (option: IOptionType[]) => {
    const newOptionElement = option
      .filter(element => triggers.find(trigger => ((trigger as IOptionType).value as string) === element.value));
    setTriggers(option);
    selectQuery((newOptionElement[0] as IOptionType).value);
  };

  return (
    <Select
      isMulti
      value={triggers as ValueType<IOptionType, boolean>[]}
      onChange={option => handleSelectTrigger(option as IOptionType[])}
      options={queryOptions}
      className={styles.querySelect}
    />
  );
};
export default QueriesListForTriggersWrapper;
