import { Box, List, ListItem, ListItemText, Link } from "@mui/material";
import { type MiscStats } from "./../types";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const MiscStats = ({ miscStats }: { miscStats: MiscStats }) => {
  console.log(miscStats);
  return (
    <Box>
      <List>
        <ListItem>
          <ListItemText
            primary="Total Videos Watched"
            secondary={miscStats.totalVideos.toString()}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Total Channels Watched"
            secondary={miscStats.totalChannels.toString()}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Last Video Watched"
            secondary={
              miscStats.lastVideo ? (
                <>
                  <Link
                    href={miscStats.lastVideo.titleUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    {miscStats.lastVideo.title}
                  </Link>
                  {" on " + formatDate(miscStats.lastVideo.time)}
                </>
              ) : (
                "N/A"
              )
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="First Video Watched"
            secondary={
              miscStats.firstVideo ? (
                <>
                  <Link
                    href={miscStats.firstVideo.titleUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    {miscStats.firstVideo.title}
                  </Link>
                  {" on " + formatDate(miscStats.firstVideo.time)}
                </>
              ) : (
                "N/A"
              )
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Longest Binge of One Channel"
            secondary={
              miscStats.longestBinge && miscStats.longestBinge.channel ? (
                <>
                  <Link
                    href={miscStats.longestBinge.channelUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    {miscStats.longestBinge.channel}
                  </Link>
                  {" for " + miscStats.longestBinge.length + " videos"}
                  {" " +
                    (formatDate(miscStats.longestBinge.start) ===
                    formatDate(miscStats.longestBinge.end)
                      ? "on " + formatDate(miscStats.longestBinge.start)
                      : "from " +
                        formatDate(miscStats.longestBinge.start) +
                        " to " +
                        formatDate(miscStats.longestBinge.end))}
                </>
              ) : (
                "N/A"
              )
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default MiscStats;
