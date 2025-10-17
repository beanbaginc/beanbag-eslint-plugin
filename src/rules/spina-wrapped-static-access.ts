/**
 * Rule to detect direct static member access in @spina decorated classes.
 *
 * Version Added:
 *     4.0.0
 */

import {
    type TSESTree,
    ESLintUtils,
    TSESLint,
} from '@typescript-eslint/utils';


type MessageIds = (
    'avoidDirectStaticAccess' |
    'avoidDirectStaticAccessInStatic'
);

type Options = [];


/**
 * Check if a decorator is the @spina decorator.
 *
 * Args:
 *     decorator (TSESTree.Decorator):
 *         The decorator node.
 *
 * Returns:
 *     boolean:
 *     ``true`` if the decorator is the ``@spina`` decorator. ``false``,
 *     otherwise.
 */
function isSpinaDecorator(
    decorator: TSESTree.Decorator,
): boolean {
    const expr = decorator.expression;

    if (expr.type === 'Identifier' &&
        (expr as TSESTree.Identifier).name === 'spina') {
        return true;
    }

    /* Handle @spina() with call expression. */
    if (expr.type === 'CallExpression' && expr.callee.type === 'Identifier') {
        return (expr.callee as TSESTree.Identifier).name === 'spina';
    }

    return false;
}

/**
 * Check if the class already has a constructor declaration
 *
 * Args:
 *     classNode (TSESTree.ClassDeclaration):
 *         The class node.
 *
 * Returns:
 *     ``true`` if the class has a ``declare: ['constructor']`` line.
 *     ``false``, otherwise.
 */
function hasCtorDeclaration(
    classNode: TSESTree.ClassDeclaration,
): boolean {
    const classBody = classNode?.body?.body || [];

    return classBody.some((member: TSESTree.ClassElement) => {
        return (
            member.type === 'PropertyDefinition' &&
            member.key?.type === 'Literal' &&
            member.key?.value === 'constructor' &&
            member.declare === true
        );
    });
}

/**
 * Create fixes for replacing static member access.
 *
 * Args:
 *     fixer (TSESLint.RuleFixer):
 *         The fixer object.
 *
 *     context (TSESLint.RuleContext):
 *         The rule context.
 *
 *     memberExpr (TSESTree.MemberExpression):
 *         The expression node for the member assignment.
 *
 *     currentClassNode (TSESTree.ClassDeclaration):
 *         The node for the current class.
 *
 *     currentSpinaClassName (string):
 *         The name of the current class.
 *
 *     constructorDeclarationAdded (boolean):
 *         Whether the class has the ``declare ['constructor']``
 *         definition added.
 *
 * Returns:
 *     Array of TSESLint.RuleFix:
 *     The fixes to apply.
 */
function createFixes(
    fixer: TSESLint.RuleFixer,
    context: TSESLint.RuleContext<MessageIds, Options>,
    memberExpr: TSESTree.MemberExpression,
    currentClassNode: TSESTree.ClassDeclaration,
    currentSpinaClassName: string,
    constructorDeclarationAdded: boolean,
): TSESLint.RuleFix[] {
    const sourceCode = context.sourceCode;
    const fixes = [];

    /*
     * If no constructor declaration exists and we haven't added it yet,
     * add it.
     */
    if (!hasCtorDeclaration(currentClassNode) &&
        !constructorDeclarationAdded &&
        currentClassNode?.body) {
        const classBodyStart = currentClassNode.body.range[0] + 1;

        /*
         * Match whatever indentation is used by the existing member(s) of
         * the class.
         */
        const firstMember = currentClassNode.body.body[0];
        const memberLine =
            sourceCode.getLines()[firstMember.loc.start.line - 1];
        const memberIndent = memberLine.match(/^(\s*)/)?.[1];

        fixes.push(
            fixer.insertTextAfterRange(
                [classBodyStart, classBodyStart],
                `\n${memberIndent}declare ['constructor']: ` +
                `typeof ${currentSpinaClassName};\n`,
            ),
        );
    }

    /* Replace ClassName.property with this.constructor.property. */
    fixes.push(
        fixer.replaceText(memberExpr.object, 'this.constructor'),
    );

    return fixes;
}


