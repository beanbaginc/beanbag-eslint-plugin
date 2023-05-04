/*
 * Standard rules for Beanbag JavaScript codebases.
 *
 * This defines standard rules and options we use for testing our codebases.
 * It enables a series of rules (all documented below) that code must comply
 * with in order to be committed to our codebases.
 *
 * Several environments and rules are created to help keep organized. In
 * general, codebases should inherit from our ``@beanbag/recommended`` config.
 */

'use strict';


/*
 * A string regex pattern used for `case` fall-through markers in `switch`.
 *
 * See `lines-around-comment` and `no-fallthrough` rules below.
 */
const noFallThroughPattern = '[Ff]alls?\\s?through';


/*
 * Rules for ES5 JavaScript codebases.
 *
 * Note that these do not include ES6 or TypeScript-specific rules. That means
 * trailing commas, for example, are not allowed by default. Those rules are
 * enabled specifically for ES6/TypeScript files.
 */
const es5Config = {
    extends: [
        'eslint:recommended',
    ],

    rules: {
        /*
         * Require space around `=>`.
         *
         * For example:
         *
         *     func(a => true)
         *
         * Not:
         *
         *     func(a=>true)
         *
         * https://eslint.org/docs/latest/rules/arrow-spacing
         */
        'arrow-spacing': [
            'error',
            {
                after: true,
                before: true,
            },
        ],

        /*
         * Require brace styles in the form of:
         *
         *     if (foo) {
         *         ...
         *     } else {
         *         ...
         *     }
         *
         * Single-line inline functions are allowed:
         *
         *     array.map(function(a) { return a + 1; });
         *
         * https://eslint.org/docs/latest/rules/brace-style
         */
        'brace-style': [
            'error',
            '1tbs',
            {
                allowSingleLine: true,
            },
        ],

        /*
         * Disallow trailing commas.
         *
         * This is not safe on ES5. We will enable it on ES6.
         *
         * https://eslint.org/docs/latest/rules/comma-dangle
         */
        'comma-dangle': [
            'error',
            'never',
        ],

        /*
         * Require spaces after a comma, but disallow it before.
         *
         * For example:
         *
         *     a, b, c
         *
         * Not:
         *
         *     a ,b ,c
         *
         * https://eslint.org/docs/latest/rules/comma-spacing
         */
        'comma-spacing': [
            'error',
            {
                after: true,
                before: false,
            },
        ],

        /*
         * Require commas at the end of a line, not before.
         *
         * For example:
         *
         *     [
         *         1,
         *         2,
         *         3,
         *     ]
         *
         * Not:
         *
         *     [
         *         1
         *     ,   2
         *     ,   3
         *     ]
         *
         * https://eslint.org/docs/latest/rules/comma-style
         */
        'comma-style': [
            'error',
            'last',
        ],

        /*
         * Always require braces on statements like `if`. For example:
         *
         * For example:
         *
         *     if (foo) {
         *         ...
         *     }
         *
         * Not:
         *
         *     if (foo)
         *         ...
         *
         * https://eslint.org/docs/latest/rules/curly
         */
        'curly': [
            'error',
            'all',
        ],

        /*
         * Always require a `default` in a `switch`.
         *
         * https://eslint.org/docs/latest/rules/default-case
         */
        'default-case': 'error',

        /*
         * `default` in a `switch` must be last.
         *
         * https://eslint.org/docs/latest/rules/default-case-last
         */
        'default-case-last': 'error',

        /*
         * Require === and !== instead of == and !=.
         *
         * https://eslint.org/docs/latest/rules/eqeqeq
         */
        'eqeqeq': [
            'error',
            'always',
        ],

        /*
         * Disallow spaces before parens in function calls.
         *
         * For example:
         *
         *     foo()
         *
         * Not:
         *
         *     foo ()
         *
         * https://eslint.org/docs/latest/rules/func-call-spacing
         */
        'func-call-spacing': [
            'error',
            'never',
        ],

        /*
         * Rules for managing indentation.
         *
         * https://eslint.org/docs/latest/rules/indent
         */
        'indent': [
            'error',
            4,  // 4-space indentation
            {
                /*
                 * All items within an array definition must be aligned with
                 * the first item on the first line.
                 *
                 * For example:
                 *
                 *     var a = [ 1, 2, 3
                 *               4, 5, 6 ];
                 *
                 *     var b = [
                 *         1,
                 *         2,
                 *         3
                 *     ];
                 *
                 * Not:
                 *
                 *     var a = [ 1, 2, 3,
                 *         4, 5, 6 ];
                 *
                 *     var b = [
                 *         1,
                 *             2,
                 *             3
                 *     ];
                 */
                'ArrayExpression': 'first',

                /*
                 * All arguments in function calls must be aligned with the
                 * first argument on the first line.
                 *
                 * For example:
                 *
                 *     myFunc1(a, b, c,
                 *             d, e, f);
                 *
                 *     myFunc2(
                 *         a, b, c,
                 *         d, e, f
                 *     );
                 *
                 * Not:
                 *
                 *     myFunc1(a, b, c,
                 *         d, e, f);
                 *
                 *     myFunc2(
                 *         a, b, c,
                 *             d, e, f);
                 */
                'CallExpression': {
                    arguments: 'first',
                },

                /*
                 * All parameters in function declarations must be aligned
                 * with the parameter on the first line.
                 *
                 * For example:
                 *
                 *     function myFunc1(a, b, c,
                 *                      d, e, f) {
                 *         ...
                 *     }
                 *
                 *     function myFunc2(
                 *         a,
                 *         b,
                 *         c
                 *     ) {
                 *         ...
                 *     }
                 *
                 * Not:
                 *
                 *     function myFunc1(a, b, c,
                 *         d, e, f) {
                 *         ...
                 *     }
                 *
                 *     function myFunc2(
                 *         a,
                 *             b,
                 *             c
                 *     ) {
                 *         ...
                 *     }
                 */
                'FunctionDeclaration': {
                    body: 1,
                    parameters: 'first',
                },

                /*
                 * All parameters in function expressions must be aligned
                 * with the parameter on the first line.
                 *
                 * For example:
                 *
                 *     var myFunc1 = function(a, b, c,
                 *                            d, e, f) {
                 *         ...
                 *     }
                 *
                 *     var myFunc2 = function(
                 *         a,
                 *         b,
                 *         c
                 *     ) {
                 *         ...
                 *     }
                 *
                 * Not:
                 *
                 *     var myFunc1 = function(a, b, c,
                 *         d, e, f) {
                 *         ...
                 *     };
                 *
                 *     var myFunc2 = function(
                 *         a,
                 *             b,
                 *             c
                 *     ) {
                 *         ...
                 *     };
                 */
                'FunctionExpression': {
                    body: 1,
                    parameters: 'first',
                },

                /*
                 * All imports must either fit on one line, or be indented one
                 * level from the statement.
                 *
                 * For example:
                 *
                 *     import { a, b, c } from 'module';
                 *
                 *     import {
                 *         x,
                 *         y,
                 *         z,
                 *     } from 'module';
                 *
                 * Not:
                 *
                 *     import { a, b,
                 *              c } from 'module';
                 *
                 *     import {
                 *         x,
                 *             y,
                 *             z,
                 *     } from 'module';
                 *
                 * NOTE: This is here instead of in the ES6 ruleset so we
                 *       don't have to override all of indent's config.
                 */
                'ImportDeclaration': 1,

                /*
                 * Disable checking indentation when chaining.
                 *
                 * Ideally we would check, but this doesn't do well with the
                 * following situation:
                 *
                 *     $foo.find('...')
                 *         .children('...')
                 *             .doAThing()
                 *         .end()
                 *         .doSomethingElse();
                 *
                 * So we just disable it.
                 */
                'MemberExpression': 'off',

                /*
                 * All keys within an object definition must be aligned with
                 * the key on the first line.
                 *
                 * For example:
                 *
                 *     var o = [
                 *         key1: 1,
                 *         key2: 2
                 *     ];
                 *
                 * Not:
                 *
                 *     var o = { key1: 1,
                 *         key2: 2
                 *     };
                 */
                'ObjectExpression': 'first',

                /*
                 * `case` statements in a `switch` must be indented one level.
                 *
                 * For example:
                 *
                 *     switch (a) {
                 *         case 1:
                 *             break;
                 *
                 *         default:
                 *             break;
                 *     }
                 *
                 * Not:
                 *
                 *     switch (a) {
                 *     case 1:
                 *         break;
                 *
                 *     default:
                 *         break;
                 *     }
                 */
                'SwitchCase': 1,

                /*
                 * Ignore indentation rules for ternary expressions.
                 *
                 * We don't get much control over these in ESLint, and it's
                 * better just to turn this rule off.
                 */
                'ignoredNodes': [
                    'ConditionalExpression',
                ],

                /*
                 * Disable indentation within global (function() { ...})()
                 * IIFE closures.
                 */
                'outerIIFEBody': 0,
            },
        ],

        /*
         * Require UNIX-style line breaks.
         */
        'linebreak-style': [
            'error',
            'unix',
        ],

        /*
         * Warn on blank lines before the start of comments (single or
         * multi-line), except at the start of blocks.
         *
         * For example:
         *
         *     {
         *         // A thing.
         *         foo();
         *
         *         // Another thing.
         *         bar();
         *     }
         *
         * Not:
         *
         *     {
         *         // A thing.
         *         foo();
         *         // Another thing.
         *         bar();
         *     }
         *
         * https://eslint.org/docs/latest/rules/lines-around-comment
         */
        'lines-around-comment': [
            'warn',
            {
                beforeBlockComment: true,
                beforeLineComment: true,

                allowArrayEnd: true,
                allowArrayStart: true,

                allowBlockEnd: true,
                allowBlockStart: true,

                allowClassEnd: true,
                allowClassStart: true,

                allowObjectEnd: true,
                allowObjectStart: true,

                /*
                 * Special comments used for other purposes.
                 *
                 * We actually set this one to avoid issues with the
                 * "falls through" regex for `case` statements in `switch`
                 * (see the `no-fallthrough` rule).
                 */
                ignorePattern: noFallThroughPattern,
            },
        ],

        /*
         * Enforce a maximum line length, except for gettext()-localized
         * strings or lines with long URLs.
         *
         * https://eslint.org/docs/latest/rules/max-len
         */
        'max-len': [
            'error',
            {
                code: 79,
                ignorePattern: 'gettext\\(.*',
                ignoreUrls: true,
            },
        ],

        /*
         * [Future] This doesn't play well with `spaced-comment` currently.
         *
         * Require multi-line comments to align all `*`'s.
         *
         * https://eslint.org/docs/latest/rules/multiline-comment-style
         */
        /*
        'multiline-comment-style': [
            'error',
            'starred-block',
        ],
        */

        /*
         * Disallow expressions where `=>` usage can lead to confusing code.
         *
         * For example:
         *
         *     var x = a => (1 ? 2 : 3);
         *
         * Not:
         *
         *     var x = a => 1 ? 2 : 3;
         *
         * https://eslint.org/docs/latest/rules/no-confusing-arrow
         */
        'no-confusing-arrow': [
            'error',
            {
                allowParens: true,
            },
        ],

        /*
         * Allow fall-through on `case` statements in a `switch`.
         *
         * This is normally disabled by the recommended ESLint rules. We enable
         * it, but only if the `case` is empty or contains a comment with the
         * regex `/falls?\s?through/i`.
         *
         * https://eslint.org/docs/latest/rules/no-fallthrough
         */
        'no-fallthrough': [
            'error',
            {
                allowEmptyCase: true,
                commentPattern: noFallThroughPattern,
            },
        ],

        /*
         * Disallow allow mixing of spaces and tabs.
         *
         * https://eslint.org/docs/latest/rules/no-mixed-spaces-and-tabs
         */
        'no-mixed-spaces-and-tabs': 'error',

        /*
         * Warn if multiple spaces are found, except for indentation and
         * before inline comments.
         *
         * For example:
         *
         *     var a = 1 + 2;  // This is okay.
         *
         * Not:
         *
         *     var a  =  1  +  2;  // This is not okay.
         *
         * https://eslint.org/docs/latest/rules/no-multi-spaces
         */
        'no-multi-spaces': [
            'warn',
            {
                ignoreEOLComments: true,
            },
        ],

        /*
         * Disallow more than 2 consecutive empty lines.
         *
         * Only one empty line is allowed at the start of the file. None are
         * allowed at the end.
         *
         * https://eslint.org/docs/latest/rules/no-multiple-empty-lines
         */
        'no-multiple-empty-lines': [
            'error',
            {
                'max': 2,
                'maxBOF': 1,
                'maxEOF': 0,
            },
        ],

        /*
         * Allow Object.prototype builtins, like `.hasOwnProperty()`.
         *
         * Normally, ESLint disables these builtins, because they can be
         * a security issue if parsing unsafe JSON input from another
         * place, but we currently need these. We may go back to defaults
         * in the future.
         *
         * https://eslint.org/docs/latest/rules/no-prototype-builtins
         */
        'no-prototype-builtins': 'off',

        /*
         * Disallow tabs.
         *
         * https://eslint.org/docs/latest/rules/no-tabs
         */
        'no-tabs': 'error',

        /*
         * Disallow trailing spaces.
         *
         * https://eslint.org/docs/latest/rules/no-trailing-spaces
         */
        'no-trailing-spaces': 'error',

        /*
         * Warn if there are any unused variables defined in the scope. This
         * won't apply to function arguments.
         *
         * https://eslint.org/docs/latest/rules/no-unused-vars
         */
        'no-unused-vars': [
            'error',
            {
                args: 'none',
                vars: 'local',
            },
        ],

        /*
         * Require blank lines in specific places.
         *
         * https://eslint.org/docs/latest/rules/padding-line-between-statements
         */
        'padding-line-between-statements': [
            'error',

            /*
             * Require a blank line between statements and blocks, or blocks
             * and blocks.
             *
             * For example:
             *
             *     class MyClass() {}
             *
             *     function foo() {
             *         ...
             *     }
             *
             *     {
             *         ...
             *     }
             *
             *     if (bar) {
             *         ...
             *     }
             *
             *     foo();
             *
             * Not:
             *
             *     class MyClass() {}
             *     function foo() {
             *         ...
             *     }
             *     {
             *         ...
             *     }
             *     if (bar) {
             *         ...
             *     }
             *     foo();
             */
            {
                blankLine: 'always',
                next: ['block-like', 'class', 'function'],
                prev: '*',
            },
            {
                blankLine: 'always',
                next: '*',
                prev: ['block-like', 'class', 'function'],
            },

            /*
             * Require a blank line between statements and any following
             * variables.
             *
             * For example:
             *
             *     myFunc();
             *
             *     const a = 1;
             *     let b = 2;
             *     var c = 3;
             *
             * Not:
             *
             *     myFunc();
             *     const a = 1;
             *     let b = 2;
             *     var c = 3;
             */
            {
                blankLine: 'any',
                next: ['const', 'let', 'var'],
                prev: '*',
            },

            /*
             * Require a blank line between `break` and `case` in a `switch`.
             *
             * For example:
             *
             *     switch (a) {
             *         case 1:
             *             break;
             *
             *         case 2:
             *             // Fall through.
             *
             *         case 3:
             *             break;
             *
             *         ...
             *     }
             *
             * Not:
             *
             *     switch (a) {
             *         case 1:
             *             break;
             *         case 2:
             *         case 3:
             *             break;
             *         ...
             *     }
             *
             * NOTE: Ideally we wouldn't have a blank line between
             *       fall-through `case` statements, but that's not an
             *       option. This at least encourages us to document the
             *       fall-through explicitly.
             */
            {
                blankLine: 'always',
                next: '*',
                prev: ['case', 'default'],
            },

            /*
             * Require a blank line between `return` statements.
             *
             * For example:
             *
             *     myFunc();
             *
             *     return result;
             *
             * Not:
             *
             *     myFunc();
             *     return result;
             */
            {
                blankLine: 'always',
                next: 'return',
                prev: '*',
            },
        ],

        /*
         * Require single quotes for strings, except when the text contains
         * a single quote.
         *
         * Template literals are NOT allowed here. The ES6 rule will turn
         * them on.
         *
         * https://eslint.org/docs/latest/rules/quotes
         */
        'quotes': [
            'error',
            'single',
            {
                avoidEscape: true,
            },
        ],

        /*
         * Require semicolons at the end of lines.
         *
         * https://eslint.org/docs/latest/rules/semi
         */
        'semi': [
            'error',
            'always',
        ],

        /*
         * Warn if keys aren't sorted in objects.
         *
         * Sorting takes place in consecutive lists of keys. Groups of keys
         * can be separated by blank lines. Sorting then happens within each
         * group.
         *
         * For example:
         *
         *     var o = {
         *         a: 1,
         *         b: 2,
         *         z: 3,
         *
         *         c: 4,
         *         h: 5
         *     };
         *
         * Not:
         *
         *     var o = {
         *         z: 3,
         *         a: 1,
         *         b: 2,
         *         h: 5,
         *         c: 4
         *     };
         *
         * https://eslint.org/docs/latest/rules/sort-keys
         */
        'sort-keys': [
            'warn',
            'asc',
            {
                allowLineSeparatedGroups: true,
            },
        ],

        /*
         * Disallow spaces within parenthesis.
         *
         * For example:
         *
         *     myFunc(a, b);
         *
         * Not:
         *
         *     myFunc( a, b );
         *
         * https://eslint.org/docs/latest/rules/space-in-parens
         */
        'space-in-parens': [
            'error',
            'never',
        ],

        /*
         * Require a space after `//` or `/*`, except for special comment
         * types.
         *
         * For example:
         *
         *     // This is a comment.
         *     /* This is another ...
         *     /** This is a doc comment ...
         *     /*! This is a special comment ...
         *
         * Not:
         *
         *     //This is a comment.
         *     /*This is another ...
         *
         * https://eslint.org/docs/latest/rules/spaced-comment
         */
        'spaced-comment': [
            'error',
            'always',
            {
                block: {
                    markers: ['*', '!'],
                },
                exceptions: ['*', '-'],
            },
        ],

        /*
         * Disallow inverse comparisons where the variable is on the right-hand
         * side.
         *
         * For example:
         *
         *     if (myVar === 1) { ... }
         *
         * Not:
         *
         *     if (1 === myVar) { ... }
         */
        'yoda': [
            'error',
            'never',
        ],
    },
};


