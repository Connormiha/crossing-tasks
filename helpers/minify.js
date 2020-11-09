const fs = require('fs');
const path = require('path');

let i = 0;
const skipNames = new Set(['handleEvent']);
const skipShortNames = new Set(['do', 'if', 'let', 'for', 'try', 'var']);
const nameMap = new Map();
nameMap.set('createElement', '_');

function getShortName(i) {
  return i.toString(36).replace(/\d/, (str) => String.fromCharCode(65 + parseInt(str, 10)));
}

function minify(content) {
  const uniqNames = [
    ...new Set(
      content.match(/_?\b(:?render|handle)(:?[A-Z])\w+|\bcreateElement\b|\bcomponentDidMount\b/g),
    ),
  ]
    .filter((str) => !skipNames.has(str))
    .sort((a, b) => b.length - a.length)
    .map((str) => new RegExp(`\\b${str}\\b`, 'g'));

  return uniqNames.reduce(
    (acc, regExp) =>
      acc.replace(regExp, (str) => {
        if (!nameMap.has(str)) {
          let name = getShortName(i);
          if (skipShortNames.has(name)) {
            i += 1;
            name = getShortName(i);
          }
          nameMap.set(str, name);
          i += 1;
        }

        return nameMap.get(str);
      }),
    content,
  );
}

fs.readdir(path.resolve(__dirname, '../build/static'), (err, files) => {
  files
    .filter((filename) => filename.endsWith('.js'))
    .forEach((filename) => {
      const filePath = path.resolve(__dirname, '../build/static', filename);
      fs.readFile(filePath, 'utf-8', (err, file) => {
        fs.writeFileSync(filePath, minify(file));
      });
    });
});
