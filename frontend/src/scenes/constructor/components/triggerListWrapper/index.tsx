import React, { FunctionComponent, useEffect, useState } from 'react';
import Select, { ValueType } from 'react-select';
import { IOptionType } from '../../../../common/models/editor/IOption';
import styles from './style.module.scss';
import { IQuery } from '../../../../common/models/apps/querys';
import { useDispatch } from 'react-redux';
import { ITrigger } from '../../../../common/models/query/ITrigger';
import { setSuccessTriggersRoutine } from '../../routines';

interface IProps {
    queryList:Array<IQuery>
    triggerList:Array<ITrigger>
    selectQueryId: string,
    status?: boolean
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

const QueriesListForTriggersWrapper:FunctionComponent<IProps> = ({
  queryList,
  triggerList,
  selectQueryId,
  status
}) => {
  const [triggers, setTriggers] = useState<ValueType<IOptionType, boolean>[]>([]);
  useEffect(() => {
    const successTriggers = triggerList.filter(trigger => trigger.queryId === selectQueryId);
    const triggersOption = queryList
      .filter(query => successTriggers.find(trigger => trigger.triggerQueryId === query.id))
      .map(({ name, id }) => ({ value: id, label: name }));
    setTriggers(triggersOption);
  }, [queryList, selectQueryId]);

  const dispatch = useDispatch();
  const selectQuery = (id: string, isAdd: boolean): void | any => {
    if (isAdd) {
      if (!triggerList.find(element => element.triggerQueryId === id)) {
        dispatch(setSuccessTriggersRoutine.trigger({
          queryId: selectQueryId,
          triggerQueryId: id,
          success: status
        }));
      } else {
        const index = triggerList.findIndex(item => item.triggerQueryId === id);
        const updateNewTriggers = [...triggerList];
        updateNewTriggers.splice(index, 1);
        dispatch(setSuccessTriggersRoutine.failure(updateNewTriggers));
      }
    } else {
      const index = triggerList.findIndex(item => item.triggerQueryId === id);
      const updateNewTriggers = [...triggerList];
      updateNewTriggers.splice(index, 1);
      dispatch(setSuccessTriggersRoutine.failure(updateNewTriggers));
    }
  };

  const queryOptions: IOptionType[] = queryList
    .map(queryElement => {
      if (queryElement.id !== selectQueryId) {
        if (!triggerList.find(element => (
          element.triggerQueryId === queryElement.id))) {
          return queryElement;
        }
      }
      return null;
    })
    .filter(notEmpty)
    .map(({ name, id }) => ({ value: id, label: name }));
  const handleSelectTrigger = (option: IOptionType[]) => {
    if (triggers.length > option.length) {
      const newOptionElement = triggers
        .filter(trigger => !option.find(element => ((trigger as IOptionType).value as string) === element.value));
      selectQuery((newOptionElement[0] as IOptionType)?.value, false);
    } else if (triggers.length < option.length) {
      const newOptionElement = option
        .filter(element => !triggers.find(trigger => ((trigger as IOptionType).value as string) === element.value));
      selectQuery((newOptionElement[0] as IOptionType)?.value, true);
    }
    setTriggers(option);
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
