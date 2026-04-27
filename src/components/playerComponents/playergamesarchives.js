import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";

// Helper to group archives by year
const groupByYear = (archives = []) => {
  return archives.reduce((acc, url) => {
    const parts = url.split("/");
    const year = parts[parts.length - 2];
    const month = parts[parts.length - 1];

    if (!acc[year]) acc[year] = [];
    acc[year].push({ month, url });

    return acc;
  }, {});
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Display a single chess game
const GamesList = ({ game }) => {
  if (!game) {
    return <Typography>Select a month to view a game</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight={700}>
                {game.white?.username} vs {game.black?.username}
              </Typography>

              <Typography variant="body2">
                Result:{" "}
                {game.white?.result === "resigned"
                  ? "Black Wins"
                  : game.white?.result}
              </Typography>

              <Typography variant="body2">
                Ratings: {game.white?.rating} vs {game.black?.rating}
              </Typography>

              <Typography variant="body2">
                Accuracy: White {game.accuracies?.white}% / Black{" "}
                {game.accuracies?.black}%
              </Typography>

              <Typography variant="body2">
                Time Control: {game.time_control} sec
              </Typography>

              {game.eco && (
                <Typography variant="body2">
                  Opening:{" "}
                  <a href={game.eco} target="_blank" rel="noreferrer">
                    ECO Link
                  </a>
                </Typography>
              )}

              {game.url && (
                <Typography variant="body2">
                  <a href={game.url} target="_blank" rel="noreferrer">
                    View Game
                  </a>
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const PlayerGameArchives = ({ data }) => {
  const [game, setGame] = useState(null); // single game object
  const [loading, setLoading] = useState(false);

  if (!data?.archives?.length) return null;

  const grouped = groupByYear(data.archives);

  const handleSelect = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      console.log("response", response);

      setGame(response.data);
    } catch (err) {
      console.error("Error fetching JSON via Axios:", err);
      setGame(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      {/* Archive Month Chips */}
      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <CalendarMonthIcon color="primary" />
            <Typography variant="h5" fontWeight={700}>
              Game Archives
            </Typography>
          </Stack>

          {Object.keys(grouped)
            .sort((a, b) => Number(b) - Number(a))
            .map((year) => (
              <Box key={year} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {year}
                </Typography>

                <Grid container spacing={1}>
                  {grouped[year]
                    .sort((a, b) => Number(b.month) - Number(a.month))
                    .map(({ month, url }) => (
                      <Grid item key={url}>
                        <Chip
                          clickable
                          label={monthNames[Number(month) - 1]}
                          onClick={() => handleSelect(url)}
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            ))}
        </CardContent>
      </Card>

      {/* Display fetched game */}
      <Box>{loading ? <CircularProgress /> : <GamesList game={game} />}</Box>
    </Stack>
  );
};

export default PlayerGameArchives;
