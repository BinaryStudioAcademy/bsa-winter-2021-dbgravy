const resources = [
  {
    id: '1',
    name: 'Resource1',
    type: 'MongoDb',
    dbName: 'db1',
    createdAt: '12345'
  },
  {
    id: '2',
    name: 'Resource2',
    type: 'Postgresql',
    dbName: 'db2',
    createdAt: '12345'
  }
];

export const getResources = () => Promise.resolve(resources);
