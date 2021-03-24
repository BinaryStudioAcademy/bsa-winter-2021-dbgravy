/* eslint-disable no-restricted-syntax */

import { getCustomRepository } from 'typeorm';
import { ComponentRepository } from '../data/repositories/componentRepository';
import { ButtonRepository } from '../data/repositories/buttonRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ITranspostComponent } from '../common/models/editor/ITranspostComponent';
import { IButton, ITransportedButton } from '../common/models/editor/IButton';
import { ComponentType } from '../common/enums/ComponentType';
import { IComponentElement, IResponseComponent } from '../common/models/editor/IResponseComponent';
import { HttpStatusCode } from '../common/constants/http';
import { TableRepository } from '../data/repositories/tableRepository';
import { ITable, ITransportedTable } from '../common/models/editor/ITable';

export const checkComponentExistByNameId = async (appId: string, nameId: string): Promise<void> => {
  const component = await getCustomRepository(ComponentRepository)
    .getComponentByAppIdAndNameId(appId, nameId);
  if (component) {
    throw new CustomError('component name already exists in current app', HttpStatusCode.BAD_REQUEST);
  }
};

export const getComponentsByAppId = async (appId: string): Promise<IResponseComponent[]> => {
  const components = await getCustomRepository(ComponentRepository)
    .getAllComponentsByAppId(appId);
  if (!components) {
    return [];
  }
  const resultComponents = [] as IResponseComponent[];
  for (const element of components) {
    const { id, componentType } = element;
    let componentElement = {} as IComponentElement;
    switch (componentType) {
      case ComponentType.input:
        break;
      case ComponentType.table:
        componentElement = await getCustomRepository(TableRepository).getTableByComponentId(id);
        break;
      case ComponentType.button:
        componentElement = await getCustomRepository(ButtonRepository).getButtonByComponentId(id);
        break;
      default:
        break;
    }
    resultComponents.push({ ...element, componentType: (componentType as ComponentType), component: componentElement });
  }
  return resultComponents;
};

export const getComponentById = async (id: string): Promise<IResponseComponent> => {
  const component = await getCustomRepository(ComponentRepository).getComponentById(id);
  if (!component) {
    throw new CustomError('Component not found', HttpStatusCode.NOT_FOUND);
  }
  return {} as IResponseComponent;
};

export const addComponent = async (
  appId: string,
  { component }: { component: ITranspostComponent }
): Promise<IResponseComponent> => {
  const { name, top, left, height, width, componentType } = component;
  await checkComponentExistByNameId(appId, name);
  const createdComponent = await getCustomRepository(ComponentRepository).addComponent({
    name,
    top: Math.floor(top),
    left: Math.floor(left),
    height,
    width,
    componentType,
    appId
  });
  let createdComponentElement = {} as IComponentElement;
  switch (componentType) {
    case ComponentType.input:
      break;
    case ComponentType.table:
      createdComponentElement = await getCustomRepository(TableRepository).addTable({
        queryId: (component.component as ITable).queryId,
        componentId: createdComponent.id
      });
      break;
    case ComponentType.button:
      createdComponentElement = await getCustomRepository(ButtonRepository).addButton({
        text: (component.component as IButton).text,
        color: (component.component as IButton).color,
        queryId: (component.component as IButton).queryId,
        componentId: createdComponent.id
      });
      break;
    default:
      break;
  }
  return { ...createdComponent, componentType, component: createdComponentElement };
};

export const updateComponent = async (
  id: string,
  componentData: ITranspostComponent
): Promise<IResponseComponent> => {
  await getComponentById(id);
  const { name, top, left, height, width, component } = componentData;
  const editedComponent = await getCustomRepository(ComponentRepository).updateComponent(
    id, { name, top: Math.floor(top), left: Math.floor(left), height, width }
  );
  let editedComponentElement = {} as IComponentElement;
  switch (editedComponent.componentType) {
    case ComponentType.input:
      break;
    case ComponentType.table:
      editedComponentElement = await getCustomRepository(TableRepository).updateTable(
        (component as ITransportedTable).id, {
          queryId: (component as IButton).queryId
        }
      );
      break;
    case ComponentType.button:
      editedComponentElement = await getCustomRepository(ButtonRepository).updateButton(
        (component as ITransportedButton).id, {
          text: (component as IButton).text,
          queryId: (component as IButton).queryId,
          color: (component as IButton).color
        }
      );
      break;
    default:
      break;
  }
  return {
    ...editedComponent,
    componentType: (editedComponent.componentType as ComponentType),
    component: editedComponentElement
  };
};

export const deleteComponent = async (id: string): Promise<IResponseComponent> => {
  await getComponentById(id);
  const component = await getCustomRepository(ComponentRepository).getComponentById(id);
  let deletedComponentElement = {} as IComponentElement;
  console.log(component.componentType);
  switch (component.componentType) {
    case ComponentType.input:
      break;
    case ComponentType.table:
      deletedComponentElement = await getCustomRepository(TableRepository).deleteTable(component.id);
      break;
    case ComponentType.button:
      deletedComponentElement = await getCustomRepository(ButtonRepository).deleteButton(component.id);
      break;
    default:
      break;
  }
  const deletedComponent = await getCustomRepository(ComponentRepository).deleteComponent(id);
  return {
    ...deletedComponent,
    componentType: (deletedComponent.componentType as ComponentType),
    component: deletedComponentElement
  };
  return {} as IResponseComponent;
};
