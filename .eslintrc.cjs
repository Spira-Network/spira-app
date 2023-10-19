// @ts-check

const project = './tsconfig.eslint.json'

/** @type {import('eslint').Linter.Config} */
module.exports = {
    $schema: 'http://json.schemastore.org/eslintrc',
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project,
    },
    extends: [
        'plugin:astro/recommended',
        'plugin:astro/jsx-a11y-recommended',
        'plugin:tailwindcss/recommended',
        'prettier',
    ],
    plugins: ['preferred-import'],
    rules: { 'preferred-import/ts-imports': 'error' },
    overrides: [
        {
            files: ['*.astro'],
            parser: 'astro-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                project,
                extraFileExtensions: ['.astro'],
            },
        },
        {
            files: ['**/*.{ts,tsx}'],
        },
        {
            // ensures to also lint these extensions
            files: ['**/*.{c,m}js'],
        },
    ],
    // improves performance by ignoring node_modules
    ignorePatterns: ['node_modules', 'LICENSE', '*.{md,mo,svg,lockb}', 'dist', 'src/declarations'],
}
