const stylus = require('stylus');
const DtsCreator = require('typed-css-modules');
const {execSync} = require('child_process');
const creator = new DtsCreator();
let {readFile} = require('fs');

let files = execSync('find src -name "*.styl"', {encoding: 'utf8'}).trim();

files = files.split('\n');

files.forEach((file) => {
    readFile(file, {encoding: 'utf8'}, (err, data) => {
        stylus.render(data, {filename: file.replace(/^.*\//, '')}, (err, css) => {
            if (err) throw err;

            creator.create(file, css).then((dtsContent) => {
                dtsContent.writeFile();
            })
        });
    });
});
