import { Service } from "typedi";
import bcrypt from 'bcryptjs';

@Service()
export class BcryptService {
  async hashSync(password: string, salt: number = 10): Promise<string> {
    return bcrypt.hashSync(password, salt);
  }

  async compareSync(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }
}