module.exports = {
  plugins: ['react-hooks'],
  extends: [
    'react-app',
    // enable typescript support
    'plugin:@typescript-eslint/recommended',
    // now disable all of the rules that are in conflict with prettier
    'prettier/@typescript-eslint'
    // note that we don't add the prettier rules, they add noise to the IDE
    // and the code is all being formatted on commit anyway.
  ],
  rules: {
    'no-var': 'error',
    'no-debugger': 'error',
    'prefer-const': 'warn',
    // In principle I like this rule, but I also want to use names such as _Foo
    // for those internal classes that get passed on to redux connect.  After
    // much refactoring I realized that I just prefer _Foo to FooImpl.  Since
    // this rule is being well followed without an eslint rule, I'm switching
    // this one off.
    '@typescript-eslint/class-name-casing': 'off',
    // too many of the graphql generate types break this rule, and they do so
    // in a way that makes enough sense that I don't want to deal with it
    '@typescript-eslint/camelcase': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  overrides: [
    {
      files: '*.{js,jsx}',
      rules: {
        // this should just be fixed
        '@typescript-eslint/no-unused-vars': 'off',
        // opinion: this is reasonable to disable
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: '*.{ts,tsx}',
      rules: {
        // disabled because it conflicts with jsx-a11y/alt-text
        'jsx-a11y/img-redundant-alt': 'off',
        // changed to match the default tsconfig
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        // these are somewhat open to debate but match our current code.
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/no-empty-interface': 'off'
      }
    }
  ]
}
