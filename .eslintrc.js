module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:prettier/recommended",
        "plugin:vue/essential",
        "@vue/prettier",
        "@vue/typescript",
        "prettier"
    ],
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },
    plugins: ["prettier"],
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            env: {
                jest: true
            },
            rules: {
                "no-dupe-class-members": "off"
            }
        }
    ]
};
