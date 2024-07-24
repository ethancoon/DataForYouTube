import { useState, useEffect } from "react";
import { Video, AnalysisResults } from "../types";
import YouTubeUsageChart from "../components/charts/HourlyUsageChart";
import StreaksChart from "../components/charts/StreaksChart";
import TopChannels from "../components/charts/TopChannels";
import TopVideos from "../components/charts/TopVideos";
import WeekUsageHeatmap from "../components/charts/WeekUsageHeatmap";
import {
  getTopVideos,
  getMostActiveWatchTimes,
  getFavoriteChannels,
  getLongestStreaks,
  getMostActiveDayWatchtimes,
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
    const favoriteChannels = getFavoriteChannels(videos);
    const streaks = getLongestStreaks(videos);

    setAnalysisResults({
      topVideos,
      activeTimes,
      activeDayTimes,
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
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: 25,
                  fontWeight: "bold",
                  paddingLeft: 10,
                }}
              >
                YouTube Usage per Hour:
              </Typography>
              <YouTubeUsageChart analysisResults={analysisResults} />

              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: 25,
                  fontWeight: "bold",
                  paddingLeft: 10,
                }}
              >
                YouTube Usage per Day:
              </Typography>
              <Box
                sx={{
                  minWidth: 0,
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <WeekUsageHeatmap
                  activeDayTimes={analysisResults.activeDayTimes}
                />
              </Box>

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
