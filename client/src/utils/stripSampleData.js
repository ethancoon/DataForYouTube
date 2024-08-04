import fs from "fs";

// Load your JSON file
const filePath = "./sample-data.json";
let data = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Define the number of sample titles and creators
const numSampleTitles = 100;
const numSampleCreators = 42;

// Create arrays of sample titles and creators
const sampleTitles = Array.from(
  { length: numSampleTitles },
  (_, i) => `Watched Sample Video ${i + 1}`,
);
const sampleCreators = Array.from({ length: numSampleCreators }, (_, i) => ({
  name: `Sample Creator ${i + 1}`,
  url: "/",
}));

// Function to generate a random integer between min (inclusive) and max (exclusive)
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

// Replace the specified fields
data.forEach((video) => {
  const randomTitleIndex = getRandomInt(0, numSampleTitles);
  const randomCreatorIndex = getRandomInt(0, numSampleCreators);

  video.title = sampleTitles[randomTitleIndex];
  video.titleUrl = "/";

  video.subtitles = [
    {
      name: sampleCreators[randomCreatorIndex].name,
      url: sampleCreators[randomCreatorIndex].url,
    },
  ];
});

// Save the changes
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

console.log("Replacement done!");
