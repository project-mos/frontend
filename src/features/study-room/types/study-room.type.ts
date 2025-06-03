import { SetStateAction } from "react";

import { ModalOnClose, ModalProps } from "@/shared/components/atoms/Modal";
import {
  StudyMemberAttendanceInterface,
  StudyMemberInterface,
} from "@/shared/types/api/study-room";

export interface StudyDetailPageProps {
  params: Promise<{ id: string }>;
}

/* study overview */
export interface RuleInterface {
  ruleNum: number;
  content: string;
}

export interface BenefitInterface {
  benefitNum: number;
  content: string;
}

export interface ContentInputBoxProps {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
  placeholder: string;
  type: "rule" | "benefit";
  studyId: string;
}

export interface InlineInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  placeholder: string;
}

export interface ManageOverviewCardProps {
  rules: string[];
  benefits: string[];
  studyId: string;
}

export interface PreviewBoxProps {
  data: string[];
  setState: React.Dispatch<SetStateAction<boolean>>;
}

/* study member */

export interface MemberCardProps {
  members: StudyMemberInterface[];
  studyId: string;
}

export interface StudyMemberCardProps {
  data: StudyMemberInterface;
  isBest: boolean;
  onChat?: () => void;
  onMore?: () => void;
}

export interface MemberModalProps extends ModalProps {
  onClose: ModalOnClose;
  data?: StudyMemberAttendanceInterface;
}
