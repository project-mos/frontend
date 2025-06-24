import Grid from "@/shared/components/atoms/Grid";

const LandingGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      cols={1}
      gap={3}
      className="gap-y-4 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4"
    >
      {children}
    </Grid>
  );
};

export default LandingGrid;