/*
 * Rules for ES6 JavaScript codebases.
 *
 * This builds upon the ES5 rules to add some further requirements around
 * ES6-level features, such as comma usage and preferring `const` and `let`
 * to `var`.
 *
 * If using the "recommended" configuration set, this will apply to all
 * filenames with *.es6.js or *.ts patterns.
 */
const es6Config = {
    env: {
        es2021: true,
    },

    parserOptions: {
        ecmaVersion: 'latest',
    },

    globals: {
        /* Pre-declare what's provided by our plugins. */
        dedent: 'readonly',
    },

    rules: {
        /*
         * Require trailing commas on multi-line statements (only).
         *
         * This is optional for multi-line functions and calls (for example,
         * we'd want them for typed functions in TypeScript, but shouldn't
         * always require them.
         *
         * For example:
         *
         *     const a = [1, 2, 3];
         *     const b = [
         *         1,
         *         2,
         *         3,
         *     ];
         *     const o = {
         *         key: 'value',
         *     };
         *
         *     function myFunc(
         *         a,
         *         b,
         *         c,
         *     ) {
         *         ...
         *     }
         *
         * Not:
         *
         *     const a = [1, 2, 3,];
         *     const b = [
         *         1,
         *         2,
         *         3
         *     ];
         *     const o = {
         *         key: 'value'
         *     };
         *
         *     function myFunc(a, b, c,) {
         *         ...
         *     }
         *
         * https://eslint.org/docs/latest/rules/comma-dangle
         */
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                exports: 'always-multiline',
                functions: 'only-multiline',
                imports: 'always-multiline',
                objects: 'always-multiline',
            },
        ],

        /*
         * Require `const` or `let`, not `var`.
         *
         * https://eslint.org/docs/latest/rules/no-var
         */
        'no-var': 'error',

        /*
         * Warn if declaring a variable `let` instead of `const` when the
         * variable never gets re-assigned.
         */
        'prefer-const': 'warn',

        /*
         * Require single quotes for strings, except when the text contains
         * a single quote.
         *
         * Template literals are also allowed, which can be useful when there
         * are both single and double quotes in the string.
         *
         * https://eslint.org/docs/latest/rules/quotes
         */
        'quotes': [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
                avoidEscape: true,
            },
        ],
    },
};


