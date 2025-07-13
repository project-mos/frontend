import { attendances } from "@/shared/api/lib/attendance";
import { auth } from "@/shared/api/lib/auth";
import { benefits } from "@/shared/api/lib/benefits";
import { curriculums } from "@/shared/api/lib/curriculums";
import { join } from "@/shared/api/lib/join";
import { materials } from "@/shared/api/lib/materials";
import { members } from "@/shared/api/lib/member";
import { questions } from "@/shared/api/lib/question";
import { requirement } from "@/shared/api/lib/requirement";
import { rules } from "@/shared/api/lib/rules";
import { schedule } from "@/shared/api/lib/schedule";
import { study } from "@/shared/api/lib/study";
import { user } from "@/shared/api/lib/user";
import { category } from "@/shared/api/lib/category";
import { notice } from "@/shared/api/lib/notice";
import { chat } from "@/shared/api/lib/chat";

// fetcher를 기본 내보내기로 가져옵니다.
import {
  fetchAPI,
  FetchAPIError,
  createJsonRequestInit,
  Method,
} from "@/shared/api/util/fetcher";
import type { ApiEndpoint } from "@/shared/api/util/fetcher";

export const API_ENDPOINT = {
  auth,
  user,
  category,
  schedule,
  study,
  join,
  notice,
  rules,
  benefits,
  chat,
  curriculums,
  members,
  questions,
  attendances,
  materials,
  requirement,
};

export { fetchAPI, createJsonRequestInit, FetchAPIError, Method };
export type { ApiEndpoint };
