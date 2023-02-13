module.exports = {
  root: true,
  extends: '@daotl/eslint-config/typescript',
  plugins: ['codegen'],
  overrides: [
    {
      files: '*.ts',
      excludedFiles: ['*.mdx', '**/*.md/*.ts'],
      parserOptions: {
        project: 'tsconfig.json',
      },
      rules: {
        'codegen/codegen': 'error',
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
  ],
}