/*
 * Rules for TypeScript codebases.
 *
 * This builds upon the ES6 rules to tweak our TypeScript configuration to
 * meet the standards used by our code.
 *
 * If using the "recommended" configuration set, this will apply to all
 * filenames with a *.ts pattern.
 */
const typescriptConfig = {
    extends: [
        'plugin:@beanbag/es6',
        'plugin:@typescript-eslint/recommended',
    ],

    parser: '@typescript-eslint/parser',

    plugins: [
        '@typescript-eslint',
    ],

    rules: {
        /*
         * Warn if using `var self = this`.
         *
         * By default, the TypeScript recommended ruleset will outright
         * disallow it. We convert to a warning, to help port legacy code.
         */
        '@typescript-eslint/no-this-alias': 'warn',

        /*
         * Warn on blank lines before the start of comments (single or
         * multi-line), except at the start of blocks.
         *
         * For example:
         *
         *     {
         *         // A thing.
         *         foo();
         *
         *         // Another thing.
         *         bar();
         *     }
         *
         * Not:
         *
         *     {
         *         // A thing.
         *         foo();
         *         // Another thing.
         *         bar();
         *     }
         *
         * https://eslint.org/docs/latest/rules/lines-around-comment
         */
        '@typescript-eslint/lines-around-comment': [
            'warn',
            {
                beforeBlockComment: true,
                beforeLineComment: true,

                allowArrayEnd: true,
                allowArrayStart: true,

                allowBlockEnd: true,
                allowBlockStart: true,

                allowClassEnd: true,
                allowClassStart: true,

                allowEnumEnd: true,
                allowEnumStart: true,

                allowInterfaceEnd: true,
                allowInterfaceStart: true,

                allowModuleEnd: true,
                allowModuleStart: true,

                allowObjectEnd: true,
                allowObjectStart: true,

                allowTypeEnd: true,
                allowTypeStart: true,

                /*
                 * Special comments used for other purposes.
                 *
                 * We actually set this one to avoid issues with the
                 * "falls through" regex for `case` statements in `switch`
                 * (see the `no-fallthrough` rule).
                 */
                ignorePattern: noFallThroughPattern,
            },
        ],

        /*
         * Turn off the basic JS lines-around-comment.
         */
        'lines-around-comment': 'off',
    },
};


