import React from "react";
import { Box, Stack, Typography, Skeleton } from "@mui/material";
import KingIcon from "@mui/icons-material/EmojiEvents";
import ChessBoardSkeleton from "./chessBoardSkeleton.js";

const ChessInsightSkeleton = ({ topic }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        {/* Left: Chess Board Skeleton */}
        <ChessBoardSkeleton />

        {/* Right: Info and Skeletons */}
        <Stack spacing={2} width={300}>
          {/* Header */}
          <Box display="flex" alignItems="center" gap={1}>
            <KingIcon fontSize="medium" />
            <Typography variant="h6" fontWeight={600}>
              Chess Insight
            </Typography>
          </Box>

          {/* Subtext */}
          <Typography variant="body2" color="text.secondary">
            Chess.com player{" "}
            <Box component="span" sx={{ color: "#1976d2", fontWeight: 600 }}>
              {topic}
            </Box>
          </Typography>

          {/* Skeleton placeholders */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" height={15} />
          <Skeleton variant="rectangular" height={15} />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="rectangular" height={20} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChessInsightSkeleton;
