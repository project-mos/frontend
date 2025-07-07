export interface RequestLogin {
  code: string;
  oauthProvider: string;
}

export type GetAccessTokenResponse = {
  accessToken: string;
};
