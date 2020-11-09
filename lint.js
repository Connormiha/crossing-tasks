'use strict';

const { execSync, exec } = require('child_process');

const PRE_COMMIT = process.env.NODE_ENV === 'pre_commit';
const EXEC_OPTIONS = { stdio: [0, 1, 2] };

const runTslint = (files = 'src/**/*.ts src/**/*.tsx __tests__/**/*.ts __tests__/**/*.tsx') =>
  execSync(`./node_modules/.bin/tslint ${files} && echo "tslint success"`, EXEC_OPTIONS);

const runStylint = (files = 'src') =>
  execSync(`./node_modules/.bin/stylint ${files} && echo "stylint success"`, EXEC_OPTIONS);

if (PRE_COMMIT) {
  let changedFiles = execSync('git diff --cached --name-only --diff-filter=ACM src __tests__', {
    encoding: 'utf8',
  });
  changedFiles = changedFiles.split('\n');
  const changedFilesJavascript = changedFiles.filter((item) => /\.tsx?$/.test(item));
  const changedFilesStylus = changedFiles.filter((item) => /\.styl$/.test(item));

  if (changedFilesJavascript.length) {
    runTslint(changedFilesJavascript);
  }

  if (changedFilesStylus.length) {
    runStylint(changedFilesStylus);
  }
} else {
  runTslint();
  runStylint();
}
