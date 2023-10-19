// @ts-check

const project = './tsconfig.eslint.json'

/** @type {import('eslint').Linter.Config} */
module.exports = {
    $schema: 'http://json.schemastore.org/eslintrc',
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: [
        'plugin:astro/recommended',
        'plugin:astro/jsx-a11y-recommended',
        'plugin:tailwindcss/recommended',
        'prettier',
    ],
    plugins: ['preferred-import'],
    overrides: [
        {
            files: ['*.astro'],
            parser: 'astro-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                project: true,
                extraFileExtensions: ['.astro'],
            },
            rules: { 'preferred-import/ts-imports': 'error' },
        },
        {
            files: ['**/*.{ts,tsx}'],
            parser: '@typescript-eslint/parser',
            parserOptions: { project },
            rules: { 'preferred-import/ts-imports': 'error' },
        },
        {
            // ensures to also lint these extensions
            files: ['*.cjs', '*.mjs'],
        },
    ],
    // improves performance by ignoring node_modules
    ignorePatterns: ['node_modules', 'bun.lockb', 'LICENSE', '*.md', 'src/declarations/**', '*.mo', '*.svg'],
}
