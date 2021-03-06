[![Build Status](https://travis-ci.org/Connormiha/crossing-tasks.svg?branch=master)](https://travis-ci.org/Connormiha/crossing-tasks)

# crossing-tasks

**TypeScript** - compile to ES6 (or ES5. see tsconfig.json)  
**Stylus, PostCSS** - css preprocessor  
**React**, **Redux**  
**Webpack** - build manager  
**Jest, Enzyme** - unit tests library  
**Tslint, Stylint** - TypeScript and Stylus code validation  
**Gulp** for run linters  
**Storybook, Backstop.js**  Storybook components + screen tests  
**Yarn** Package manager (instead of npm)

Tested with Node.js 8

Before install Yarn  
### Install
```
yarn
```
or
```
npm install
```

### Usage
Run http server + watcher
```
npm start
```

Run unit test
```
npm test
```

Compile build. (Are put into ./build folder)
```
npm run build
```

Check TypeScript and Stylus code validation
```
npm run lint
```

Run Storybook on http://localhost:6006/
```
npm run storybook
```

Run sreenshots tests from Storybook
```
npm run test:backstop
```

### Git
On pre-commit set up hook for checking modified/added files by linter  
On pre-push run unit tests
