import React, { FunctionComponent } from 'react';
import { DropdownButton } from 'react-bootstrap';
import ResourceBlock from '../ResourceBlock';
import { IResource } from '../../../../common/models/resources/IResource';
import style from '../../containers/style.module.scss';

interface IProps {
    resourceList:Array<IResource>,
    resourceName:string|undefined
}

const ResourceList:FunctionComponent<IProps> = ({
  resourceList,
  resourceName
}) => {
  const titleName = resourceName === undefined ? 'loading' : resourceName;
  return (
    <DropdownButton id="dropdown-change" title={titleName} className={style.dropMenuChange}>
      {
            resourceList.map(resource => (
              <ResourceBlock
                id={resource.id}
                name={resource.name}
                key={resource.id}
              />
            ))
                }
    </DropdownButton>
  );
};

export default ResourceList;
