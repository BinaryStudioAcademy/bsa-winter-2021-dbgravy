import { getCustomRepository } from 'typeorm';
import { ComponentRepository } from '../data/repositories/componentRepository';
import { formatResponse } from '../common/mappers/editor';
import { IComponent } from '../common/models/editor/IComponent';
import { IUpdateComponent } from '../common/models/editor/IUpdateComponent';
import { IResponse } from '../common/models/editor/IResponse';
import { CustomError } from '../common/models/error/CustomError';
import { HttpStatusCode } from '../common/constants/http';

export const getComponents = async (appId: string): Promise<IResponse> => {
  const components = await getCustomRepository(ComponentRepository).getAllComponents(appId);
  const response = formatResponse(components);
  return response;
};

export const addComponent = async (appId: string, component: IComponent): Promise<void> => {
  const { name, height, width, left, top } = component;
  const intHeight = Number(height.slice(0, -2));
  const intWidth = Number(width.slice(0, -2));
  await getCustomRepository(ComponentRepository).addComponent(
    {
      name,
      height: intHeight,
      width: intWidth,
      left: Math.floor(left),
      top: Math.floor(top),
      appId
    }
  );
};

export const updateComponent = async (component: IUpdateComponent): Promise<void> => {
  await getCustomRepository(ComponentRepository).updateComponent(component);
};

export const deleteComponent = async (id: string): Promise<void> => {
  const component = await getCustomRepository(ComponentRepository).getComponentById(id);
  if (!component) {
    throw new CustomError('Component not found', HttpStatusCode.NOT_FOUND);
  }
  await getCustomRepository(ComponentRepository).deleteComponent(id);
};

