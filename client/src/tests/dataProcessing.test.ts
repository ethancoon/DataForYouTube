import {
  getTopVideos,
  getMostActiveDayWatchtimes,
} from "../utils/dataProcessing";
import { Video, DayTimeCount } from "../types";
import * as assert from "assert";

// Unit tests for getMostActiveDayWatchtimes
describe("getMostActiveDayWatchtimes", () => {
  it("should return correct counts for each day of the week", () => {
    const result = getMostActiveDayWatchtimes([
      {
        header: "YouTube",
        title: "Video 1",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-21T10:00:00Z",
        products: [],
        activityControls: [],
      }, // Sunday
      {
        header: "YouTube",
        title: "Video 2",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-22T11:00:00Z",
        products: [],
        activityControls: [],
      }, // Monday
      {
        header: "YouTube",
        title: "Video 3",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-23T12:00:00Z",
        products: [],
        activityControls: [],
      }, // Tuesday
      {
        header: "YouTube",
        title: "Video 4",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-24T13:00:00Z",
        products: [],
        activityControls: [],
      }, // Wednesday
      {
        header: "YouTube",
        title: "Video 5",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-25T14:00:00Z",
        products: [],
        activityControls: [],
      }, // Thursday
      {
        header: "YouTube",
        title: "Video 6",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-26T15:00:00Z",
        products: [],
        activityControls: [],
      }, // Friday
      {
        header: "YouTube",
        title: "Video 7",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-27T16:00:00Z",
        products: [],
        activityControls: [],
      }, // Saturday
      {
        header: "YouTube",
        title: "Video 8",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-21T17:00:00Z",
        products: [],
        activityControls: [],
      }, // Another Sunday
    ]);
    assert.deepStrictEqual(result, [
      { day: "Sunday", count: 2 },
      { day: "Monday", count: 1 },
      { day: "Tuesday", count: 1 },
      { day: "Wednesday", count: 1 },
      { day: "Thursday", count: 1 },
      { day: "Friday", count: 1 },
      { day: "Saturday", count: 1 },
    ]);
  });

  it("should handle an empty array of videos", () => {
    const result = getMostActiveDayWatchtimes([]);
    const emptyOutput: DayTimeCount[] = [
      { day: "Sunday", count: 0 },
      { day: "Monday", count: 0 },
      { day: "Tuesday", count: 0 },
      { day: "Wednesday", count: 0 },
      { day: "Thursday", count: 0 },
      { day: "Friday", count: 0 },
      { day: "Saturday", count: 0 },
    ];
    assert.deepStrictEqual(result, emptyOutput);
  });

  it("should handle videos all on the same day", () => {
    const sameDayVideos: Video[] = [
      {
        header: "YouTube",
        title: "Video 1",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-21T10:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Video 2",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-21T11:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Video 3",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-21T12:00:00Z",
        products: [],
        activityControls: [],
      },
    ];
    const result = getMostActiveDayWatchtimes(sameDayVideos);
    const sameDayOutput: DayTimeCount[] = [
      { day: "Sunday", count: 3 },
      { day: "Monday", count: 0 },
      { day: "Tuesday", count: 0 },
      { day: "Wednesday", count: 0 },
      { day: "Thursday", count: 0 },
      { day: "Friday", count: 0 },
      { day: "Saturday", count: 0 },
    ];
    assert.deepStrictEqual(result, sameDayOutput);
  });

  it("should handle videos on different days", () => {
    const differentDayVideos: Video[] = [
      {
        header: "YouTube",
        title: "Video 1",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-21T10:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Video 2",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-22T11:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Video 3",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-23T12:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Video 4",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-24T13:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Video 5",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-25T14:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Video 6",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-26T15:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Video 7",
        titleUrl: "",
        subtitles: [],
        time: "2024-07-27T16:00:00Z",
        products: [],
        activityControls: [],
      },
    ];
    const result = getMostActiveDayWatchtimes(differentDayVideos);
    const differentDayOutput: DayTimeCount[] = [
      { day: "Sunday", count: 1 },
      { day: "Monday", count: 1 },
      { day: "Tuesday", count: 1 },
      { day: "Wednesday", count: 1 },
      { day: "Thursday", count: 1 },
      { day: "Friday", count: 1 },
      { day: "Saturday", count: 1 },
    ];
    assert.deepStrictEqual(result, differentDayOutput);
  });
});

