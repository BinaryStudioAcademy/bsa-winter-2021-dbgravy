import { createConnection } from 'typeorm';
import UserSeeder from './userSeeder';
import OrganizationSeeder from './organizationSeeder';

createConnection()
  .then(async () => {
    await UserSeeder.execute();
    await OrganizationSeeder.execute();
  })
  .catch(e => {
    // eslint-disable-next-line no-console
    console.log(e);
  });
