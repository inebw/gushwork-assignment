module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // your custom rules here
  },
};
