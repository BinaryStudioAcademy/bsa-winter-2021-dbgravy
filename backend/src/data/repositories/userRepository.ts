import { IUser } from '../../common/models/user/user';

// TODO: implement repository with real DB
const fakeUserDb: IUser[] = [
  {
    id: '1',
    email: 'test@ukr.net',
    firstname: 'sergey',
    lastname: 'testov',
    password: '123123123',
    currentOrganizationId: '1'
  },
  {
    id: '2',
    email: 'test2@ukr.net',
    firstname: 'sergey2',
    lastname: 'testov2',
    password: '123123123',
    currentOrganizationId: '2'
  }
];

export const addUser = (user: IUser): Promise<IUser> => {
  fakeUserDb.push(user);
  return Promise.resolve(user);
};

/* eslint-disable max-len */
export const getByEmail = (email: string): Promise<IUser | null> => Promise.resolve(fakeUserDb.find(u => u.email === email));

export const getById = (id: string): Promise<IUser | null> => Promise.resolve(fakeUserDb.find(u => u.id === id));