const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        docs: {
            description:
                'Disallow direct static member access in @spina decorated ' +
                'classes',
        },
        fixable: 'code',
        messages: {
            avoidDirectStaticAccess:
                'Avoid accessing static members via class name ' +
                '"{{className}}" in @spina decorated classes. Use ' +
                '"this.constructor.{{propertyName}}" instead in ' +
                'instance methods.',
            avoidDirectStaticAccessInStatic:
                'Avoid accessing static members via class name ' +
                '"{{className}}" in @spina decorated classes. Use ' +
                '"this.{{propertyName}}" instead in static methods.',
        },
        schema: [],
        type: 'problem',
    },

    create(
        context: TSESLint.RuleContext<MessageIds, Options>,
    ): TSESLint.RuleListener {
        let currentSpinaClassName: string | null = null;
        let currentClassNode: TSESTree.ClassDeclaration | null = null;
        let inStaticMethod = false;
        let constructorDeclarationAdded = false;

        return {
            ClassDeclaration(
                node: TSESTree.ClassDeclaration,
            ): void {
                /* Check if this class has the @spina decorator. */
                if (node.decorators && node.decorators.length > 0) {
                    const hasSpinaDecorator = node.decorators.some(
                        (decorator: TSESTree.Decorator) => {
                            return isSpinaDecorator(decorator);
                        });

                    if (hasSpinaDecorator && node.id) {
                        currentSpinaClassName = node.id.name;
                        currentClassNode = node;
                    }
                }
            },

            'ClassDeclaration:exit'(): void {
                currentSpinaClassName = null;
                currentClassNode = null;
                constructorDeclarationAdded = false;
            },

            MethodDefinition(
                node: TSESTree.MethodDefinition,
            ): void {
                inStaticMethod = node.static === true;
            },

            'MethodDefinition:exit'(): void {
                inStaticMethod = false;
            },

            MemberExpression(
                node: TSESTree.MemberExpression,
            ): void {
                /* Only check if we're inside a @spina decorated class. */
                if (!currentSpinaClassName) {
                    return;
                }

                /*
                 * Check if the object is an identifier matching the class
                 * name.
                 */
                if (node.object.type === 'Identifier') {
                    const objectName =
                        (node.object as TSESTree.Identifier).name;

                    if (objectName !== currentSpinaClassName) {
                        return;
                    }

                    /* Get the property name for the error message. */
                    let propertyName = '(property)';

                    if (node.property.type === 'Identifier') {
                        propertyName =
                            (node.property as TSESTree.Identifier).name;
                    }

                    /*
                     * Report different messages for static vs instance
                     * methods.
                     */
                    if (inStaticMethod) {
                        /* Fix for static methods: use this.property. */
                        context.report({
                            data: {
                                className: currentSpinaClassName,
                                propertyName,
                            },
                            fix(fixer: TSESLint.RuleFixer) {
                                /*
                                 * Replace ClassName.{property} in static
                                 * methods with this.{property}.
                                 */
                                return fixer.replaceText(
                                    node.object,
                                    'this',
                                );
                            },
                            messageId: 'avoidDirectStaticAccessInStatic',
                            node,
                        });
                    } else {
                        /* Provide fix for instance methods. */
                        context.report({
                            data: {
                                className: currentSpinaClassName,
                                propertyName,
                            },
                            fix(fixer: TSESLint.RuleFixer) {
                                const fixes = createFixes(
                                    fixer,
                                    context,
                                    node,
                                    currentClassNode,
                                    currentSpinaClassName,
                                    constructorDeclarationAdded,
                                );

                                /*
                                 * Mark that we've added the constructor
                                 * declaration if it was added.
                                 */
                                if (!hasCtorDeclaration(currentClassNode) &&
                                    !constructorDeclarationAdded) {
                                    constructorDeclarationAdded = true;
                                }

                                return fixes;
                            },
                            messageId: 'avoidDirectStaticAccess',
                            node,
                        });
                    }
                }
            },
        };
    },
});


export default rule;
