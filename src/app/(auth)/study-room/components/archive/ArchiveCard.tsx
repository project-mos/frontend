"use client";
import {
  getMaterials,
  uploadMaterials,
} from "@/features/study-room/services/study-room.service";
import { FileInterface } from "@/features/study-room/types/study-room.api";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ArchiveCard = () => {
  const params = useParams();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<FileInterface[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadMaterials({ file, studyId: id });
      console.log(result);
    }
  };

  const getMaterialList = async () => {
    const result = await getMaterials({ studyId: id });
    setFileList(result.fileList);
  };

  console.log(fileList);
  useEffect(() => {
    getMaterialList();
  }, []);

  return (
    <Card className="col-span-12 h-fit gap-4 tablet:col-span-9 laptop:col-span-10">
      <Card.Header className="flex items-center justify-between">
        <Typography.SubTitle1>자료실</Typography.SubTitle1>
        <Button.Solid onClick={handleButtonClick} color="Main" active size="sm">
          <i className="bi bi-upload" />
          파일 업로드
        </Button.Solid>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Card.Header>
      <Card.Content>
        <table className="text-surface min-w-full text-left text-sm font-light">
          <thead className="border-b border-neutral-200 font-medium ">
            <tr>
              <th scope="col" className="px-1 py-2 text-[14px] tablet:text-sm">
                파일명
              </th>
              <th scope="col" className="px-1 py-2 text-[14px] tablet:text-sm">
                업로더
              </th>
              <th scope="col" className="px-1 py-2 text-[14px] tablet:text-sm">
                업로드 일자
              </th>
              <th scope="col" className="px-1 py-2 text-[14px] tablet:text-sm">
                크기
              </th>
              <th scope="col" className="px-1 py-2 text-[14px] tablet:text-sm">
                동작
              </th>
            </tr>
          </thead>
          <tbody>
            {fileList.map((file, index) => (
              <tr
                key={index}
                className="border-b border-neutral-200 dark:border-white/10"
              >
                <td className="max-w-[140px] whitespace-nowrap px-1 py-2 font-medium">
                  <div className="flex items-center gap-2 sm-mobile:overflow-x-scroll">
                    <i className="bi bi-file-earmark-text"></i>
                    <Typography.P3 className=" text-[14px] tablet:text-sm">
                      {file.originalName.slice(0, 30)}
                      {file.originalName.length > 30 ? " ..." : ""}
                    </Typography.P3>
                  </div>
                </td>
                <td className="whitespace-nowrap px-1 py-2">
                  <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
                    {file.userId}
                  </Typography.P3>
                </td>
                <td className="whitespace-nowrap px-1 py-2">
                  <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
                    no data
                  </Typography.P3>
                </td>
                <td className="whitespace-nowrap px-1 py-2">
                  <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
                    {file.fileSize}
                  </Typography.P3>
                </td>
                <td className="whitespace-nowrap px-1 py-2">
                  <Button.Icon
                    color="Blue"
                    className="font-bold"
                    size="sm"
                    onClick={() => window.open(file.filePath, "_blank")}
                  >
                    <i className="bi bi-download"></i>
                    <Typography.P3 className="hidden text-[14px] tablet:block">
                      파일 다운로드
                    </Typography.P3>
                  </Button.Icon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Content>
    </Card>
  );
};

export default ArchiveCard;
