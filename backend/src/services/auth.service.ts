import Container, { Service } from 'typedi';
import { UserSession } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import UserService from './user.service';
import { BcryptService } from '../shared/services/bcrypt.service';
import { envConfig } from '../config/envConfig';

const userService = Container.get(UserService);
const bcryptService = Container.get(BcryptService);

@Service()
export class AuthService {
  private secretKey = envConfig.AUTH.JWT_SECRET;
  private expiresIn = envConfig.AUTH.JWT_EXPIRATION;

  generateToken(user: UserSession): string {
    return jwt.sign({ id: user.id, name: user.name, email: user.email }, this.secretKey, {
      expiresIn: this.expiresIn,
    });
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcryptService.compareSync(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return this.generateToken(user);
  }
}
