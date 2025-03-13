import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useFormContext } from "react-hook-form";
import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import StudyBasicInfo from "../components/StudyBasicInfo";
import StudyMethod from "../components/StudyMethod";
import StudyActions from "../components/StudyActions";
import { StudyFormInterface } from "./CreateStudyForm";
import useValidateForm from "../hooks/useValidateForm";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";

const CreateStudyForm1 = () => {
  const methods = useFormContext<StudyFormInterface>();
  const router = useRouter();
  const validateForm = useValidateForm();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onSubmit = (data: StudyFormInterface) => {
    if (validateForm(data)) {
      router.push("/create-study?step=2");
    }
  };

  const handleClickBackButton = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-auto flex w-full flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex w-full items-center justify-between">
        <Typography.Head3>스터디 만들기</Typography.Head3>
        <Badge>1/3 단계</Badge>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <StudyBasicInfo />
          <StudyMethod />
          <StudyActions
            solidLabel="다음 단계"
            ghostLabel="취소"
            onClickBackButton={handleClickBackButton}
          />
        </form>
      </FormProvider>
      {isOpenModal && (
        <Modal setIsOpenModal={setIsOpenModal}>
          <Modal.Content className="mb-[40px] flex w-[300px] flex-col gap-3 text-center">
            <Typography.Head3>취소하시겠습니까?</Typography.Head3>
            <Typography.P3>
              현재까지 작성하신 내용이 <br />
              저장되지않습니다.
            </Typography.P3>
          </Modal.Content>
          <Modal.Button>
            <Button.Solid
              active
              color="Main"
              onClick={() => {
                setIsOpenModal(false);
                router.push("/");
              }}
            >
              확인
            </Button.Solid>
            <Button.Solid
              active
              color="Gray"
              onClick={() => setIsOpenModal(false)}
            >
              취소
            </Button.Solid>
          </Modal.Button>
        </Modal>
      )}
    </div>
  );
};

export default CreateStudyForm1;
