import { getCustomRepository } from 'typeorm';
import { ComponentRepository } from '../data/repositories/componentRepository';
import { formatResponse } from '../common/mappers/editor';

export const getComponents = async (appId: string) => {
  const components = await getCustomRepository(ComponentRepository).getAllComponents(appId);
  const response = formatResponse(components);
  return response;
};

export const addComponent = async ({ appId, component }: any): Promise<void> => {
  const { title, height, width, left, top } = component;
  const intHeight = Number(height.slice(0, -2));
  const intWidth = Number(width.slice(0, -2));
  await getCustomRepository(ComponentRepository).addComponent(
    {
      name: title,
      height: intHeight,
      width: intWidth,
      left,
      top,
      appId
    }
  );
};

export const updateComponent = async ({ component }: any): Promise<void> => {
  await getCustomRepository(ComponentRepository).updateComponent(component);
};