/*
 * Rules for Jasmine codebases.
 *
 * This enables globals for Jasmine and Jasmine-Suites, and sets up a common
 * global we use for a scratch area in the DOM.
 *
 * This is meant to be mixed in with a JavaScript configuration.
 */
const jasmineTestsConfig = {
    env: {
        '@beanbag/jasmine-suites': true,
        jasmine: true,
    },

    extends: [
        'plugin:jasmine/recommended',
    ],

    plugins: [
        'jasmine',
    ],

    globals: {
        '$testsScratch': 'writable',
    },

    rules: {
        /*
         * Don't require blank lines before `expect()`.
         *
         * This would be nice to keep enabled, just to make sure `expect()`
         * calls don't get lost, but it has a flaw where multiple multi-line
         * `expect()` statements end up needing to be separated by blank
         * lines.
         *
         * https://github.com/tlvince/eslint-plugin-jasmine/blob/master/docs/rules/new-line-before-expect.md
         */
        'jasmine/new-line-before-expect': 'off',

        /*
         * Don't complain about assertions in `beforeEach()`/`afterEach()`/etc.
         *
         * There's no harm in doing this. We do it to ensure our test harness
         * state is correct.
         *
         * https://github.com/tlvince/eslint-plugin-jasmine/blob/master/docs/rules/no-expect-in-setup-teardown.md
         */
        'jasmine/no-expect-in-setup-teardown': 'off',

        /*
         * Don't complain about `beforeEach()`/`afterEach()`/etc. outside of
         * `describe()`.
         *
         * Normally we would want to leave this enabled, but we use our own
         * `suite()` commands from jasmine-suites, and this rule doesn't know
         * about that.
         *
         * https://github.com/tlvince/eslint-plugin-jasmine/blob/master/docs/rules/no-global-setup.md
         */
        'jasmine/no-global-setup': 'off',

        /*
         * Display an error when test specs in the same `describe()` have the
         * same name.
         *
         * https://github.com/tlvince/eslint-plugin-jasmine/blob/master/docs/rules/no-spec-dupes.md
         */
        'jasmine/no-spec-dupes': [
            'error',
            'branch',
        ],

        /*
         * Display an error when `describe()`s in the same `describe()` have
         * the same name.
         *
         * https://github.com/tlvince/eslint-plugin-jasmine/blob/master/docs/rules/no-suite-dupes.md
         */
        'jasmine/no-suite-dupes': [
            'warn',
            'branch',
        ],

        /*
         * Don't complain about `toHaveBeenCalled()`.
         *
         * It's valid to use `toHaveBeenCalled()`. This appears to have been
         * a personal preference from the author.
         *
         * https://github.com/tlvince/eslint-plugin-jasmine/blob/master/docs/rules/prefer-toHaveBeenCalledWith.md
         */
        'jasmine/prefer-toHaveBeenCalledWith': 'off',
    },
};


