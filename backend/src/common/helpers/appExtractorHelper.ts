import { App } from '../../data/entities/App';
import { ITransportedApplication } from '../models/application/ITransportedApplication';

export const extractTransportedApp = (app: App): ITransportedApplication => {
  const { id, createdAt, name, organizationId, updatedByUserId } = app;
  const transportedApp: ITransportedApplication = {
    id,
    createdAt,
    name,
    organizationId,
    updatedByUserId
  };
  return transportedApp;
};

export const extractTransportedApps = (apps: App[]): ITransportedApplication[] => (
  apps.map((app: App) => extractTransportedApp(app)));
