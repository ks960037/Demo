module.exports = {
    env: {
        browser: true,
        es2023: true,
        node: true,
    },
    extends: ['@nuxtjs'],
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: 'module',
    },
    plugins: ["@typescript-eslint", "vue", "nuxt"],
    rules: {
        'no-undef': 'off',
        "no-unused-vars": "off",
        "vue/multi-word-component-names": "off",
    },
}