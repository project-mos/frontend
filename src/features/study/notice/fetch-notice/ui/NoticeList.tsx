import useFetchNotice from "@/features/study/notice/fetch-notice/model/useFetchNotice";
import Typography from "@/shared/components/atoms/Typography";
import { useNoticeStore } from "@/features/study/notice/fetch-notice/model/fetchNotice.store";
import useMultiModal from "@/shared/hooks/useMultiModal";
import NoticeModal from "@/widget/study-room/notice/ui/NoticeModal";

export const NoticeList = ({ studyId }: { studyId: number }) => {
  // 공지사항 전체 데이터 조회
  const { noticesData } = useFetchNotice(studyId);
  const { setNoticeId } = useNoticeStore();
  const { modal, closeModal, openModal } = useMultiModal();

  return (
    <>
      <div className="flex flex-col gap-2">
        {noticesData?.map((item) => {
          const isCreatorEqualModifier =
            item.creatorNickname !== item.modifierNickname;

          return (
            <div
              key={item.studyNoticeId}
              className="cursor-pointer rounded-md border border-mos-gray-100 px-[15px] py-[10px] hover:border-mos-main hover:bg-gray-50"
              onClick={() => {
                openModal("notice_update");
                setNoticeId(item.studyNoticeId);
              }}
            >
              <div className="flex items-center gap-2">
                <i className="bi bi-exclamation-circle text-orange-600"></i>
                <div className="flex w-full justify-between">
                  <Typography.P3 className="text-[18px]">
                    {item.title}
                  </Typography.P3>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <Typography.P3 className="truncate text-[16px] text-mos-gray-700">
                  {item.content}
                </Typography.P3>
              </div>
              <div className="my-2 border-b border-mos-gray-100"></div>
              <Typography.P3 className="text-[14px] text-mos-gray-500">
                작성자: {item.creatorNickname}
                {isCreatorEqualModifier &&
                  ` | 수정자: ${item.modifierNickname}`}
              </Typography.P3>
            </div>
          );
        })}
      </div>

      {/* 공지사항 수정 모달 */}
      <NoticeModal
        isOpen={modal.get("notice_update")!}
        onClose={() => closeModal("notice_update")}
        studyId={studyId}
      />
    </>
  );
};
