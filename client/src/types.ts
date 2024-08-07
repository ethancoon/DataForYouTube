interface TopVideos {
  title: string;
  count: number;
  titleUrl: string | undefined;
  thumbnailUrl: string;
}

interface FavoriteChannels {
  name: string;
  count: number;
  channelUrl: string | undefined;
}

interface VideoCount {
  [key: string]: number;
}

interface ChannelCount {
  [key: string]: number;
}

interface HourTimeCount {
  hour: number;
  count: number;
}

interface DayTimeCount {
  day: string;
  count: number;
}

interface Streak {
  start: string; // The start date of the streak in ISO format (YYYY-MM-DD)
  end: string; // The end date of the streak in ISO format (YYYY-MM-DD)
  length: number; // The length of the streak in days
}

interface Binge {
  start: string; // The start date of the binge in ISO format (YYYY-MM-DD)
  end: string; // The end date of the binge in ISO format (YYYY-MM-DD)
  length: number; // The length of the binge in days
  videos: Video[];
  channel: string;
  channelUrl: string;
}

interface Video {
  header: string;
  title: string;
  titleUrl: string;
  subtitles: { name: string; url: string }[];
  time: string;
  products: string[];
  activityControls: string[];
}

interface MiscStats {
  totalVideos: number;
  totalChannels: number;
  firstVideo: Video;
  lastVideo: Video;
  longestBinge: Binge;
}

interface AnalysisResults {
  topVideos: TopVideos[];
  activeTimes: HourTimeCount[];
  activeDayTimes: DayTimeCount[];
  totalUsagePerDay: DayTimeCount[];
  favoriteChannels: FavoriteChannels[];
  streaks: Streak[];
  miscStats: MiscStats;
}

export type {
  TopVideos,
  FavoriteChannels,
  VideoCount,
  ChannelCount,
  Streak,
  Video,
  AnalysisResults,
  HourTimeCount,
  DayTimeCount,
  MiscStats,
  Binge,
};
