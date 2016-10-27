const tsc = require('typescript');
const tsconfig = require('../tsconfig.json');

const styles = `
module.exports = new Proxy({}, {
    get(target, prop) {
        return prop;
    }
});
`;

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
            return styles;
        }

        return src;
    },
};
