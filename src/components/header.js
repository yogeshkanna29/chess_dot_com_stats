import Typography from "@mui/material/Typography";

export const HeaderSkeleton = () => {
  return (
    <>
      <Typography variant="h6" fontWeight={600}>
        Chess Insight
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Chess.com player statistics
      </Typography>
    </>
  );
};

export default HeaderSkeleton;
