import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { type FavoriteChannels } from "../../types";

const TopChannels = ({
  favoriteChannels,
}: {
  favoriteChannels: FavoriteChannels[];
}) => {
  return (
    <Box>
      <List>
        {favoriteChannels.map((channel) => (
          <ListItem
            key={channel.name}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ListItemText
              primary={
                channel.channelUrl ? (
                  <Link
                    href={channel.channelUrl}
                    color="primary"
                    underline="hover"
                  >
                    {channel.name}
                  </Link>
                ) : (
                  <Typography variant="body1">{channel.name}</Typography>
                )
              }
              secondary={`(${channel.count} Videos Watched)`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TopChannels;
