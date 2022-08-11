import { dataSource } from '../config/database';
import { User } from '../entities/user';

export const getUserByEmail = async (email: string) =>
  dataSource.getRepository(User).findOne({
    where: {
      email,
    },
  });
