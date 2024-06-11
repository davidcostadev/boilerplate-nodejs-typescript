module.exports = {
  extends: ['./eslint-config/general.js', './eslint-config/typescript.js', './eslint-config/unicorn.js'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
    extraFileExtensions: ['.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'jsonc/no-octal-escape': 'off',
      },
    },
    {
      files: ['eslint-config/*.js'],
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js', 'nodemon.json', 'package.json', 'tsconfig.json'],
};
