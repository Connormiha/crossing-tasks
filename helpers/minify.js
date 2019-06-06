const fs = require('fs');
const path = require('path');

function minify(content) {
    let i = 0;
    const nameMap = new Map();
    return content.replace(/_?\b(:?render|handle)([A-Z]:?)\w+/g, (str) => {
        if (!nameMap.has(str)) {
            nameMap.set(str, '_' + i.toString(36));
            i++;
        }

        return nameMap.get(str);
    });
}

fs.readdir(path.resolve(__dirname, '../build/static'), (err, files) => {
    files.filter((filename) => filename.endsWith('.js')).forEach((filename) => {
        const filePath = path.resolve(__dirname, '../build/static', filename);
        fs.readFile(filePath, 'utf-8', (err, file) => {
            fs.writeFileSync(filePath, minify(file));
        });
    });
});
