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
              sx={{
                position: "relative",
                overflow: "hidden",
                background: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                width: "200px",
              }}
            >
              <Box
                component="img"
                src={video.thumbnailUrl}
                alt={video.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  transform: "scale(1.95)",
                  filter: "contrast(1.2)",
                  objectFit: "cover",
                  objectPosition: "center",
                  maskImage: `
                    radial-gradient(circle, black 30%, transparent 31%)`,
                  maskSize: "3px 3px",
                  WebkitMaskImage: `
                    radial-gradient(circle, black 30%, transparent 31%)`,
                  WebkitMaskSize: "1px 3px",
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
                    "linear-gradient(to left, rgba(30, 30, 30, 1) 0%, rgba(30, 30, 30, 0.8) 25%, rgba(30, 30, 30, 0.8) 50%, rgba(30, 30, 30, 0.5) 75%, rgba(30, 30, 30, 0.2) 100%)", // Exponential fade out effect to semi-transparent white
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  boxShadow: "0 0 5px rgba(255, 0, 0, 0.5)",
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
