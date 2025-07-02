export interface RequestLogin {
  code: string;
  provider: string;
}

export type GetAccessTokenResponse = {
  accessToken: string;
};
