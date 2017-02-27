const tsc = require('typescript');
const tsconfig = require('../tsconfig.json');
const {transform} = require("babel-core");
const babelConfig = {
    plugins: ['transform-es2015-modules-commonjs']
};

const styles = `
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = new Proxy({}, {
    get(target, prop) {
        return prop;
    }
});
`;

module.exports = {
    process(src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx')) {
            let tsCode = tsc.transpile(
                src,
                tsconfig.compilerOptions,
                path, []
            );

            return transform(tsCode, babelConfig).code;
        }

        if (path.endsWith('.styl') || path.endsWith('.css')) {
            return styles;
        }

        return src;
    }
};
