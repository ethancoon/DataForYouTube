import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { type TopVideos } from "../../types";

const TopVideos = ({ topVideos }: { topVideos: TopVideos[] }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Top Videos:
      </Typography>
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
                  width: "100px",
                  height: "100%",
                  objectFit: "cover", // Ensure the image covers the container
                }}
              />
            </Box>
            <ListItemText
              primary={
                video.titleUrl ? (
                  <a href={video.titleUrl} style={{ color: "#00FF00" }}>
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
    </div>
  );
};

export default TopVideos;
