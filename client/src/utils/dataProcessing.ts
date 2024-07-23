import { Video, VideoCount, ChannelCount, Streak } from "../types";

const getTopVideos = (videos: Video[]) => {
  const videoCounts: VideoCount = {};
  const result = [];

  for (const video of videos) {
    if (videoCounts[video.title]) {
      videoCounts[video.title]++;
    } else {
      videoCounts[video.title] = 1;
    }
  }

  const sortable = [];
  for (const title in videoCounts) {
    sortable.push({ title, count: videoCounts[title] });
  }
  sortable.sort((a, b) => b.count - a.count);

  const topVideos = sortable.slice(0, 100);

  for (const { title, count } of topVideos) {
    const videoUrl = videos.find((video) => video.title === title)?.titleUrl;
    const videoId = videoUrl?.split("v=")[1];
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    result.push({ title, count, titleUrl: videoUrl, thumbnailUrl });
  }

  return result;
};

const getMostActiveWatchTimes = (videos: Video[]) => {
  const hours = new Array(24).fill(0);

  videos.forEach((video) => {
    const hour = new Date(video.time).getHours();
    hours[hour]++;
  });

  return hours.map((count, hour) => ({ hour, count }));
};

const getFavoriteChannels = (videos: Video[]) => {
  const channelCounts: ChannelCount = {};
  const result = [];

  for (const video of videos) {
    if (video.subtitles && video.subtitles.length > 0) {
      const channelName = video.subtitles[0].name;
      if (channelCounts[channelName]) {
        channelCounts[channelName]++;
      } else {
        channelCounts[channelName] = 1;
      }
    }
  }

  const sortable = [];
  for (const name in channelCounts) {
    sortable.push({ name, count: channelCounts[name] });
  }
  sortable.sort((a, b) => b.count - a.count);

  const topChannels = sortable.slice(0, 100);

  for (const { name, count } of topChannels) {
    const channelUrl = videos.find(
      (video) =>
        video.subtitles &&
        video.subtitles.length > 0 &&
        video.subtitles[0].name === name,
    )?.subtitles[0].url;
    // const channelId = channelUrl?.split("v=")[1];
    // const avatarUrl = `https://img.youtube.com/vi/${channelId}/hqdefault.jpg`;
    result.push({ name, channelUrl, count });
  }

  return result;
};

const getLongestStreaks = (videos: Video[]): Streak[] => {
  const dates = new Set(
    videos.map((video) => new Date(video.time).toISOString().split("T")[0]),
  );

  const sortedDates = Array.from(dates).sort();

  const streaks: Streak[] = [];
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

  // Handle the last streak
  if (currentStreak > 0) {
    streaks.push({
      start: currentStreakStart,
      end: currentStreakEnd,
      length: currentStreak,
    });
  }

  return streaks;
};

export {
  getTopVideos,
  getMostActiveWatchTimes,
  getFavoriteChannels,
  getLongestStreaks,
};
