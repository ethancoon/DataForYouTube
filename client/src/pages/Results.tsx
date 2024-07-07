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
      {fileContent && (
        <Box>
          {analysisResults && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Analysis Results:
              </Typography>
              <Box sx={{ width: 400, height: 200 }}>
                <YouTubeUsageChart analysisResults={analysisResults} />
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Longest Streaks:
                </Typography>
                <StreaksChart streaks={analysisResults.streaks} />
                {/* Other components */}
                {/* <StreaksChart2 /> */}
              </Box>
              <TopVideos topVideos={analysisResults.topVideos} />
              <TopChannels
                favoriteChannels={analysisResults.favoriteChannels}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Results;
