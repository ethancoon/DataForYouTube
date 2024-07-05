import { useState } from "react";

const FileUpload = () => {
  const [fileContent, setFileContent] = useState(null);
  const [error, setError] = useState<string>("");
  const [analysisResults, setAnalysisResults] = useState(null);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          setFileContent(json);
          setError(null);
        } catch (err) {
          setError("Failed to parse JSON file");
        }
      };
      reader.onerror = () => {
        setError("Failed to read file");
      };
      reader.readAsText(file);
    }
  };

  const analyzeData = (data) => {
    const videos = data;

    const topVideos = getTopVideos(videos);
    console.log(topVideos);
    const activeTimes = getMostActiveWatchTimes(videos);
    console.log(activeTimes);
    const favoriteChannels = getFavoriteChannels(videos);
    console.log(favoriteChannels);
    const streaks = getLongestStreaks(videos);
    console.log(streaks);

    setAnalysisResults({
      topVideos,
      activeTimes,
      favoriteChannels,
      streaks,
    });
  };

  const getTopVideos = (videos) => {
    const videoCounts = videos.reduce((acc, video) => {
      acc[video.title] = (acc[video.title] || 0) + 1;
      return acc;
    }, {});

    const sortedVideos = Object.entries(videoCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([title, count]) => ({ title, count }));

    return sortedVideos;
  };

  const getMostActiveWatchTimes = (videos) => {
    const hours = new Array(24).fill(0);

    videos.forEach((video) => {
      const hour = new Date(video.time).getHours();
      hours[hour]++;
    });

    return hours.map((count, hour) => ({ hour, count }));
  };

  const getFavoriteChannels = (videos) => {
    const channelCounts = videos.reduce((acc, video) => {
      // Check if subtitles exist and are not empty before accessing
      if (video.subtitles && video.subtitles.length > 0) {
        const channel = video.subtitles[0].name;
        acc[channel] = (acc[channel] || 0) + 1;
      }
      // return only the first 10 results
      return acc;
    }, {});

    const sortedChannels = Object.entries(channelCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
      .slice(0, 100);

    return sortedChannels;
  };

  const getLongestStreaks = (videos) => {
    const dates = new Set(
      videos.map((video) => new Date(video.time).toISOString().split("T")[0]),
    );

    const sortedDates = Array.from(dates).sort();

    const streaks = [];
    let currentStreakStart = sortedDates[0];
    let currentStreakEnd = sortedDates[0];
    let currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currDate = new Date(sortedDates[i]);
      const diffInTime = currDate.getTime() - prevDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      if (diffInDays === 1) {
        currentStreak++;
        currentStreakEnd = sortedDates[i];
      } else {
        streaks.push({
          start: currentStreakStart,
          end: currentStreakEnd,
          length: currentStreak,
        });
        currentStreak = 1;
        currentStreakStart = sortedDates[i];
        currentStreakEnd = sortedDates[i];
      }
    }

    // Add the last streak
    streaks.push({
      start: currentStreakStart,
      end: currentStreakEnd,
      length: currentStreak,
    });

    // Sort streaks by length in descending order and take the top 3
    const topStreaks = streaks.sort((a, b) => b.length - a.length).slice(0, 3);

    // Example of printing the top 3 streaks
    topStreaks.forEach((streak, index) => {
      console.log(
        `Streak ${index + 1}: Start Date: ${streak.start}, End Date: ${streak.end}, Length: ${streak.length} days`,
      );
    });

    return topStreaks;
  };

  const processFileContent = () => {
    if (fileContent) {
      analyzeData(fileContent);
    }
  };

  return (
    <div>
      <h2>Upload YouTube Watch History</h2>
      <input type="file" accept=".json" onChange={onFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileContent && (
        <div>
          <h3>File Content:</h3>
          <button onClick={processFileContent}>Process Data</button>
          {analysisResults && (
            <div>
              <h3>Analysis Results:</h3>
              <div>
                <h4>Top Videos:</h4>
                <ul>
                  {analysisResults.topVideos.map((video) => (
                    <li key={video.title}>
                      {video.title} ({video.count})
                    </li>
                  ))}
                </ul>
              </div>
              <h4>Most Active Watch Times:</h4>
              <ul>
                {analysisResults.activeTimes.map((time) => (
                  <li key={time.hour}>
                    {time.hour}:00 - {time.count}
                  </li>
                ))}
              </ul>

              <h4>Favorite Channels:</h4>
              <ul>
                {analysisResults.favoriteChannels.map((channel) => (
                  <li key={channel.name}>
                    {channel.name} ({channel.count})
                  </li>
                ))}
              </ul>
              <h4>Longest Streaks:</h4>
              <ul>
                {analysisResults.streaks.map((streak, index) => (
                  <li key={index}>
                    Streak {index + 1}: {streak.length} days
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
