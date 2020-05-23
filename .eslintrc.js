module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        'ecmaFeatures': {
            'legacyDecorators': true
        }
    },
    env: {
        browser: true,
        es6: true
    },
    extends: [
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard',
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        "plugin:@typescript-eslint/recommended",
        'plugin:vue/essential',
        "prettier/@typescript-eslint"
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        "arrow-parens": 'off',
        "generator-star-spacing": 'off',
        "no-debugger": 'off',
        "no-console": 'off',
        "no-tabs": 'off',
        "space-before-function-paren": 'off',
        "camelcase": "off",
        "@typescript-eslint/camelcase": "off",
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "no-unreachable": 'off',
        "no-useless-escape": 'off',
        "prefer-promise-reject-errors": 'off',
        "indent": "off",
    },
    globals: {
        "uni": true,
        "App": true,
        "Page": true,
        "wx": true
    }
}
