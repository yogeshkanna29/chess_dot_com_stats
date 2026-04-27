import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from "@mui/material";
import chessComImg from "../assets/img/chesscom.jpeg";
import KingIcon from "@mui/icons-material/EmojiEvents";
import ChessInsightSkeleton from "../components/skeletonloader/skeletonLoader.js";
import {
  fetchPlayerProfile,
  fetchPlayerStats,
  fetchPlayerGames,
  fetchPlayerGamesToMoves,
  fetchPlayerGamesArchives,
  fetchPlayerGamesMonthlyArchives,
  fetchPlayerGamesArchivesPGN,
  fetchPlayerClubs,
  fetchPlayerTournaments,
  fetchTitledPlayers,
} from "../apiintegration/api.js";
import ChessProfileViewer from "./playerComponents/playerprofile.js";
import PlayerStatsCard from "./playerComponents/playerstats.js";
import PlayerGameArchives from "./playerComponents/playergamesarchives.js"

export default function OverviewPage() {
  const userName = localStorage.getItem("username") || "Guest";
  const [profile, setProfile] = useState(null);
  const [activeTopic, setActiveTopic] = useState("profile");
  const [topicData, setTopicData] = useState(null);
  const [loadingTopic, setLoadingTopic] = useState(false);

  // Load BASIC profile once
  useEffect(() => {
    const loadProfile = async () => {
      setLoadingTopic(true);
      const res = await fetchPlayerProfile(userName);
      setProfile(res?.data);
      setTopicData(res?.data || res);
      setLoadingTopic(false);
    };
    loadProfile();
  }, [userName]);

  // Handle topic click
  const handleTopicClick = async (topicKey) => {
    setActiveTopic(topicKey);
    setLoadingTopic(true);
    setTopicData(null);

    let res;
    switch (topicKey) {
      case "profile":
        res = await fetchPlayerProfile(userName);
        break;
      case "stats":
        res = await fetchPlayerStats(userName);
        break;
      case "games":
        res = await fetchPlayerGames(userName);
        break;
      case "gamesToMove":
        res = await fetchPlayerGamesToMoves(userName);
        break;
      case "archives":
        res = await fetchPlayerGamesArchives(userName);
        break;
      case "monthlyArchives":
        res = await fetchPlayerGamesMonthlyArchives(userName);
        break;
      case "pgn":
        res = await fetchPlayerGamesArchivesPGN(userName);
        break;
      case "clubs":
        res = await fetchPlayerClubs(userName);
        break;
      case "tournaments":
        res = await fetchPlayerTournaments(userName);
        break;
      case "titled":
        res = await fetchTitledPlayers(userName);
        break;
      default:
        res = profile;
    }

    setTopicData(res?.data || res);
    setLoadingTopic(false);
  };

  const topics = [
    { key: "profile", label: "Player Profile" },
    { key: "stats", label: "Player Stats" },
    { key: "games", label: "Player Games" },
    { key: "gamesToMove", label: "Player Games to Move" },
    { key: "archives", label: "Player Game Archives" },
    { key: "monthlyArchives", label: "Player Game Monthly Archives" },
    { key: "pgn", label: "Player Game Archive PGN" },
    { key: "clubs", label: "Player Clubs" },
    { key: "tournaments", label: "Player Tournaments" },
    { key: "titled", label: "Titled Players" },
  ];

  const renderTopicContent = () => {
    switch (activeTopic) {
      case "profile":
        return <ChessProfileViewer data={topicData} />;

      case "stats":
        return <PlayerStatsCard stats={topicData} />;

      // case "games":
      //   return <PlayerGames data={topicData} />;

      // case "gamesToMove":
      //   return <PlayerGamesToMove data={topicData} />;

      case "archives":
        return <PlayerGameArchives data={topicData} />;

      default:
        return null;
    }
  };

  if (!profile || loadingTopic)
    return (
      <ChessInsightSkeleton topic={activeTopic ? activeTopic : "overview"} />
    );

  return (
    <Box sx={{ p: 4 }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Box display="flex" alignItems="center" gap={1}>
          <KingIcon color="primary" />
          <Typography variant="h4" fontWeight={700}>
            Chess.com Player Statistics
          </Typography>
        </Box>

        <Avatar src={profile.avatar}>{userName[0]?.toUpperCase()}</Avatar>
      </Box>

      {/* TOPICS */}
      <Grid container spacing={2}>
        {topics.map((topic) => (
          <Grid item xs={12} sm={6} md={3} key={topic.key}>
            <Card
              sx={{
                cursor: "pointer",
                border:
                  activeTopic === topic.key
                    ? "2px solid #1976d2"
                    : "1px solid #eee",
              }}
              onClick={() => handleTopicClick(topic.key)}
            >
              <CardContent>
                <Typography fontWeight={600}>{topic.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* DETAILS SECTION */}
      <Box mt={4}>
        <Card sx={{ p: 3, minHeight: 200 }}>
          <Typography variant="h6" mb={2}>
            {topics.find((t) => t.key === activeTopic)?.label}
          </Typography>

          {loadingTopic ? (
            <CircularProgress />
          ) : (
            ((
              <pre style={{ fontSize: 14 }}>
                {JSON.stringify(topicData, null, 2)}
              </pre>
            )
            ,
            renderTopicContent()
          )
          )}
        </Card>
      </Box>

      {/* Chess.com image */}
      <Box
        component="img"
        src={chessComImg}
        alt="Chess.com"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          width: 100,
          opacity: 0.85,
          zIndex: 1300,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
