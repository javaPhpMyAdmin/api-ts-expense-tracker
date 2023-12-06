import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { envs } from '../../../shared/infrastructure/envs';

export interface GoogleAuthProps {
  verifyToken: (token: string) => Promise<LoginTicket>;
  getPayload: (ticket: LoginTicket) => TokenPayload | undefined;
}

export class GoogleAuth {
  constructor() {}

  static async verifyToken(googleToken: string): Promise<LoginTicket> {
    const googleClient = new OAuth2Client({
      clientId: envs.GOOGLE_CLIENT_ID,
    });
    return await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: envs.GOOGLE_CLIENT_ID,
    });
  }

  static getPayload(ticket: LoginTicket): TokenPayload | undefined {
    return ticket.getPayload();
  }
}
