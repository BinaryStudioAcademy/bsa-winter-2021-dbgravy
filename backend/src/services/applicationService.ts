import { getCustomRepository } from 'typeorm';
import { ApplicationRepository } from '../data/repositories/applicationRepository';

export const getApps = async () => {
  try {
    const apps = await getCustomRepository(ApplicationRepository).getAllApp();
    if (apps.length === 0) {
      throw new Error('Apps not found');
    }
    return apps;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getAppById = async (id: string) => {
  try {
    const app = await getCustomRepository(ApplicationRepository).getAppById(id);
    if (app) {
      throw new Error('App not found');
    }
    return app;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const addApp = async ({ name, organizationId, updatedByUserId }: any) => {
  const app = await getCustomRepository(ApplicationRepository).addApp(
    {
      name,
      organizationId,
      updatedByUserId
    }
  );
  return app;
};

export const updateApp = async (id: string, name: string) => {
  await getAppById(id);
  const editedApp = await getCustomRepository(ApplicationRepository).updateApp(id, { name });
  return editedApp;
};

export const deleteApp = async (id: string) => {
  try {
    await getAppById(id);
    const deletedApp = await getCustomRepository(ApplicationRepository).deleteApp(id);
    if (deletedApp) {
      throw new Error('App not deleted');
    }
    return deletedApp;
  } catch (e) {
    throw new Error(e.message);
  }
};
