"use client";

import Curriculum from "../../../studies/components/Curriculum";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { MockCurriculumCardApiResult } from "@/app/mock/api/study-room";
import { useState } from "react";
import { StudyCurriculumCardInterface } from "@/types/api/study-room";

const CurriculumCard = () => {
  // const { modal, openModal, closeModal } = useModal();
  const [isModify, setIsModify] = useState<boolean>(false);

  const [curriculumList, setCurriculumList] = useState<
    StudyCurriculumCardInterface[]
  >(MockCurriculumCardApiResult);

  const handleAddCurriculum = () => {
    setCurriculumList((prev) => {
      return [...prev, { step: "", title: "", content: "" }];
    });
  };

  return (
    <>
      {/* <CurriculumModal isOpen={modal} onClose={closeModal} /> */}
      <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
        <Card.Header className="mb-[20px] justify-between">
          <Typography.SubTitle1>커리큘럼</Typography.SubTitle1>
          <div className="flex gap-2">
            {isModify && (
              <Button.Ghost
                color="Main"
                active
                className="h-[30px] p-0 pl-1.5 pr-3 text-[14px]"
                onClick={handleAddCurriculum}
              >
                <i className="bi bi-plus text-[22px]"></i>
                커리큘럼 추가
              </Button.Ghost>
            )}
            <Button.Solid
              color="Main"
              active
              className="h-[30px] text-[14px]"
              onClick={() => {
                setIsModify((prev) => !prev);
              }}
            >
              {isModify ? "저장" : "수정"}
            </Button.Solid>
            {/* <Button.Ghost color="Blue" active className="h-[30px] text-[14px]">
              <i className="bi bi-upload"></i>
              파일업로드
            </Button.Ghost> */}
          </div>
        </Card.Header>
        <Card.Content>
          <Curriculum
            data={curriculumList}
            isModify={isModify}
            setCurriculumList={setCurriculumList}
          />
        </Card.Content>
      </Card>
    </>
  );
};

export default CurriculumCard;
