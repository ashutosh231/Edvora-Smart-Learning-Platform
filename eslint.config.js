import babelParser from "@babel/eslint-parser"; // ✅ Use ESM import instead of require
import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    ignores: ["node_modules", "dist", "build"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: babelParser, // ✅ Fix: ESM-compatible import
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: {
        ...globals.browser,
        process: true,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // ✅ React best practices
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // ✅ Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ✅ General cleanup
      "no-unused-vars": "warn",
      eqeqeq: "error",
      "no-undef": "off",
    },
  },
];
