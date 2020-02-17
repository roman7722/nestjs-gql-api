export interface IPayload {
  sub: number;
}

export interface ISessions {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface IDecodedToken {
  sub: number;
  iat: number;
  exp: number;
}

export type TDecodedToken = IDecodedToken | null | string;

export type TVerifyedToken = IDecodedToken | string;
