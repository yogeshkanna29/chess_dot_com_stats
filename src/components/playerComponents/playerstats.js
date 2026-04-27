import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
  Link,
  Stack,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StatRow = ({ label, value }) => (
  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={600}>
      {value}
    </Typography>
  </Stack>
);

const RatingHeader = ({ title, rating, best }) => (
  <Stack spacing={0.5}>
    <Typography variant="subtitle2" color="text.secondary">
      {title}
    </Typography>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="h5" fontWeight={700}>
        {rating}
      </Typography>
      {best && (
        <Tooltip title="Best Rating">
          <EmojiEventsIcon color="success" fontSize="small" />
        </Tooltip>
      )}
    </Stack>
  </Stack>
);

const WinRateBar = ({ win, loss, draw }) => {
  const total = win + loss + draw;
  const winPct = total ? Math.round((win / total) * 100) : 0;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="caption">Win Rate</Typography>
        <Typography variant="caption" fontWeight={600}>
          {winPct}%
        </Typography>
      </Stack>
      <LinearProgress variant="determinate" value={winPct} />
    </Box>
  );
};

const ModeCard = ({ title, data, active, onClick }) => (
  <Card
    onClick={onClick}
    variant="outlined"
    sx={{
      borderRadius: 2,
      height: "100%",
      cursor: "pointer",
      transform: active ? "scale(1.05)" : "scale(1)",
      borderColor: active ? "primary.main" : "divider",
      boxShadow: active ? 6 : 1,
      transition: "all 0.25s ease",
    }}
  >
    <CardContent>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={4}>
          <RatingHeader title="Current" rating={data.last.rating} />
          <Typography variant="caption" color="text.secondary">
            RD: {data.last.rd}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <RatingHeader title="Best" rating={data.best.rating} best />
          <Link
            href={data.best.game}
            target="_blank"
            rel="noreferrer"
            underline="hover"
            variant="caption"
          >
            View best game
          </Link>
        </Grid>

        <Grid item xs={12} sm={4}>
          <StatRow label="Wins" value={data.record.win} />
          <StatRow label="Losses" value={data.record.loss} />
          <StatRow label="Draws" value={data.record.draw} />
          {data.record.time_per_move && (
            <StatRow
              label="Avg Time / Move"
              value={`${Math.round(data.record.time_per_move / 60)} min`}
            />
          )}
          {data.record.timeout_percent !== undefined && (
            <StatRow
              label="Timeout %"
              value={`${data.record.timeout_percent}%`}
            />
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <WinRateBar
          win={data.record.win}
          loss={data.record.loss}
          draw={data.record.draw}
        />
      </Box>
    </CardContent>
  </Card>
);

const PlayerStatsCard = ({ stats }) => {
  const [activeMode, setActiveMode] = React.useState(null);
  if (!stats) return null;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <TrendingUpIcon color="primary" />
          <Typography variant="h5" fontWeight={700}>
            Player Performance
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {stats.chess_daily && (
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
              <ModeCard
                title="Daily Chess"
                data={stats.chess_daily}
                active={activeMode === "daily"}
                onClick={() => setActiveMode("daily")}
              />
            </Grid>
          )}

          {stats.chess_rapid && (
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
              <ModeCard
                title="Rapid"
                data={stats.chess_rapid}
                active={activeMode === "rapid"}
                onClick={() => setActiveMode("rapid")}
              />
            </Grid>
          )}

          {stats.chess_blitz && (
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
              <ModeCard
                title="Blitz"
                data={stats.chess_blitz}
                active={activeMode === "blitz"}
                onClick={() => setActiveMode("blitz")}
              />
            </Grid>
          )}

          {stats.chess_bullet && (
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
              <ModeCard
                title="Bullet"
                data={stats.chess_bullet}
                active={activeMode === "bullet"}
                onClick={() => setActiveMode("bullet")}
              />
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {stats.tactics && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Tactics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Chip
                  icon={<EmojiEventsIcon />}
                  label={`Highest: ${stats.tactics.highest?.rating}`}
                  color="success"
                />
              </Grid>
              <Grid item xs={6}>
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`Lowest: ${stats.tactics.lowest?.rating}`}
                  color="warning"
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {stats.puzzle_rush?.best && (
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Puzzle Rush
            </Typography>
            <Chip
              label={`Best Score: ${stats.puzzle_rush.best.score} / ${stats.puzzle_rush.best.total_attempts}`}
              color="primary"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerStatsCard;
