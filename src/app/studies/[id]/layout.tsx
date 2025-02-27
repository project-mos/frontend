import Card from "@/components/atoms/Card";
import React from "react";

const StudiesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Card className="col-span-8  flex flex-col mr-2 min-h-screen ">
        layout.tsx{children}
      </Card>
      <Card className="col-span-4 flex flex-col h-20 ">
        layout.tsx{children}
      </Card>
    </>
  );
};

export default StudiesLayout;
