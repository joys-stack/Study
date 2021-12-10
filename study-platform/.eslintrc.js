module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    'semi': [2, 'never'],
    'no-var': 0,
    'no-mixed-spaces-and-tabs': [2, false],
    'dot-notation': ['off', {
      'allowKeywords': false
    }],
    'space-in-parens': ['off', 'always'],
    'indent': 0
  }
}
