// total number of videos watched
// total number of channels watched
// first video watched
// last video watched
// longest binge of one channel

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { type Video, type FavoriteChannels } from "./../types";

const MiscStats = ({
  videos,
  favoriteChannels,
}: {
  videos: Video[];
  favoriteChannels: FavoriteChannels[];
}) => {
  const totalVideos = videos.length;
  const totalChannels = favoriteChannels.length;

  const firstVideo = videos[0];
  const lastVideo = videos[videos.length - 1];

  const streaks = getLongestStreaks(videos);
  const longestStreak = streaks.reduce((a, b) => (a.length > b.length ? a : b));

  const binge = getLongestBinge(videos);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Misc Stats
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={`Total Videos Watched: ${totalVideos}`}
            secondary={`First Video Watched: ${firstVideo.title}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Total Channels Watched: ${totalChannels}`}
            secondary={`Last Video Watched: ${lastVideo.title}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Longest Streak: ${longestStreak.length} days`}
            secondary={`From ${longestStreak.start} to ${longestStreak.end}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Longest Binge: ${binge.length} days`}
            secondary={`From ${binge.start} to ${binge.end}`}
          />
        </ListItem>
      </List>
    </Box>
  );
}

export default MiscStats;