module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    // ваши кастомные правила (по желанию)
    'prettier/prettier': 'error',
  },
  settings: {
    react: { version: 'detect' },
  },
};
