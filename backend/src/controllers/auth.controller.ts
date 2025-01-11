import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { Container, Service } from 'typedi';
import { userCreateSchema } from '../validations/user.validation';
import { RequestError } from '../errors/RequestError';
import UserService from '../services/user.service';

const userService = Container.get(UserService);
const authService = Container.get(AuthService);

@Service()
export default class AuthController {
async signup(req: Request, res: Response) {
    try {
      const { error } = userCreateSchema.validate(req.body);
  
      if (error) {
        throw new RequestError(error.details[0].message, 400);
      }

      const user = await userService.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof RequestError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await authService.login(email, password);
    
    if (!token) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  }
}
