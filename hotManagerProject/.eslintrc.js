const path = require('path')
module.exports = {
    "parser": "babel-eslint",
    "extends": ["airbnb","prettier"],
    "env": {
        browser: true,
        es6: true,
    },
    "rules": {
        'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
        'react/prop-types': 0,
        'react/prefer-stateless-function': 0,
        'react/no-array-index-key': 0,
        'no-console': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-one-expression-per-line': 0,
        "no-nested-ternary" : 0
    },
    settings: {
        'import/resolver': {
          webpack: {
            config: path.join(__dirname, './webpack.config.js')
          }
        }
      }
}