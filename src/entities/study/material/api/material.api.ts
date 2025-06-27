import {
  GetMaterialsRequest,
  GetMaterialsResponse,
  PostMaterialsRequest,
} from "@/entities/study/material/api/material.api.types";
import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";

export async function getMaterials({ studyId }: GetMaterialsRequest) {
  const { url, method } = API_ENDPOINT.materials.getMaterials(studyId);

  return await fetchAPI<GetMaterialsResponse>(url, {
    credentials: "include",
    method: method,
  });
}

export async function getMaterial(studyId: string, materialId: string) {
  const { url, method } = API_ENDPOINT.materials.getMaterial(
    studyId,
    materialId
  );

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
  });
}

export async function postMaterials({ file, studyId }: PostMaterialsRequest) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "STUDY");

  const { url, method } = API_ENDPOINT.materials.postMaterials(studyId);

  const response = await fetchAPI(url, {
    credentials: "include",
    body: formData,
    method: method,
  });

  if (!response) {
    throw new Error("파일 업로드 실패");
  }
  return response;
}
