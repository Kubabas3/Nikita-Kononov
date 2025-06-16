// jest.config.js
module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.expo/',
    '/android/',
    '/ios/',
  ],
  transformIgnorePatterns: [
    // Разрешаем транспиляцию этих пакетов внутри node_modules
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo|@unimodules|@babel/runtime)/)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
};
