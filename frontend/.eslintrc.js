module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12
  },
  plugins: [
    'react'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-boolean-value': 0,
    'no-use-before-define': 0,
    'no-debugger': 0,
    'import/prefer-default-export': 0,
    camelcase: 0,
    'global-require': 0
  }
};
