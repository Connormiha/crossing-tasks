const tsc = require('typescript');
const tsconfig = require('../tsconfig.json');
const {transform} = require("babel-core");
const babelConfig = {
    plugins: ['transform-es2015-modules-commonjs']
};

module.exports = {
    process(src, path) {
        let tsCode = tsc.transpile(
            src,
            tsconfig.compilerOptions,
            path, []
        );

        return transform(tsCode, babelConfig).code;
    }
};
