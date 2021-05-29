module.exports = {
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-typescript",
      {
        "isJSX": true,
        "allExtensions": true,
        "jsxPragma": "jsx",
        "jsxPragmaFrag": "'jsx.Fragment'"
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "throwIfNamespace": false,
        "runtime": "automatic",
        "importSource": "@itsjavi"
      }
    ]
  ],
  "comments": false
}
