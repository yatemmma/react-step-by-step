module.exports = {
    "roots": [
        "<rootDir>/src",
        "<rootDir>/tests",
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts", "tsx", "js", "jsx"
    ],
    "snapshotSerializers": ["enzyme-to-json/serializer"],
}