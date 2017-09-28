const stylus = require('stylus');

module.exports = {
    process(src, path) {
        let result = `
            "use strict";

            Object.defineProperty(exports, "__esModule", {
               value: true
            });
            exports.default = {
        `;
        stylus.render(src, {compress: true, filename: path.replace(/^.*\//, '')}, (err, css) => {
            if (err) throw err;

            const CSSNames = (css.replace(/\{[^{]*?}/g, '').match(/[#.][\w-]+/g) || []);

            CSSNames.forEach((item) => {
                item = item.slice(1);
                result+= `"${item}": "${item}",\n`
            });

            result+= '}';
        });

        return result;
    }
};
