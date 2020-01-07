export interface IPayload {
  // username: string;
  sub: number;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface IDecodedToken {
  // username: string;
  sub: number;
  iat: number;
  exp: number;
}

export type TDecodedToken = IDecodedToken | null | string;

export type TVerifyedToken = IDecodedToken | string;
