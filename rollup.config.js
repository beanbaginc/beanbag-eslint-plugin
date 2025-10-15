import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';


const extensions = ['.ts'];
const globalsMap = {
    '@eslint/js': 'ESLintJS',
    '@stylistic/eslint-plugin': 'StylisticESLintPlugin',
    '@typescript-eslint/utils': 'TypeScriptESLintUtils',
    'eslint-plugin-jasmine': 'ESLintPluginJasmine',
    'eslint/config': 'ESLintConfig',
    'globals': 'globals',
    'typescript-eslint': 'TypeScriptESLint',
};


export default [
    {
        external: [
            '@eslint/js',
            '@stylistic/eslint-plugin',
            '@typescript-eslint/utils',
            'eslint-plugin-jasmine',
            'eslint/config',
            'globals',
            'typescript-eslint',
        ],
        input: './src/index.ts',
        output: [
            {
                esModule: false,
                file: 'lib/index.js',
                format: 'umd',
                globals: globalsMap,
                name: 'BeanbagESLintPlugin',
                sourcemap: true,
            },
            {
                dir: 'lib/esm',
                format: 'esm',
                globals: globalsMap,
                sourcemap: true,
            },
            {
                dir: 'lib/cjs',
                format: 'cjs',
                globals: globalsMap,
                sourcemap: true,
            },
        ],
        plugins: [
            babel({
                babelHelpers: 'bundled',
                extensions: extensions,
            }),
            resolve({
                extensions: extensions,
                modulePaths: [],
            }),
        ],
    },
    {
        external: [
            '@typescript-eslint/utils/ts-eslint',
        ],
        input: './_build/dts/index.d.ts',
        output: [
            {
                'file': 'lib/index.d.ts',
                'format': 'es',
            },
            {
                'file': 'lib/index.d.mts',
                'format': 'es',
            },
        ],
        plugins: [
            dts.default(),
        ],
    },
];
