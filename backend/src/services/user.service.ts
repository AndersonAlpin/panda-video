import { UserCreateDTO, UserUpdateDTO } from '../interfaces/user.interface';
import { RequestError } from '../errors/RequestError';
import { prisma } from '../shared/services/prisma.service';
import Container, { Service } from 'typedi';
import { BcryptService } from '../shared/services/bcrypt.service';

const bcryptService = Container.get(BcryptService);

@Service()
export default class UserService {
  async create(userCreateDTO: UserCreateDTO) {
    try {
      const { name, email, password } = userCreateDTO;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new RequestError('Email already in use', 409);
      }
    
      const hashedPassword = await bcryptService.hashSync(password, 10);
    
      return await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      });
    } catch (err) {
      if (err instanceof RequestError) {
        throw err;
      }
      throw new RequestError('Internal Server Error', 500);
    }
  }

  async findAll() {
    try {
      return await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true
        }
      });
    } catch (err) {
      throw new RequestError('Internal Server Error', 500);
    }
  }

  async findOne(id: number) {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (err) {
      throw new Error('Error finding user');
    }
  }

  async findByEmail(email: string) {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (err) {
      throw new Error('Error finding user');
    }
  }
  
  async update(userUpdateDTO: UserUpdateDTO) {
    try {
      const { id, name, email } = userUpdateDTO;
  
      const userExists = await prisma.user.findUnique({
        where: { id },
      });
  
      if (!userExists) {
        throw new RequestError('User not found', 404);
      }
  
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });
  
      if (emailExists && emailExists.id !== id) {
        throw new RequestError('Email already in use', 409);
      }
  
      return await prisma.user.update({
        where: { id },
        data: { name, email },
      });
    } catch (err) {
      if (err instanceof RequestError) {
        throw err;
      }
      throw new Error('Error updating user');
    }
  }  
  
  async delete(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
  
      if (!user) {
        throw new RequestError('User not found', 404);
      }
  
      return await prisma.user.delete({
        where: { id },
      });
    } catch (err) {
      if (err instanceof RequestError) {
        throw err;
      }
      throw new Error('Error deleting user');
    }
  }  
}