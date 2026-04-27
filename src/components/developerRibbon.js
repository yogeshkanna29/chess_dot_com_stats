import { Box, Typography } from "@mui/material";

const DeveloperRibbon = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24, // moved to bottom
        left: -42, // keep it outside left for the angle
        transform: "rotate(39deg)", // rotate in opposite direction for bottom
        backgroundColor: "#1976d2",
        color: "#fff",
        px: 4,
        py: 1,
        zIndex: 2000,
        boxShadow: 3,
        "&::before": {
          content: '""',
          position: "absolute",
          right: 0, // adjust for bottom-right tip
          top: 0, // position tip upwards
          borderRight: "8px solid #1976d2",
          borderTop: "8px solid transparent",
        },
      }}
    >
      <Typography variant="caption" fontWeight={700} sx={{ letterSpacing: 1 }}>
        DEVELOPED BY YK
      </Typography>
    </Box>
  );
};

export default DeveloperRibbon;
