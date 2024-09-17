module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true
  },
  parser: '@babel/eslint-parser',
  extends: ['next/core-web-vitals', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: './jsconfig.json',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-anonymous-default-export': 'off',

    // add new line above comment
    'lines-around-comment': [
      'error',
      {
        beforeLineComment: true,
        beforeBlockComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true
      }
    ],

    // add new line below import
    'import/newline-after-import': [
      'error',
      {
        count: 1
      }
    ],

    'padding-line-between-statements': 'off', // Disable padding line between statements
    'newline-before-return': 'off', // Disable newline before return statement
    'react-hooks/exhaustive-deps': 'warn', // Change to warn instead of error
    'jsx-a11y/alt-text': 'warn', // Change to warn instead of error
    'lines-around-comment': 'off', // Disable line around comment
  }
}
