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
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
    ],
    plugins: ['unused-imports', 'simple-import-sort', 'preferred-import'],
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project,
            },
        },
    },
    rules: {
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-unresolved': ['error', { ignore: ['^astro'] }],
        'import/order': 'off', // handled by simple-import-sort/imports
        'no-unused-vars': 'off', // handled by unused-imports/no-unused-vars
        'preferred-import/ts-imports': 'error',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
    },
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
