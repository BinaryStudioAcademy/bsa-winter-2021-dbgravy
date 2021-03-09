const organizations = [{
  id: '1',
  name: 'microsoft',
  createdBy: '1'
},
{
  id: '2',
  name: 'amazon',
  createdBy: '2'
}];

export const getUserByOraganization = (userId: string, organizationId: string): Promise<any> => (
  new Promise((resolve, reject) => {
    resolve(true);
  })
);

export const createOrganization = (userId: string, organizationName: string): Promise<any> => (
  new Promise((resolve, reject) => {
    resolve(true);
  })
);
