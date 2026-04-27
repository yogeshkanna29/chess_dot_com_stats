import { Box, Skeleton } from "@mui/material";

const ChessBoardSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          width: 320,
          aspectRatio: "1 / 1",
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 64 }).map((_, index) => {
          const isDark =
            Math.floor(index / 8) % 2 === 0 ? index % 2 === 1 : index % 2 === 0;

          return (
            <Skeleton
              key={index}
              variant="rectangular"
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: isDark ? "grey.400" : "grey.200",
              }}
            />
          );
        })}
      </Box>
    </>
  );
};

export default ChessBoardSkeleton;

//   <Stack spacing={1}>
//     {/* For variant="text", adjust the height via font-size */}
//     <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

//     {/* For other variants, adjust the size with `width` and `height` */}
//     <Skeleton variant="circular" width={40} height={40} />
//     <Skeleton variant="rectangular" width="100%" height={60} />
//     <Skeleton variant="rounded" width="100%" height={60} />
//   </Stack>
