// @ts-check

/** @type {import('eslint').Linter.Config} */
module.exports = {
    $schema: 'http://json.schemastore.org/eslintrc',
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    parser: '@typescript-eslint/parser',
    extends: ['plugin:astro/recommended', 'plugin:astro/jsx-a11y-recommended', 'prettier'],
    overrides: [
        {
            files: ['*.astro'],
            parser: 'astro-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.astro'],
            },
            rules: {},
        },
        {
            // ensures to also lint these extensions
            files: ['*.cjs', '*.mjs', '*.ts'],
        },
    ],
    // improves performance by ignoring node_modules
    ignorePatterns: ['node_modules', 'bun.lockb', 'LICENSE', '*.md', 'src/declarations/**', '*.mo', '*.svg'],
}
