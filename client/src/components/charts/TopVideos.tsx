import { List, ListItem, ListItemText, Box, Paper, Link } from "@mui/material";
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
                  <Link href={video.titleUrl} color="primary" underline="hover">
                    {video.title}
                  </Link>
                ) : (
                  video.title
                )
              }
              secondary={`(Watched ${video.count} times)`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopVideos;
