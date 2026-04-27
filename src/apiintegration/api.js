const BackendUrl = `https://cheess-backend-server.onrender.com`;
// const BackendUrl =`http://localhost:5000`;

export const fetchPlayerProfile = async (userName) => {
  try {
    const response = await fetch(
      `${BackendUrl}/api/player_profile?userName=${userName}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    //
  }
};

export const fetchPlayerStats = async (userName) => {
  try {
    const response = await fetch(
      `${BackendUrl}/api/player_stats?userName=${userName}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    //
  }
};

export const fetchPlayerGames = async (userName) => {
  try {
    const response = await fetch(
      `${BackendUrl}/api/player_games?userName=${userName}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    //
  }
};

export const fetchPlayerGamesToMoves = async (userName) => {
  try {
    const response = await fetch(
      `${BackendUrl}/api/player_games_to_moves?userName=${userName}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    //
  }
};

export const fetchPlayerGamesArchives = async (userName) => {
  try {
    const response = await fetch(
      `${BackendUrl}/api/player_games_to_archives?userName=${userName}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    //
  }
};

export const fetchPlayerGamesMonthlyArchives = async (userName) => {
  try {
    const response = await fetch(
      `${BackendUrl}/api/player_games_monthly_archives?userName=${userName}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    //
  }
};

export const fetchPlayerGamesArchivesPGN = async (userName) => {
  try {
    const response = await fetch(
      `${BackendUrl}/api/player_games_monthly_archives_pgn?userName=${userName}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    //
  }
};

export const fetchPlayerClubs = async (userName) => {
  try {
    const response = await fetch(
      `${BackendUrl}/api/player_clubs?userName=${userName}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    //
  }
};

export const fetchPlayerTournaments = async (userName) => {
  try {
    const response = await fetch(
      `${BackendUrl}/api/player_tournaments?userName=${userName}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    //
  }
};

export const fetchTitledPlayers = async (userName) => {
  try {
    const response = await fetch(
      `${BackendUrl}/api/titled_players?userName=${userName}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    //
  }
};
