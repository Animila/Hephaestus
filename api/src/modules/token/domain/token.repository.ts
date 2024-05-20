import { Token } from './token.entity';

export interface TokenRepository {
  generateToken(userId: number, type: string): Promise<Token>;
  validateToken(userId: number, code: number): Promise<boolean>;
}
