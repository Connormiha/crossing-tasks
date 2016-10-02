# react-started-kit

Hello world simple page application with React + TypeScript + test infrastructure.  
**TypeScript** - compile to ES6 (or ES5. see tsconfig.json)
**Stylus, PostCSS** - css preprocessor  
**React** **Redux**  
**Webpack** - build manager  
**Jest, Enzyme** - unit tests library  
**tslint, stylint** - TypeScript and Stylus code validation  
**Gulp** for run linters

Tested with Node.js 6
### Install
```
npm install
```

### Usage
Run http server + watcher
```
npm start
```

Open in your browser
```
http://localhost:8080/  
http://localhost:8080/webpack-dev-server/ with live reload
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

### Git
On pre-commit set up hook for checking modified/added files by linter  
On pre-push run unit tests
