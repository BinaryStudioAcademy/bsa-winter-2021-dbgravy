import { getCustomRepository } from 'typeorm';
import { ApplicationRepository } from '../data/repositories/applicationRepository';
import { CustomError } from '../common/models/error/CustomError';

export const getApps = async () => {
  try {
    const apps = await getCustomRepository(ApplicationRepository).getAllApp();
    if (apps.length === 0) {
      throw new CustomError('Apps not found', 404);
    }
    return apps;
  } catch (e) {
    throw new CustomError(e.msg || e.message, e.status);
  }
};

export const getAppById = async (id: string) => {
  try {
    const app = await getCustomRepository(ApplicationRepository).getAppById(id);
    if (!app) {
      throw new CustomError('App not found', 404);
    }
    return app;
  } catch (e) {
    throw new CustomError(e.msg || e.message, e.status);
  }
};

export const addApp = async ({ name, organizationId, updatedByUserId }: any) => {
  try {
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
  } catch (e) {
    throw new CustomError(e.msg || e.message, e.status);
  }
};

export const updateApp = async (id: string, name: string) => {
  try {
    await getAppById(id);
    const app = await getCustomRepository(ApplicationRepository).getAppByName(name);
    if (app) {
      throw new CustomError('App name already exists', 400);
    }
    const editedApp = await getCustomRepository(ApplicationRepository).updateApp(id, { name });
    return editedApp;
  } catch (e) {
    throw new CustomError(e.msg || e.message, e.status);
  }
};

export const deleteApp = async (id: string) => {
  try {
    await getAppById(id);
    const deletedApp = await getCustomRepository(ApplicationRepository).deleteApp(id);
    return deletedApp;
  } catch (e) {
    throw new CustomError(e.msg || e.message, e.status);
  }
};
