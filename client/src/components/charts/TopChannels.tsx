import { type FavoriteChannels } from "../../types";

const TopChannels = ({
  favoriteChannels,
}: {
  favoriteChannels: FavoriteChannels[];
}) => {
  return (
    <div>
      <h4>Favorite Channels:</h4>
      <ul>
        {favoriteChannels.map((channel) => (
          <li key={channel.name}>
            {channel.channelUrl && (
              <a href={channel.channelUrl}>{channel.name}</a>
            )}
            {!channel.channelUrl && channel.name} ({channel.count})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopChannels;
