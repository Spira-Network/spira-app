// @ts-check

/**
 * @typedef {Object} ExtendedOptions
 * @property {string} [$schema]
 * @property {boolean} [astroAllowShorthand]
 */

/** @type {import('prettier').Config & ExtendedOptions} */
export default {
    $schema: 'http://json.schemastore.org/prettierrc',
    arrowParens: 'avoid',
    bracketSameLine: true,
    bracketSpacing: true,
    endOfLine: 'lf',
    jsxSingleQuote: true,
    printWidth: 120,
    proseWrap: 'preserve',
    quoteProps: 'consistent',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    useTabs: false,
    tabWidth: 4,

    // prettier-plugin-astro options
    astroAllowShorthand: true,

    plugins: [
        'prettier-plugin-astro',
        'prettier-plugin-pkg',
        'prettier-plugin-sh',
        '@ottodevs/prettier-plugin-taplo',
        '@prettier/plugin-xml',
    ],

    overrides: [
        { files: '*.astro', options: { parser: 'astro' } },
        { files: ['.editorconfig', '*.toml'], options: { parser: 'taplo' } },
        { files: '*.json', options: { parser: 'json' } },
    ],
}
