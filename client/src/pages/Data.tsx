import { useState } from "react";
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

interface DataProps {
  fileContent: Video[] | null;
}

const Data: React.FC<DataProps> = ({ fileContent }: DataProps) => {
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResults | null>(null);

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

  const processFileContent = () => {
    if (fileContent) {
      analyzeData(fileContent);
    }
  };

  return (
    <div>
      {fileContent && (
        <div>
          <h3>File Content:</h3>
          <button onClick={processFileContent}>Process Data</button>
          {analysisResults && (
            <div>
              <h3>Analysis Results:</h3>
              <div>
                <div style={{ width: "400px", height: "200px" }}>
                  <YouTubeUsageChart analysisResults={analysisResults} />
                </div>
                <div>
                  <h3>Longest Streaks:</h3>
                  <StreaksChart streaks={analysisResults.streaks} />
                  {/* Other components */}
                  {/* <StreaksChart2 /> */}
                </div>
              </div>
              <TopVideos topVideos={analysisResults.topVideos} />
              <TopChannels
                favoriteChannels={analysisResults.favoriteChannels}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Data;
