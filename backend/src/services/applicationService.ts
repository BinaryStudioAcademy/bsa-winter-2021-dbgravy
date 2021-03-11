import { getCustomRepository } from 'typeorm';
import { ApplicationRepository } from '../data/repositories/applicationRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ICreateApplication } from '../common/models/application/ICreateApplication';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import { extractTransportedApp, extractTransportedApps } from '../common/helpers/appExtractorHelper';
import { ITransportedApplication } from '../common/models/application/ITransportedApplication';
import { getUserOrganization } from './userOrganizationService';

export const checkAppExistByNameByOrganizationId = async (name: string, organizationId: string): Promise<void> => {
  const app = await getCustomRepository(ApplicationRepository)
    .getAppByNameByOrganizationId(name, organizationId);
  if (app) {
    throw new CustomError('App name already exists', 400);
  }
};

export const getApps = async (user: ITransportedUser): Promise<ITransportedApplication[]> => {
  const { currentOrganizationId } = user;
  const apps = await getCustomRepository(ApplicationRepository)
    .getAllAppByOrganizationId(currentOrganizationId);
  if (!apps) {
    return [];
  }
  return extractTransportedApps(apps);
};

export const getAppById = async (id: string): Promise<ITransportedApplication> => {
  const app = await getCustomRepository(ApplicationRepository).getAppById(id);
  if (!app) {
    throw new CustomError('App not found', 404);
  }
  return extractTransportedApp(app);
};

export const addApp = async (appData: ICreateApplication, user: ITransportedUser): Promise<ITransportedApplication> => {
  const { id, currentOrganizationId } = user;
  const { name } = appData;
  const userOrganization = await getUserOrganization(currentOrganizationId, id);
  const updatedByUserId = userOrganization.userOrganizationId;
  await checkAppExistByNameByOrganizationId(name, currentOrganizationId);
  const createdApp = await getCustomRepository(ApplicationRepository).addApp(
    {
      name,
      organizationId: currentOrganizationId,
      updatedByUserId
    }
  );
  return extractTransportedApp(createdApp);
};

export const updateApp = async (id: string, name: string, user: ITransportedUser): Promise<ITransportedApplication> => {
  await getAppById(id);
  const { currentOrganizationId } = user;
  await checkAppExistByNameByOrganizationId(name, currentOrganizationId);
  const editedApp = await getCustomRepository(ApplicationRepository).updateApp(id, { name });
  return extractTransportedApp(editedApp);
};

export const deleteApp = async (id: string): Promise<ITransportedApplication> => {
  await getAppById(id);
  const deletedApp = await getCustomRepository(ApplicationRepository).deleteApp(id);
  return extractTransportedApp(deletedApp);
};
