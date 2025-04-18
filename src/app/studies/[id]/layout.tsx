import React from "react";

import Grid from "@/shared/components/atoms/Grid";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid cols={12} gap={5}>
      {children}
    </Grid>
  );
};

export default layout;
