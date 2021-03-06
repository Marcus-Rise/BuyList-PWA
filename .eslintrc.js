module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/typescript",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  rules: {
    "no-console": "error",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
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
