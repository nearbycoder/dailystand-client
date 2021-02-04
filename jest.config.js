module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/**/*.test.(js|jsx)'], // finds test
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^auth(.*)$': '<rootDir>/src/auth$1',
    '^layout(.*)$': '<rootDir>/src/layout$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^queries(.*)$': '<rootDir>/src/queries$1',
    '^config(.*)$': '<rootDir>/src/config$1',
  },
};
