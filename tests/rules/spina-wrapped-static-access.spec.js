/**
 * Tests for @beanbag/spina-wrapped-static-access rule.
 */

import parser from '@typescript-eslint/parser';
import { RuleTester } from 'eslint';

import plugin from '../../lib/esm/index.js';


const rule = plugin.rules['spina-wrapped-static-access'];

// Configure RuleTester to use Jasmine's assertion methods
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: parser,
    },
});

describe('spina-wrapped-static-access', () => {
    ruleTester.run('spina-wrapped-static-access', rule, {
        valid: [
            // Class without @spina decorator
            {
                code: `
                    class MyClass {
                        static HELLO = 42;
                        doThing() {
                            console.log(MyClass.HELLO);
                        }
                    }
                `,
            },

            // Using this.constructor (correct pattern)
            {
                code: `
                    @spina
                    class MyClass {
                        static HELLO = 42;
                        doThing() {
                            console.log(this.constructor.HELLO);
                        }
                    }
                `,
            },

            // Accessing different class's static
            {
                code: `
                    @spina
                    class MyClass {
                        static HELLO = 42;
                        doThing() {
                            console.log(OtherClass.HELLO);
                        }
                    }
                `,
            },

            // Static member outside of class
            {
                code: `
                    @spina
                    class MyClass {
                        static HELLO = 42;
                    }
                    console.log(MyClass.HELLO);
                `,
            },

            // Multiple decorators without @spina - should not trigger
            {
                code: `
                    @otherDecorator
                    @anotherDecorator
                    class MyClass {
                        static HELLO = 42;
                        doThing() {
                            console.log(MyClass.HELLO);
                        }
                    }
                `,
            },

            // Multiple decorators with @spina but using correct pattern
            {
                code: `
                    @otherDecorator
                    @spina
                    @anotherDecorator
                    class MyClass {
                        static HELLO = 42;
                        doThing() {
                            console.log(this.constructor.HELLO);
                        }
                    }
                `,
            },

            // Using this in static method (correct pattern)
            {
                code: `
                    @spina
                    class MyClass {
                        static HELLO = 42;
                        static staticMethod() {
                            console.log(this.HELLO);
                        }
                    }
                `,
            },
        ],

        invalid: [
            // Instance method accessing own static via class name
            {
                code: `
                    @spina
                    class MyClass {
                        static HELLO = 42;
                        doThing() {
                            console.log(MyClass.HELLO);
                        }
                    }
                `,
                output: `
                    @spina
                    class MyClass {
                        declare ['constructor']: typeof MyClass;

                        static HELLO = 42;
                        doThing() {
                            console.log(this.constructor.HELLO);
                        }
                    }
                `,
                errors: [
                    {
                        messageId: 'avoidDirectStaticAccess',
                        data: {
                            className: 'MyClass',
                            propertyName: 'HELLO',
                        },
                        type: 'MemberExpression',
                    },
                ],
            },

            // Multiple static accesses
            {
                code: `
                    @spina
                    class MyClass {
                        static HELLO = 42;
                        static WORLD = 99;
                        doThing() {
                            console.log(MyClass.HELLO);
                            console.log(MyClass.WORLD);
                        }
                    }
                `,
                output: `
                    @spina
                    class MyClass {
                        declare ['constructor']: typeof MyClass;

                        static HELLO = 42;
                        static WORLD = 99;
                        doThing() {
                            console.log(this.constructor.HELLO);
                            console.log(this.constructor.WORLD);
                        }
                    }
                `,
                errors: [
                    {
                        messageId: 'avoidDirectStaticAccess',
                        data: {
                            className: 'MyClass',
                            propertyName: 'HELLO',
                        },
                    },
                    {
                        messageId: 'avoidDirectStaticAccess',
                        data: {
                            className: 'MyClass',
                            propertyName: 'WORLD',
                        },
                    },
                ],
            },

            // Static method accessing own static via class name
            {
                code: `
                    @spina
                    class MyClass {
                        static HELLO = 42;
                        static staticMethod() {
                            console.log(MyClass.HELLO);
                        }
                    }
                `,
                output: `
                    @spina
                    class MyClass {
                        static HELLO = 42;
                        static staticMethod() {
                            console.log(this.HELLO);
                        }
                    }
                `,
                errors: [
                    {
                        messageId: 'avoidDirectStaticAccessInStatic',
                        data: {
                            className: 'MyClass',
                            propertyName: 'HELLO',
                        },
                        type: 'MemberExpression',
                    },
                ],
            },

            // @spina() with parentheses
            {
                code: `
                    @spina()
                    class MyClass {
                        static HELLO = 42;
                        doThing() {
                            console.log(MyClass.HELLO);
                        }
                    }
                `,
                output: `
                    @spina()
                    class MyClass {
                        declare ['constructor']: typeof MyClass;

                        static HELLO = 42;
                        doThing() {
                            console.log(this.constructor.HELLO);
                        }
                    }
                `,
                errors: [
                    {
                        messageId: 'avoidDirectStaticAccess',
                    },
                ],
            },

            // Variable assignment
            {
                code: `
                    @spina
                    class MyClass {
                        static FOO = 1;
                        test() {
                            const x = MyClass.FOO;
                        }
                    }
                `,
                output: `
                    @spina
                    class MyClass {
                        declare ['constructor']: typeof MyClass;

                        static FOO = 1;
                        test() {
                            const x = this.constructor.FOO;
                        }
                    }
                `,
                errors: [
                    {
                        messageId: 'avoidDirectStaticAccess',
                        data: {
                            className: 'MyClass',
                            propertyName: 'FOO',
                        },
                    },
                ],
            },

            // Multiple decorators with @spina first
            {
                code: `
                    @spina
                    @otherDecorator
                    class MyClass {
                        static HELLO = 42;
                        doThing() {
                            console.log(MyClass.HELLO);
                        }
                    }
                `,
                output: `
                    @spina
                    @otherDecorator
                    class MyClass {
                        declare ['constructor']: typeof MyClass;

                        static HELLO = 42;
                        doThing() {
                            console.log(this.constructor.HELLO);
                        }
                    }
                `,
                errors: [
                    {
                        messageId: 'avoidDirectStaticAccess',
                        data: {
                            className: 'MyClass',
                            propertyName: 'HELLO',
                        },
                    },
                ],
            },

            // Multiple decorators with @spina in the middle
            {
                code: `
                    @otherDecorator
                    @spina
                    @anotherDecorator
                    class MyClass {
                        static VALUE = 99;
                        method() {
                            return MyClass.VALUE;
                        }
                    }
                `,
                output: `
                    @otherDecorator
                    @spina
                    @anotherDecorator
                    class MyClass {
                        declare ['constructor']: typeof MyClass;

                        static VALUE = 99;
                        method() {
                            return this.constructor.VALUE;
                        }
                    }
                `,
                errors: [
                    {
                        messageId: 'avoidDirectStaticAccess',
                        data: {
                            className: 'MyClass',
                            propertyName: 'VALUE',
                        },
                    },
                ],
            },

            // Multiple decorators with @spina last
            {
                code: `
                    @otherDecorator
                    @anotherDecorator
                    @spina
                    class MyClass {
                        static DATA = 'test';
                        getData() {
                            return MyClass.DATA;
                        }
                    }
                `,
                output: `
                    @otherDecorator
                    @anotherDecorator
                    @spina
                    class MyClass {
                        declare ['constructor']: typeof MyClass;

                        static DATA = 'test';
                        getData() {
                            return this.constructor.DATA;
                        }
                    }
                `,
                errors: [
                    {
                        messageId: 'avoidDirectStaticAccess',
                        data: {
                            className: 'MyClass',
                            propertyName: 'DATA',
                        },
                    },
                ],
            },

            // Multiple decorators with @spina() call expression
            {
                code: `
                    @otherDecorator
                    @spina()
                    @yetAnother
                    class MyClass {
                        static COUNT = 0;
                        increment() {
                            MyClass.COUNT++;
                        }
                    }
                `,
                output: `
                    @otherDecorator
                    @spina()
                    @yetAnother
                    class MyClass {
                        declare ['constructor']: typeof MyClass;

                        static COUNT = 0;
                        increment() {
                            this.constructor.COUNT++;
                        }
                    }
                `,
                errors: [
                    {
                        messageId: 'avoidDirectStaticAccess',
                        data: {
                            className: 'MyClass',
                            propertyName: 'COUNT',
                        },
                    },
                ],
            },
        ],
    });
});
