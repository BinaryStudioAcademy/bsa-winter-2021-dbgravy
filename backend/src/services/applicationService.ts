let apps = [
  {
    id: '1',
    name: 'App1'
  },
  {
    id: '2',
    name: 'App2'
  }
];

export const getApps = () => Promise.resolve(apps);

export const getAppById = (id: string) => Promise.resolve(apps.find(a => a.id === id));

export const addApp = (appName: string) => {
  const appId = new Date().getTime().toString();
  const app = { id: appId, name: appName, };
  apps.push(app);
  return Promise.resolve(app);
};

export const updateApp = (id:string, appName: string) => {
  return new Promise(resolve => {
    apps.map(app => {
      if(app.id === id){
        app.name = appName;
        resolve(app);
      }
    });
  });
}

export const daleteApp = (id: string) => {
  return new Promise(resolve => {
    apps.filter(a => a.id !== id);
    resolve(id);
  });
};
