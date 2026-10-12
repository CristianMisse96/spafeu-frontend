import { User } from './user.interface';

/**
 * Representa la respuesta de negocio devuelta por el endpoint de refresh token.
 */
export interface RefreshTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  usuario: User;
}
