module.exports = {
  extends: ['plugin:unicorn/recommended'],
  rules: {
    'unicorn/custom-error-definition': 'error',
    'unicorn/empty-brace-spaces': 'error',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-null': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          req: false,
          res: false,
          db: false,
          arg: false,
          args: false,
          env: false,
          fn: false,
          func: {
            fn: true,
            function: false,
          },
          prop: false,
          props: false,
          ref: false,
          refs: false,
          params: false,
        },
        ignore: ['semVer', 'SemVer'],
      },
    ],
  },
};
