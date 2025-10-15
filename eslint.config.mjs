import beanbag from '@beanbag/eslint-plugin';
import {
    defineConfig,
    globalIgnores,
} from 'eslint/config';


export default defineConfig([
    globalIgnores([
        '_build/**/*',
        'lib/**/*',
        'tests/**/*.js',
    ]),
    beanbag.configs.recommended,
    {
        plugins: {
            '@beanbag': beanbag,
        },
    },
]);
