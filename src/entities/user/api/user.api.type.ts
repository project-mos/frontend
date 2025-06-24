export interface GetUserInfoResponse {
  nickname: string;
  introduction: string;
  categories: string[];
  imagePath: string;
  joinDate: string;
}
export interface PutUserInfoResponse {
  nickname: string;
  introduction: string;
  categories: string[];
}
export interface PutProfileImgResponse {
  file: File;
  type: string;
}
