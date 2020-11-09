const path = require('path');

module.exports = {
  process(src, filename, config) {
    for (const item of config.moduleDirectories) {
      if (filename.indexOf(`${config.cwd}/${item}/`) === 0) {
        filename = filename.replace(`${config.cwd}/${item}/`, '');
        break;
      }
    }

    return `
            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            exports.default = '${filename}';
        `;
  },
};
