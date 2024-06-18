/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/config-eslint/react.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
}
