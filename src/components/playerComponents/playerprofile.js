import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleIcon from "@mui/icons-material/People";

const ChessPlayerProfile = ({ data }) => {
  if (!data) return null;

  return (
    <Paper
      sx={{
        p: 4,
        mt: 3,
        maxWidth: 700,
        mx: "auto",
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      {/* Header: Avatar + Username */}
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <Avatar
          src={data.avatar}
          alt={data.username}
          sx={{ width: 80, height: 80 }}
        />
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {data.username || "Unknown Player"}
          </Typography>
          {data.country && (
            <Typography variant="body2" color="text.secondary">
              {data.country}
            </Typography>
          )}
          {data.league && (
            <Chip label={data.league} size="small" sx={{ mt: 1 }} />
          )}
        </Box>
      </Stack>

      {/* Profile Info Grid */}
      <Grid container spacing={2}>
        {data.player_id && (
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Player ID
            </Typography>
            <Typography variant="body2">{data.player_id}</Typography>
          </Grid>
        )}

        {data.followers !== undefined && (
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Followers
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PeopleIcon fontSize="small" color="action" />
              <Typography variant="body2">{data.followers}</Typography>
            </Stack>
          </Grid>
        )}

        {data.status && (
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Typography variant="body2">{data.status}</Typography>
          </Grid>
        )}

        {data.is_streamer !== undefined && (
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Streaming
            </Typography>
            <Typography variant="body2">
              {data.is_streamer ? "Yes" : "No"}
            </Typography>
          </Grid>
        )}

        {data.joined && (
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Joined
            </Typography>
            <Typography variant="body2">
              {new Date(data.joined * 1000).toDateString()}
            </Typography>
          </Grid>
        )}

        {data.last_online && (
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Last Online
            </Typography>
            <Typography variant="body2">
              {new Date(data.last_online * 1000).toLocaleString()}
            </Typography>
          </Grid>
        )}

        {data["@id"] && (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              size="small"
              href={data["@id"]}
              target="_blank"
              startIcon={<LanguageIcon />}
              disabled
            >
              API Link
            </Button>
          </Grid>
        )}

        {data.url && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="small"
              href={data.url}
              target="_blank"
              color="primary"
            >
              Profile Link
            </Button>
          </Grid>
        )}

        {data.streaming_platforms && data.streaming_platforms.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Streaming Platforms
            </Typography>
            <Stack direction="row" spacing={1} mt={0.5}>
              {data.streaming_platforms.map((platform, i) => (
                <Chip key={i} label={platform} size="small" />
              ))}
            </Stack>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default ChessPlayerProfile;
