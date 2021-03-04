import React from 'react';
import AddApp from '../../components/AddApp';

const AppHeader: React.FC = () => {
  const handleAddApp = (appName: string): void => {
    console.log(appName);
  };

  return (<AddApp onAddApp={handleAddApp} />);
};

export default AppHeader;
