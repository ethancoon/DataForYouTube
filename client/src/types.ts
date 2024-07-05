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
  start: string;
  end: string;
  length: number;
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

export type { TopVideos, FavoriteChannels, VideoCount, ChannelCount, TimeCount, Streak, Video, AnalysisResults };