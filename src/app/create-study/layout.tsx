import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-5 px-3">{children}</div>;
};

export default layout;
