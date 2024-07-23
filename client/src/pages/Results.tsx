import { useState, useEffect } from "react";
import { Video, AnalysisResults } from "../types";
import YouTubeUsageChart from "../components/charts/HourlyUsageChart";
import StreaksChart from "../components/charts/StreaksChart";
import TopChannels from "../components/charts/TopChannels";
import TopVideos from "../components/charts/TopVideos";
import {
  getTopVideos,
  getMostActiveWatchTimes,
  getFavoriteChannels,
  getLongestStreaks,
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
    const favoriteChannels = getFavoriteChannels(videos);
    const streaks = getLongestStreaks(videos);

    setAnalysisResults({
      topVideos,
      activeTimes,
      favoriteChannels,
      streaks,
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      {analysisResults && (
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              marginLeft: 5.5,
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            Analysis Results:
          </Typography>
          {/* Red line separator */}
          <Box
            sx={{
              borderBottom: 2,
              borderColor: "red",
              width: "25%",
              marginBottom: 2,
              marginLeft: 3,
            }}
          ></Box>
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
            {/* Left half - YouTube Usage Chart */}
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
              <Typography variant="h6" gutterBottom>
                YouTube Usage:
              </Typography>
              <YouTubeUsageChart analysisResults={analysisResults} />
              <Typography variant="h6" gutterBottom>
                Longest Streaks:
              </Typography>
              <StreaksChart streaks={analysisResults.streaks} />
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
                  width: "50%",
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
                  width: "50%",
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
