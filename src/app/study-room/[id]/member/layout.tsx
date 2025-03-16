import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="col-span-12 flex h-full flex-col gap-5 tablet:col-span-10">
      {children}
    </div>
  );
};

export default layout;
