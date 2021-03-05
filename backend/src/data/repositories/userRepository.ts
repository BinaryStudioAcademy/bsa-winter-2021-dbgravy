import { IUser } from '../../common/models/user/user';

// TODO: implement repository with real DB
const fakeUserDb: IUser[] = [];

export const addUser = async (user: IUser): Promise<IUser> => {
  const newUser: IUser = await new Promise(resolve => {
    fakeUserDb.push(user);
    resolve(user);
  });
  return newUser;
};

/* eslint-disable max-len */
export const getByEmail = (email: string): Promise<IUser | null> => Promise.resolve(fakeUserDb.find(u => u.email === email));

export const getById = (id: string): Promise<IUser | null> => Promise.resolve(fakeUserDb.find(u => u.id === id));
