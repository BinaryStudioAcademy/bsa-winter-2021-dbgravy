import React, { FunctionComponent } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSuccessTriggersRoutine,
  setUnSuccessTriggersRoutine
} from '../../routines';
import { Button } from 'react-bootstrap';
import { IAppState } from '../../../../common/models/store/IAppState';

interface IProps {
    id:string,
    status:boolean
}

const SpanCloseComponent:FunctionComponent<IProps> = ({ id, status }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
  const dispatch = useDispatch();
  const selectQuery = ():void|any => {
    if (status) {
      const index = query.setNewSuccessTriggers.findIndex(item => item.triggerQueryId === id);
      const updateNewTriggers = [...query.setNewSuccessTriggers];
      updateNewTriggers.splice(index, 1);
      dispatch(setSuccessTriggersRoutine.failure(updateNewTriggers));
    } else {
      const index = query.setNewUnSuccessTriggers.findIndex(item => item.triggerQueryId === id);
      const updateNewTriggers = [...query.setNewUnSuccessTriggers];
      updateNewTriggers.splice(index, 1);
      dispatch(setUnSuccessTriggersRoutine.failure(updateNewTriggers));
    }
  };
  return (
    <Button onClick={selectQuery} className={style.span} role="button" tabIndex={0}>
      ☓
    </Button>
  );
};

export default SpanCloseComponent;