export const configs = {
    /* JavaScript rulesets */
    es5: es5Config,
    es6: es6Config,
    typescript: typescriptConfig,

    /* Environmental rulesets */
    jasmine: jasmineTestsConfig,

    /* Recommended ruleset */
    recommended: {
        extends: [
            'plugin:@beanbag/es5',
        ],

        plugins: [
            '@beanbag',
        ],

        overrides: [
            {
                files: [
                    '*.es6.js',
                ],

                extends: [
                    'plugin:@beanbag/es6',
                ],
            },
            {
                files: [
                    '*.ts',
                ],

                extends: [
                    'plugin:@beanbag/typescript',
                ],
            },
            {
                files: [
                    '*Tests.es6.js',
                    '*Tests.js',
                    '*Tests.ts',
                ],

                extends: [
                    'plugin:@beanbag/jasmine',
                ],
            },
            {
                files: [
                    'rollup.config.js',
                    '.babelrc',
                ],

                extends: [
                    'plugin:@beanbag/es6',
                ],

                parserOptions: {
                    sourceType: 'module',
                },
            },
        ],
    },
};


export const environments = {
    'backbone': {
        globals: {
            Backbone: false,
            _: false,
        },
    },

    'django': {
        globals: {
            django: false,
            gettext: false,
            gettext_noop: false,
            interpolate: false,
            ngettext: false,
            npgettext: false,
            pgettext: false,
        },
    },

    'djblets': {
        Djblets: false,
    },

    'jasmine-suites': {
        globals: {
            suite: false,
        },
    },

    'reviewboard': {
        RB: false,
    },
};
