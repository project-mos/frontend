import Grid from "@/components/atoms/Grid";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid cols={12} gap={5}>
      {children}
    </Grid>
  );
};

export default layout;
