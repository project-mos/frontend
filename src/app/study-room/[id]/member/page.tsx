import MemberAttendanceCard from "@/features/study-room/components/member/MemberAttendanceCard";
import MemberCard from "@/features/study-room/components/member/MemberCard";
import React from "react";

const MemberPage = () => {
  return (
    <>
      <MemberCard />
      <MemberAttendanceCard />
    </>
  );
};

export default MemberPage;
