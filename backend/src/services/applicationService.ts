import { getCustomRepository } from 'typeorm';
import { ApplicationRepository } from '../data/repositories/applicationRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ICreateApplication } from '../common/models/application/ICreateApplication';

export const getApps = async (): Promise<ICreateApplication[]> => {
  const apps = await getCustomRepository(ApplicationRepository).getAllApp();
  if (apps.length === 0) {
    throw new CustomError('Apps not found', 404);
  }
  return apps;
};

export const getAppById = async (id: string): Promise<ICreateApplication> => {
  const app = await getCustomRepository(ApplicationRepository).getAppById(id);
  if (!app) {
    throw new CustomError('App not found', 404);
  }
  return app;
};

export const addApp = async (appData: ICreateApplication): Promise<ICreateApplication> => {
  const { name, organizationId, updatedByUserId } = appData;
  const app = await getCustomRepository(ApplicationRepository).getAppByName(name);
  if (app) {
    throw new CustomError('App name already exists', 400);
  }
  const createdApp = await getCustomRepository(ApplicationRepository).addApp(
    {
      name,
      organizationId,
      updatedByUserId
    }
  );
  return createdApp;
};

export const updateApp = async (id: string, name: string): Promise<ICreateApplication> => {
  await getAppById(id);
  const app = await getCustomRepository(ApplicationRepository).getAppByName(name);
  if (app) {
    throw new CustomError('App name already exists', 400);
  }
  const editedApp = await getCustomRepository(ApplicationRepository).updateApp(id, { name });
  return editedApp;
};

export const deleteApp = async (id: string): Promise<ICreateApplication> => {
  await getAppById(id);
  const deletedApp = await getCustomRepository(ApplicationRepository).deleteApp(id);
  return deletedApp;
};
