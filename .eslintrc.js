module.exports = {
  root: true,
  extends: '@daotl/eslint-config/typescript',
  overrides: [
    {
      files: '*.ts',
      excludedFiles: ['*.mdx', '**/*.md/*.ts'],
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  ],
}
