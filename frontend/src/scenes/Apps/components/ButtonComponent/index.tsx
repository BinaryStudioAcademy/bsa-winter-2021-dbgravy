import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { IButton } from '../../../../common/models/editor/IButton';
import { IQuery } from '../../../../common/models/apps/querys';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import { runSelectQueryRoutine } from '../../../constructor/routines';

interface IProps {
  component:IButton;
  id: string;
}

const ButtonComponent:FunctionComponent<IProps> = ({
  component, id }) => {
  const queries: Array<IQuery> = useSelector((state: IAppState) => state.app.qur.queriesApp);
  const dispatch = useDispatch();
  const handleButton = () => {
    const searchSelectQuery:IQuery|undefined = queries.find(elem => elem.id === component.queryId);
    if (searchSelectQuery) {
      dispatch(runSelectQueryRoutine.trigger({
        data: {
          id: searchSelectQuery.id,
          code: searchSelectQuery.code,
          showConfirm: searchSelectQuery.showConfirm,
          name: searchSelectQuery.name,
          triggers: searchSelectQuery.triggers
        },
        appId: id,
        resourceId: searchSelectQuery.resourceId,
        triggered: []
      }));
    }
  };

  return (
    <Button
      as="input"
      type="button"
      onClick={handleButton}
      value={(component as IButton).text ? (component as IButton).text : 'Submit'}
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: (component as IButton).color ? (component as IButton).color : 'blue'
      }}
    />
  );
};

export default ButtonComponent;
