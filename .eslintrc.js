module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "no-const-assign": 1,
        "no-extra-semi": 2,
        //"semi": [2, "always", { "omitLastInOneLineBlock": true}],
        "semi": 0,
        "no-case-declarations": 2,
        "no-console": 0,
        "no-fallthrough": 0,
        "no-empty": 0,
        "no-empty-pattern": 2,
        "no-mixed-spaces-and-tabs": 0,
        "no-octal": 2,
        "no-redeclare": [2, {"builtinGlobals": true}],
        "no-self-assign": 2,
        "no-this-before-super": 1,
        "no-undef": 1,
        "no-unreachable": 1,
        "no-unused-vars": 1,
        "no-use-before-define": 0,
        "constructor-super": 1,
        "curly": 0,
        "eqeqeq": 0,
        "func-names": 0,
        "valid-typeof": 1,
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1,
                "VariableDeclarator": { "var": 2, "let": 2, "const": 3 }
            }
        ]
    }
};