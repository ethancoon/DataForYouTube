import { type TopVideos } from "../../types";

const TopVideos = ({ topVideos }: { topVideos: TopVideos[] }) => {
  return (
    <div>
      <h4>Favorite videos:</h4>
      <h4>Top Videos:</h4>
      <ul>
        {topVideos.map((video) => (
          <li key={video.title}>
            <img src={video.thumbnailUrl} alt={video.title} width="120" />{" "}
            {video.titleUrl && <a href={video.titleUrl}>{video.title}</a>}
            {!video.titleUrl && video.title} ({video.count})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopVideos;
