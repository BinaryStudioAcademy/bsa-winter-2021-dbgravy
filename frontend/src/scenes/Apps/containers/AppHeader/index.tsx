import { connect } from 'react-redux';
import React from 'react';
import AddApp from '../../components/AddApp';
import { addAppRoutine } from '../../routines';

interface IProps {
  addApp: Function
}

const AppHeader: React.FC<IProps> = ({ addApp }) => {
  const handleAddApp = (appName: string): void => {
    addApp(appName);
  };

  return (<AddApp onAddApp={handleAddApp} />);
};

const mapDispatchToProps = {
  addApp: addAppRoutine
};

export default connect(null, mapDispatchToProps)(AppHeader);
