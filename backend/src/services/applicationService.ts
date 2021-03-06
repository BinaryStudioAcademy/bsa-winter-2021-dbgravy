const apps = [
  {
    id: '1',
    name: 'App1',
    organizationId: '1',
    updatedByUserId: '1'
  },
  {
    id: '2',
    name: 'App2',
    organizationId: '2',
    updatedByUserId: '2'
  }
];

export const getApps = () => Promise.resolve(apps);

export const getAppById = (id: string) => Promise.resolve(apps.find(a => a.id === id));

export const addApp = ({ appName }: any) => {
  const appId = new Date().getTime().toString();
  const name: string = appName;
  const app = { id: appId, name, organizationId: `o${appId}`, updatedByUserId: `u${appId}` };
  apps.push(app);
  return Promise.resolve(app);
};

export const updateApp = (id:string, appName: string) => new Promise(resolve => {
  apps.forEach(app => {
    if (app.id === id) {
      const updated = { ...app, name: appName };
      resolve(updated);
    }
  });
});

export const deleteApp = (id: string) => new Promise(resolve => {
  apps.filter(a => a.id !== id);
  resolve(id);
});
