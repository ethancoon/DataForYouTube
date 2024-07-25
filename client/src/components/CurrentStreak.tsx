import { type Streak } from "../types";
import { Typography } from "@mui/material";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const CurrentStreak = ({ streaks }: { streaks: Streak[] }) => {
  // the streak most recently started
  console.log(streaks);
  const currentStreak = streaks[0];
  const longestStreak = streaks.reduce((acc, streak) =>
    acc.length > streak.length ? acc : streak,
  );
  console.log(currentStreak);
  console.log(longestStreak);

  const formattedCurrentStart = formatDate(currentStreak.start);
  const formattedCurrentEnd = formatDate(currentStreak.end);
  const formattedLongestStart = formatDate(longestStreak.start);
  const formattedLongestEnd = formatDate(longestStreak.end);

  if (currentStreak.length === longestStreak.length) {
    return (
      <div>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: 25,
            fontWeight: "bold",
            paddingLeft: 10,
          }}
        >
          Streaks
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: 75,
            fontWeight: "bold",
            paddingLeft: 20,
          }}
        >
          {currentStreak.length} days from {formattedCurrentStart} to{" "}
          {formattedCurrentEnd}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: 45,
            fontWeight: "bold",
            paddingLeft: 20,
          }}
        >
          This is your longest streak!
        </Typography>
      </div>
    );
  }

  // return current streak and longest streak
  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: 25,
          fontWeight: "bold",
          paddingLeft: 10,
        }}
      >
        Streaks
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: 75,
          fontWeight: "bold",
          paddingLeft: 20,
        }}
      >
        {currentStreak.length} days from {formattedCurrentStart} to{" "}
        {formattedCurrentEnd}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: 45,
          fontWeight: "bold",
          paddingLeft: 20,
        }}
      >
        Your longest streak was {longestStreak.length} days from{" "}
        {formattedLongestStart} to {formattedLongestEnd}
      </Typography>
    </div>
  );
};

export default CurrentStreak;
