import {
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Chip,
} from "@mui/material";

const GamesList = ({ games }) => {
  if (!games.length) {
    return (
      <Typography color="text.secondary">
        Select a month to view games
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {games.map((game) => (
        <Grid item xs={12} sm={6} key={game.id}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h6" fontWeight={700}>
                  {game.name}
                </Typography>

                <Chip
                  label={`Score: ${game.score}`}
                  color="primary"
                  size="small"
                />

                <Typography variant="body2" color="text.secondary">
                  {new Date(game.date).toDateString()}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GamesList;
