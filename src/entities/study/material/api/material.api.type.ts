export interface GetMaterialsRequest {
  studyId: string;
}
export interface GetMaterialsResponse {
  count: number;
  fileList: FileInterface[];
  totalFileSize: number;
}

export interface FileInterface {
  filePath: string;
  fileSize: number;
  id: number;
  originalName: string;
  studyId: number;
  studyMemberId: number;
  userId: number;
}
export interface PostMaterialsRequest {
  file: File;
  studyId: string;
}
