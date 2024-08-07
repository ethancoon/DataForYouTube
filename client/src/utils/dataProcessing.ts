import {
  Video,
  VideoCount,
  ChannelCount,
  Streak,
  DayTimeCount,
  MiscStats,
  Binge,
} from "../types";

const getMostActiveDayWatchtimes = (videos: Video[]): DayTimeCount[] => {
  // Initialize an array to hold the cumulative counts for each day
  const dayCounts: number[] = new Array(7).fill(0);

  // Iterate over the videos to populate the counts
  videos.forEach((video) => {
    const date = new Date(video.time);
    const day = date.getDay();
    dayCounts[day]++;
  });

  // Create an array with the day names and the cumulative counts
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const data: DayTimeCount[] = daysOfWeek.map((day, index) => ({
    day,
    count: dayCounts[index],
  }));

  return data;
};

const getTopVideos = (videos: Video[]) => {
  const videoCounts: VideoCount = {};
  const result = [];

  for (const video of videos) {
    if (video.title.startsWith("Watched")) {
      video.title = video.title.slice(7).trim();
    }

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
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    result.push({ title, count, titleUrl: videoUrl, thumbnailUrl });
  }

  return result;
};

const getMostActiveWatchTimes = (videos: Video[]) => {
  const hours = new Array(24).fill(0);
  const days = new Set<string>();

  videos.forEach((video) => {
    const date = new Date(video.time);
    const hour = date.getHours();
    const day = date.toISOString().slice(0, 10); // Get the date in 'YYYY-MM-DD' format
    days.add(day);
    hours[hour]++;
    console.log(
      `Processed video at ${date.toISOString()} (hour: ${hour}, day: ${day})`,
    );
  });

  const totalDays = days.size || 1; // Avoid division by zero

  console.log(`Total days: ${totalDays}`);
  console.log(`Hours array: ${JSON.stringify(hours)}`);

  return hours.map((cumulative, hour) => ({
    hour,
    count: cumulative / totalDays,
  }));
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

const getActivityPerDate = (videos: Video[]): DayTimeCount[] => {
  if (videos.length === 0) return [];

  // Extract dates from videos
  const dates = videos.map(
    (video) => new Date(video.time).toISOString().split("T")[0],
  );

  // Find the first and last dates
  const sortedDates = dates.sort();
  const firstDate = new Date(sortedDates[0]);
  const lastDate = new Date(sortedDates[sortedDates.length - 1]);

  // Generate all dates between firstDate and lastDate
  const allDates: string[] = [];
  for (let d = new Date(firstDate); d <= lastDate; d.setDate(d.getDate() + 1)) {
    allDates.push(new Date(d).toISOString().split("T")[0]);
  }

  // Count videos for each date
  const activityPerDate = allDates.map((day) => {
    const count = dates.filter((date) => date === day).length;
    return { day, count };
  });

  return activityPerDate;
};

const getLongestBinge = (videos: Video[]): Binge => {
  if (videos.length === 0) {
    return {
      start: "",
      end: "",
      length: 0,
      videos: [],
      channel: "",
      channelUrl: "",
    };
  }

  let longestBinge: Binge = {
    start: "",
    end: "",
    length: 0,
    videos: [],
    channel: "",
    channelUrl: "",
  };

  let currentBinge: Binge = {
    start: "",
    end: "",
    length: 0,
    videos: [],
    channel: "",
    channelUrl: "",
  };

  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];

    if (currentBinge.videos.length === 0) {
      currentBinge = {
        start: video.time,
        end: video.time,
        length: 1,
        videos: [video],
        channel: video.subtitles?.[0]?.name || "",
        channelUrl: video.subtitles?.[0]?.url || "",
      };
    } else if (currentBinge.channel === (video.subtitles?.[0]?.name || "")) {
      currentBinge.end = video.time;
      currentBinge.length++;
      currentBinge.videos.push(video);
    } else {
      if (currentBinge.length > longestBinge.length) {
        longestBinge = { ...currentBinge };
      }
      currentBinge = {
        start: video.time,
        end: video.time,
        length: 1,
        videos: [video],
        channel: video.subtitles?.[0]?.name || "",
        channelUrl: video.subtitles?.[0]?.url || "",
      };
    }
  }

  if (currentBinge.length > longestBinge.length) {
    longestBinge = { ...currentBinge };
  }

  return longestBinge;
};

const getMiscStats = (videos: Video[]): MiscStats => {
  const totalVideos = videos.length;
  const totalChannels = new Set(
    videos
      .map(
        (video) =>
          video.subtitles && video.subtitles[0] && video.subtitles[0].name,
      )
      .filter((name) => name), // Filter out undefined names
  ).size;

  const lastVideo = videos[0];
  const firstVideo = videos[videos.length - 1];

  // longest consecutive
  const binge = getLongestBinge(videos);

  return {
    totalVideos,
    totalChannels,
    firstVideo,
    lastVideo,
    longestBinge: binge,
  };
};

export {
  getTopVideos,
  getMostActiveWatchTimes,
  getFavoriteChannels,
  getLongestStreaks,
  getMostActiveDayWatchtimes,
  getActivityPerDate,
  getMiscStats,
};
