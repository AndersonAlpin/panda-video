import { Response } from 'express';
import { userUpdateSchema } from '../validations/user.validation';
import { RequestError } from '../errors/RequestError';
import Container, { Service } from 'typedi';
import UserService from '../services/user.service';
import { CustomRequest } from '../types/express';

const userService = Container.get(UserService);

@Service()
export default class UserController {
  async findAll(req: CustomRequest, res: Response) {
    try {
      const users = await userService.findAll();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async findOne(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.findOne(Number(id));
      
      if (!user) {
        throw new RequestError('User not found', 404);
      }

      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof RequestError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async update(req: CustomRequest, res: Response) {
    try {
      const data = {
        ...req.body,
        id: Number(req.params.id),
      }

      const { error } = userUpdateSchema.validate(data);

      if (error) {
        throw new RequestError(error.details[0].message, 400);
      }

      const user = await userService.update(data);
      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof RequestError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async delete(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;
      await userService.delete(Number(id));
      return res.status(204).send();
    } catch (err) {
      if (err instanceof RequestError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
