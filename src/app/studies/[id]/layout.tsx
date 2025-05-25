import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col items-center gap-7">{children}</section>
  );
};

export default layout;
