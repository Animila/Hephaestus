import { Token } from './token.entity';

export interface TokenRepository {
  save(token: Token): Promise<void>;
  findValidToken(userId: number, token: string): Promise<Token | null>;
  findTokenByUserAndCode(userId: number, token: string): Promise<boolean>;
  invalidateToken(id: number): Promise<void>;
  generateToken(userId: number, type: string): Promise<Token>;
  validateToken(userId: number, code: number): Promise<boolean>;
}
