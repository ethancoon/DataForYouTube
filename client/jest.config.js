export default {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
