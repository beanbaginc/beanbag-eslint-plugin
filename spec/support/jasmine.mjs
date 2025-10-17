export default {
    env: {
        forbidDuplicateNames: true,
        random: true,
        stopSpecOnExpectationFailure: false,
    },
    helpers: [
        'helpers/**/*.?(m)js',
    ],
    spec_dir: 'tests',
    spec_files: [
        '**/*[sS]pec.?(m)js',
    ],
};
