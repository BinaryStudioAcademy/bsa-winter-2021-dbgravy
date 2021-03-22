import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const encrypt = (data: string): Promise<string> => bcrypt.hash(data, saltRounds);

export const compare = (data: string, encrypted: string): Promise<boolean> => bcrypt.compare(data, encrypted);

