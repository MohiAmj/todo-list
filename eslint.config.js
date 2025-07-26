// @ts-check

const eslint = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const angularPlugin = require("@angular-eslint/eslint-plugin");
const angularTemplatePlugin = require("@angular-eslint/eslint-plugin-template");

module.exports = [
  {
    ignores: ["node_modules/", "dist/", ".angular/"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@angular-eslint": angularPlugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...angularPlugin.configs.recommended.rules,

      // 🔥 Fail on real errors
      "no-undef": "error",
      "no-unused-vars": "error",
      "no-console": "error",
      "no-debugger": "error",
      "no-constant-condition": "error",

      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@angular-eslint/prefer-inject": "warn",
    },
  },
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: require("@angular-eslint/template-parser"),
    },
    plugins: {
      "@angular-eslint/template": angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
    },
  },
];
