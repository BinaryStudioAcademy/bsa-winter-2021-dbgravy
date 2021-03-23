import { getCustomRepository } from 'typeorm';
import { ComponentRepository } from '../data/repositories/componentRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ICreateComponent } from '../common/models/components/ICreateComponent';
import { ITransportedComponent } from '../common/models/components/ITransportedComponent';
import { HttpStatusCode } from '../common/constants/http';

export const checkComponentExistByNameId = async (appId: string, nameId: string): Promise<void> => {
  const component = await getCustomRepository(ComponentRepository)
    .getComponentByAppIdAndNameId(appId, nameId);
  if (component) {
    throw new CustomError('component name already exists in current app', HttpStatusCode.BAD_REQUEST);
  }
};

export const getComponentsByAppId = async (appId: string): Promise<ITransportedComponent[]> => {
  const components = await getCustomRepository(ComponentRepository)
    .getAllComponentsByAppId(appId);
  if (!components) {
    return [];
  }
  return components;
};

export const getComponentById = async (id: string): Promise<ITransportedComponent> => {
  const component = await getCustomRepository(ComponentRepository).getComponentById(id);
  if (!component) {
    throw new CustomError('Component not found', HttpStatusCode.NOT_FOUND);
  }
  return component;
};

export const addComponent = async (
  appId: string,
  componentData: ICreateComponent
): Promise<ITransportedComponent> => {
  const { name } = componentData;
  await checkComponentExistByNameId(appId, name);
  const createdComponent = await getCustomRepository(ComponentRepository).addComponent();
  return createdComponent;
};

export const updateComponent = async (
  id: string,
  componentData: ICreateComponent
): Promise<ITransportedComponent> => {
  await getComponentById(id);
  const editedComponent = await getCustomRepository(ComponentRepository).updateComponent(id, componentData);
  return editedComponent;
};

export const deleteComponent = async (id: string): Promise<ITransportedComponent> => {
  await getComponentById(id);
  const deletedComponent = await getCustomRepository(ComponentRepository).deleteComponent(id);
  return deletedComponent;
};
