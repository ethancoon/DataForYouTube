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
import { Box, Typography } from "@mui/material";

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
    <Box>
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
            }}
          >
            {/* Left half - YouTube Usage Chart */}
            <Box
              sx={{
                flex: "1 1 50%",
                paddingRight: 2,
                minWidth: "300px",
                boxSizing: "border-box",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                YouTube Usage:
              </Typography>
              <YouTubeUsageChart analysisResults={analysisResults} />
              <Typography variant="h6" gutterBottom>
                Top Videos:
              </Typography>
              <TopVideos topVideos={analysisResults.topVideos} />
            </Box>
            {/* Right half - Longest Streaks and other components */}
            <Box
              sx={{
                flex: "1 1 50%",
                paddingLeft: 2,
                minWidth: "300px",
                boxSizing: "border-box",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Longest Streaks:
              </Typography>
              <StreaksChart streaks={analysisResults.streaks} />
              <Typography variant="h6" gutterBottom>
                Top Channels:
              </Typography>
              <TopChannels
                favoriteChannels={analysisResults.favoriteChannels}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Results;