// Unit tests for getTopVideos
describe("getTopVideos", () => {
  it("should return the correct top videos", () => {
    const result = getTopVideos([
      {
        header: "YouTube",
        title: "Watched Video 1",
        titleUrl: "https://www.youtube.com/watch?v=abc123",
        subtitles: [],
        time: "2024-07-21T10:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Watched Video 2",
        titleUrl: "https://www.youtube.com/watch?v=def456",
        subtitles: [],
        time: "2024-07-22T11:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Watched Video 1",
        titleUrl: "https://www.youtube.com/watch?v=ghi789",
        subtitles: [],
        time: "2024-07-23T12:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Video 3",
        titleUrl: "https://www.youtube.com/watch?v=jkl012",
        subtitles: [],
        time: "2024-07-24T13:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Video 3",
        titleUrl: "https://www.youtube.com/watch?v=mno345",
        subtitles: [],
        time: "2024-07-25T14:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Watched Video 2",
        titleUrl: "https://www.youtube.com/watch?v=pqr678",
        subtitles: [],
        time: "2024-07-26T15:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Watched Video 2",
        titleUrl: "https://www.youtube.com/watch?v=stu901",
        subtitles: [],
        time: "2024-07-27T16:00:00Z",
        products: [],
        activityControls: [],
      },
    ]);
    assert.deepStrictEqual(result, [
      {
        title: "Video 2",
        count: 3,
        titleUrl: "https://www.youtube.com/watch?v=def456",
        thumbnailUrl: "https://img.youtube.com/vi/def456/mqdefault.jpg",
      },
      {
        title: "Video 1",
        count: 2,
        titleUrl: "https://www.youtube.com/watch?v=abc123",
        thumbnailUrl: "https://img.youtube.com/vi/abc123/mqdefault.jpg",
      },
      {
        title: "Video 3",
        count: 2,
        titleUrl: "https://www.youtube.com/watch?v=jkl012",
        thumbnailUrl: "https://img.youtube.com/vi/jkl012/mqdefault.jpg",
      },
    ]);
  });

  it('should handle videos with "Watched" prefix in the title', () => {
    const videosWithWatchedPrefix: Video[] = [
      {
        header: "YouTube",
        title: "Watched Sample Video 1",
        titleUrl: "https://www.youtube.com/watch?v=xyz123",
        subtitles: [],
        time: "2024-07-28T10:00:00Z",
        products: [],
        activityControls: [],
      },
      {
        header: "YouTube",
        title: "Sample Video 1",
        titleUrl: "https://www.youtube.com/watch?v=abc456",
        subtitles: [],
        time: "2024-07-29T11:00:00Z",
        products: [],
        activityControls: [],
      },
    ];
    const expectedVideos = [
      {
        title: "Sample Video 1",
        count: 2,
        titleUrl: "https://www.youtube.com/watch?v=xyz123",
        thumbnailUrl: "https://img.youtube.com/vi/xyz123/mqdefault.jpg",
      },
    ];
    const result = getTopVideos(videosWithWatchedPrefix);
    assert.deepStrictEqual(result, expectedVideos);
  });

  it("should handle an empty array of videos", () => {
    const result = getTopVideos([]);
    assert.deepStrictEqual(result, []);
  });

  it("should return a maximum of 100 top videos", () => {
    const manyVideos: Video[] = [];
    for (let i = 1; i <= 200; i++) {
      manyVideos.push({
        header: "YouTube",
        title: `Video ${i}`,
        titleUrl: `https://www.youtube.com/watch?v=video${i}`,
        subtitles: [],
        time: `2024-07-${i}T10:00:00Z`,
        products: [],
        activityControls: [],
      });
    }
    const result = getTopVideos(manyVideos);
    assert.strictEqual(result.length, 100);
  });
});
