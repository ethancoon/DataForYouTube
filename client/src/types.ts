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

interface TimeCount {
  hour: number;
  count: number;
}

interface Streak {
  start: string; // The start date of the streak in ISO format (YYYY-MM-DD)
  end: string; // The end date of the streak in ISO format (YYYY-MM-DD)
  length: number; // The length of the streak in days
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

interface AnalysisResults {
  topVideos: TopVideos[];
  activeTimes: TimeCount[];
  favoriteChannels: FavoriteChannels[];
  streaks: Streak[];
}

export type {
  TopVideos,
  FavoriteChannels,
  VideoCount,
  ChannelCount,
  TimeCount,
  Streak,
  Video,
  AnalysisResults,
};
