// hooks/usePrivateChatRoom.ts

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  getPrivateChatRoom,
  getSearchPrivateChatRoom,
  postPrivateChatRoom,
  postEnterPrivateChatRoom,
  deletePrivateChatRoom,
} from "@/entities/chat/api/chat.api";
import {
  GetPrivateChatRoomResponse,
  postPrivateChatRoomResponse,
} from "@/entities/chat/api/chat.api.types";

// Query Key 생성
export const PrivateChatRoomQueryKey = {
  base: ["chat", "privateRoom"] as const,
  detail: (id: string) => [...PrivateChatRoomQueryKey.base, id] as const,
};

// 개인 채팅방 조회
export const useGetPrivateChatRoom = (
  options?: Omit<
    UseQueryOptions<GetPrivateChatRoomResponse>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: PrivateChatRoomQueryKey.base,
    queryFn: () => getPrivateChatRoom(),
    retry: false,
    ...options,
  });
};

// 개인 채팅방 유무 조회(검색)
export const useGetSearchPrivateChatRoom = (
  options?: Omit<UseQueryOptions<number>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [...PrivateChatRoomQueryKey.base, "search"],
    queryFn: () => getSearchPrivateChatRoom(),
    retry: false,
    ...options,
  });
};

// 개인 채팅방 생성
export const usePostPrivateChatRoom = (
  options?: Omit<
    UseMutationOptions<postPrivateChatRoomResponse, unknown, void>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postPrivateChatRoom(),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: PrivateChatRoomQueryKey.base,
      });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

// 개인 채팅방 입장
export const usePostEnterPrivateChatRoom = (
  options?: Omit<UseMutationOptions<unknown, unknown, string>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (privateChatRoomId: string) =>
      postEnterPrivateChatRoom(privateChatRoomId),
    onSuccess: (...args) => {
      const privateChatRoomId = args[1];
      queryClient.invalidateQueries({
        queryKey: PrivateChatRoomQueryKey.detail(privateChatRoomId),
      });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

// 개인 채팅방 퇴장
export const useDeletePrivateChatRoom = (
  options?: Omit<UseMutationOptions<unknown, unknown, string>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (privateChatRoomId: string) =>
      deletePrivateChatRoom(privateChatRoomId),
    onSuccess: (...args) => {
      const privateChatRoomId = args[1];
      queryClient.invalidateQueries({
        queryKey: PrivateChatRoomQueryKey.detail(privateChatRoomId),
      });
      queryClient.invalidateQueries({
        queryKey: PrivateChatRoomQueryKey.base,
      });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};
