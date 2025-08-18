import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import beanbag from '@beanbag/eslint-plugin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    allConfig: js.configs.all,
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default defineConfig([{
    extends: compat.extends('plugin:@beanbag/recommended'),

    plugins: {
        '@beanbag': beanbag,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },
    },
}]);
