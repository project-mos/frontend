// hooks/usePrivateChatRoom.ts

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import {
  getPrivateChatRoom,
  getPrivateChatRoomByUser,
  getPrivateChatRoomMessages,
  postEnterPrivateChatRoom,
  deletePrivateChatRoom,
} from "@/entities/chat/api/chat.api";
import {
  GetPrivateChatRoomResponse,
  GetPrivateChatRoomByUserResponse,
  GetPrivateChatRoomMessagesResponse,
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

// 개인 채팅방 생성 및 유무 조회 (통합)
export const useGetPrivateChatRoomByUser = (
  userId: string,
  options?: Omit<
    UseQueryOptions<GetPrivateChatRoomByUserResponse>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [...PrivateChatRoomQueryKey.base, "user", userId],
    queryFn: () => getPrivateChatRoomByUser(userId),
    retry: false,
    ...options,
  });
};

// 개인 채팅방 메시지 조회
export const useGetPrivateChatRoomMessages = (
  privateChatRoomId: string,
  options?: Omit<
    UseQueryOptions<GetPrivateChatRoomMessagesResponse>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [...PrivateChatRoomQueryKey.base, "messages", privateChatRoomId],
    queryFn: () => getPrivateChatRoomMessages(privateChatRoomId),
    retry: false,
    ...options,
  });
};

// 개인 채팅방 메시지 조회 (무한 스크롤용)
export const useGetInfinitePrivateChatRoomMessages = (
  privateChatRoomId: string,
  options?: Omit<
    UseInfiniteQueryOptions<GetPrivateChatRoomMessagesResponse>,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >
) => {
  return useInfiniteQuery({
    ...options,
    queryFn: () => getPrivateChatRoomMessages(privateChatRoomId),
    queryKey: [
      ...PrivateChatRoomQueryKey.base,
      "messages-infinite",
      privateChatRoomId,
    ],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      return lastPage.hasNext
        ? lastPage.lastElementId === lastPage.content[0].privateChatMessageId
        : undefined;
    },
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
