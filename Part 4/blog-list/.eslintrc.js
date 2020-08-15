module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'eol-last': 0,
    'no-console': 0,
    semi: 0,
    'comma-dangle': 0,
  },
};
