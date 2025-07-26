// @ts-check

const eslint = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const angularPlugin = require("@angular-eslint/eslint-plugin");
const angularTemplatePlugin = require("@angular-eslint/eslint-plugin-template");

module.exports = [
  {
    // ✅ Ignore build and dependency folders
    ignores: [
      "node_modules/",
      "dist/",
      ".angular/",
    ],
  },
  {
    // ✅ TypeScript files
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

      // ✅ Relax Angular-specific rules
      "@angular-eslint/directive-selector": [
        "warn",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "warn",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],
      "@angular-eslint/component-class-suffix": "warn",
      "@angular-eslint/no-empty-lifecycle-method": "off",
      "@angular-eslint/prefer-inject": "warn",

      // ✅ Relax TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // ❌ Disable rules that aren't defined or installed
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "node/no-unsupported-features/es-builtins": "off",
      "n/no-unsupported-features/es-builtins": "off",

      // ✅ Common adjustments
      "no-console": "off",
      "no-undef": "warn",
      "no-unused-vars": "warn",
    },
  },
  {
    // ✅ Angular HTML templates
    files: ["**/*.html"],
    languageOptions: {
      parser: require("@angular-eslint/template-parser"),
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@angular-eslint/template": angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
      ...angularTemplatePlugin.configs.accessibility.rules,

      // ✅ Disable noisy accessibility rules
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
    },
  },
  {
    // ✅ Test files override
    files: ["**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
    },
  },
];
