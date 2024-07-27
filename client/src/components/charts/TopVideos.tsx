import React from "react";
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
          <ListItem
            key={video.title}
            sx={{ display: "flex", alignItems: "center", padding: 0 }}
          >
            <Box
              className="video-container"
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                width: "300px",
                height: "150px",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={video.thumbnailUrl}
                alt={video.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  scale: "1.8",

                  objectFit: "cover", // Ensure the image covers the container
                }}
              />
              <Box
                className="video-overlay"
                sx={{
                  position: "absolute",
                  scale: "1.5",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                  backgroundSize: "100% 4px, 100% 100%",
                  zIndex: 1,
                  transition: "transform 0.1s",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0) 70%, rgba(0, 0, 0, 1) 100%)",
                  zIndex: 2,
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
              sx={{ marginLeft: 2 }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TopVideos;
