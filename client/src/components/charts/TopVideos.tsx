import { List, ListItem, ListItemText, Box, Paper } from "@mui/material";
import { type TopVideos } from "../../types";

const TopVideos = ({ topVideos }: { topVideos: TopVideos[] }) => {
  return (
    <Paper
      sx={{
        height: 800,
        overflowY: "scroll",
        width: "60%",
        minWidth: "350px",
      }}
    >
      <List>
        {topVideos.map((video) => (
          <ListItem key={video.title} sx={{ display: "flex", padding: 0 }}>
            <Box
              className="video-container"
              sx={{
                height: "100px",
              }}
            >
              <Box
                component="img"
                src={video.thumbnailUrl}
                alt={video.title}
                sx={{
                  padding: "10px",
                  width: "100px",
                  height: "100%",
                  objectFit: "cover", // Ensure the image covers the container
                  borderRadius: "15px",
                }}
              />
            </Box>
            <ListItemText
              primary={
                video.titleUrl ? (
                  <a href={video.titleUrl} style={{ color: "blue" }}>
                    {video.title}
                  </a>
                ) : (
                  video.title
                )
              }
              secondary={`(${video.count})`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopVideos;
