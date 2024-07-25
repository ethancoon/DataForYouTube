import { useState, useEffect } from "react";
import { Video, AnalysisResults } from "../types";
import YouTubeUsageChart from "../components/charts/HourlyUsageChart";
import CurrentStreak from "../components/CurrentStreak";
import TopChannels from "../components/charts/TopChannels";
import TopVideos from "../components/charts/TopVideos";
import TotalUsageChart from "../components/charts/TotalUsageChart";
import {
  getTopVideos,
  getMostActiveWatchTimes,
  getFavoriteChannels,
  getLongestStreaks,
  getMostActiveDayWatchtimes,
  getActivityPerDate,
} from "../utils/dataProcessing";
import { Box, Typography, Paper } from "@mui/material";

interface ResultsProps {
  fileContent: Video[] | null;
}

const Results: React.FC<ResultsProps> = ({ fileContent }: ResultsProps) => {
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResults | null>(null);

  useEffect(() => {
    if (fileContent) {
      analyzeData(fileContent);
    }
  }, [fileContent]);

  const analyzeData = (data: Video[]) => {
    const videos = data;

    const topVideos = getTopVideos(videos);
    const activeTimes = getMostActiveWatchTimes(videos);
    const activeDayTimes = getMostActiveDayWatchtimes(videos);
    const totalUsagePerDay = getActivityPerDate(videos);
    const favoriteChannels = getFavoriteChannels(videos);
    const streaks = getLongestStreaks(videos);

    setAnalysisResults({
      topVideos,
      activeTimes,
      activeDayTimes,
      totalUsagePerDay,
      favoriteChannels,
      streaks,
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      {analysisResults && (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontSize: 35,
                fontWeight: "bold",
              }}
            >
              Analysis Results:
            </Typography>
            <Box
              sx={{
                borderBottom: 2,
                borderColor: "red",
                width: "25%",
                marginBottom: 5,
              }}
            ></Box>
          </Box>
          {/* Flex container for side-by-side layout */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              alignItems: "stretch",
              gap: 4,
            }}
          >
            {/* Left half - Charts */}
            <Box
              sx={{
                flex: "1 1 45%",
                paddingRight: 2,
                minWidth: "300px",
                boxSizing: "border-box",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <YouTubeUsageChart analysisResults={analysisResults} />

              <Box sx={{ height: "400px", marginTop: 10 }}>
                <TotalUsageChart
                  countsPerDay={analysisResults.totalUsagePerDay}
                />
              </Box>

              <Box sx={{ marginTop: 10 }}>
                <CurrentStreak streaks={analysisResults.streaks} />
              </Box>
            </Box>
            {/* Right half - Top Videos and Top Channels */}
            <Box
              sx={{
                flex: "1 1 45%",
                paddingLeft: 2,
                minWidth: "300px",
                boxSizing: "border-box",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
              }}
            >
              <Paper
                sx={{
                  height: 800,
                  overflowY: "scroll",
                  padding: 2,
                  width: "60%",
                  minWidth: "350px",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Top Videos:
                </Typography>
                <TopVideos topVideos={analysisResults.topVideos} />
              </Paper>
              <Paper
                sx={{
                  height: 800,
                  overflowY: "scroll",
                  padding: 2,
                  width: "60%",
                  minWidth: "350px",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Top Channels:
                </Typography>
                <TopChannels
                  favoriteChannels={analysisResults.favoriteChannels}
                />
              </Paper>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Results;
