const tsc = require('typescript');
const tsconfig = require('../tsconfig.json');

module.exports = {
    process(src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx')) {
            return tsc.transpile(
                src,
                tsconfig.compilerOptions,
                path, []
            );
        }

        if (path.endsWith('.styl') || path.endsWith('.css')) {
            return '';
        }

        return src;
    },
};
