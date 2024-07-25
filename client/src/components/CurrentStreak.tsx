import { type Streak } from "../types";

const CurrentStreak = ({ streaks }: { streaks: Streak[] }) => {
  const currentStreak = streaks.reduce((acc, streak) =>
    acc.length > streak.length ? acc : streak,
  );
  return (
    <div>
      <h4>Current Streak:</h4>
      <p>
        {currentStreak.length} days from {currentStreak.start} to{" "}
        {currentStreak.end}
      </p>
    </div>
  );
};

export default CurrentStreak;
