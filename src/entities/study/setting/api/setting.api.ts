import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";

export async function deleteStudy(studyId: string) {
  const { url, method } = API_ENDPOINT.study.deleteStudy(studyId);

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function leaveStudy(studyId: string) {
  const { url, method } = API_ENDPOINT.members.deleteMember(studyId);

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
