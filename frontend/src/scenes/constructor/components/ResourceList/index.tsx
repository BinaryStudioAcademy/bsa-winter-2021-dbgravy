import React, { FunctionComponent, useState } from 'react';
import Select, { ValueType } from 'react-select';
import { IOptionType } from '../../../../common/models/editor/IOption';
import { IResource } from '../../../../common/models/resources/IResource';
import styles from '../../containers/style.module.scss';

interface IProps {
  resourceList:Array<IResource>,
  onChangeResource: Function
}

const ResourceList:FunctionComponent<IProps> = ({
  resourceList,
  onChangeResource
}) => {
  const [resource, setResource] = useState<ValueType<IOptionType, boolean>>();
  const optionsQueries: IOptionType[] = resourceList
    .map(({ name, id }) => ({ value: id, label: name }));
  const handleSelectResource = (option: IOptionType) => {
    setResource(option);
    onChangeResource(option.value);
  };

  return (
    <Select
      value={resource as ValueType<IOptionType, boolean>}
      onChange={option => handleSelectResource(option as IOptionType)}
      options={optionsQueries}
      className={styles.resourceSelect}
    />
  );
};

export default ResourceList;
