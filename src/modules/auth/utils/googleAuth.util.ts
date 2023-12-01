import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import { envs } from "../../../shared/infrastructure/envs";
import queryString from "querystring";

export class GoogleAuth {
  constructor() {}

  static async verifyToken(googleToken: string): Promise<Response> {
    // const googleClient = new OAuth2Client({
    //   clientId: envs.GOOGLE_CLIENT_ID,
    // });
    // return await googleClient.verifyIdToken({
    //   idToken: googleToken,
    //   audience: envs.GOOGLE_CLIENT_ID,
    // });
    const token = queryString.stringify({
      client_id: envs.GOOGLE_CLIENT_ID,
      client_secret: "GOCSPX - OAlMH0ffBa0AlAsPXMGHZXR4yHnp",
      code: googleToken,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:5173/api/v1/auth/googleAuth",
    });
    const res = await fetch(`https://oauth2.googleapis.com/token?${token}`, {
      method: "POST",
    });
    console.log("RESPONSE GOOGLE AUTH", res);
    return res;
  }

  static getPayload(ticket: LoginTicket): TokenPayload | undefined {
    return ticket.getPayload();
  }
}
