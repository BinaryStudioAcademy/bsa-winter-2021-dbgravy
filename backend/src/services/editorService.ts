/* eslint-disable no-restricted-syntax */

import { getCustomRepository } from 'typeorm';
import { ComponentRepository } from '../data/repositories/componentRepository';
<<<<<<< HEAD
import { formatResponse } from '../common/mappers/editor';
import { IComponent } from '../common/models/editor/IComponent';
import { IUpdateComponent } from '../common/models/editor/IUpdateComponent';
import { IResponse } from '../common/models/editor/IResponse';
import { IInputText } from '../common/models/editor/input/IInputText';
import { InputRepository } from '../data/repositories/inputRepository';
=======
import { ButtonRepository } from '../data/repositories/buttonRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ITranspostComponent } from '../common/models/editor/ITranspostComponent';
import { IButton, ITransportedButton } from '../common/models/editor/IButton';
import { ComponentType } from '../common/enums/ComponentType';
import { IComponentElement, IResponseComponent } from '../common/models/editor/IResponseComponent';
import { HttpStatusCode } from '../common/constants/http';
>>>>>>> dev

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

<<<<<<< HEAD
export const addInput = async (input: IInputText): Promise<void> => {
  const { label, placeholder, queryId, componentId } = input;
  console.log(input);
  await getCustomRepository(InputRepository).addInput(
    {
      label,
      placeholder,
      queryId,
      componentId
    }
  );
};

export const updateComponent = async (component: IUpdateComponent): Promise<void> => {
  await getCustomRepository(ComponentRepository).updateComponent(component);
=======
export const addComponent = async (
  appId: string,
  { component }: { component: ITranspostComponent }
): Promise<IResponseComponent> => {
  const { name, top, left, height, width, componentType } = component;
  await checkComponentExistByNameId(appId, name);
  const createdComponent = await getCustomRepository(ComponentRepository).addComponent({
    name,
    top,
    left,
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
>>>>>>> dev
};

export const updateComponent = async (
  id: string,
  componentData: ITranspostComponent
): Promise<IResponseComponent> => {
  await getComponentById(id);
  const { name, top, left, height, width, component } = componentData;
  const editedComponent = await getCustomRepository(ComponentRepository).updateComponent(
    id, { name, top, left, height, width }
  );
  let editedComponentElement = {} as IComponentElement;
  switch (editedComponent.componentType) {
    case ComponentType.input:
      break;
    case ComponentType.table:
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
  switch (component.componentType) {
    case ComponentType.input:
      break;
    case ComponentType.table:
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
