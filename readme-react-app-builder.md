# react-app-builder

React + Koa + Electron integrated development environment.

# Features

- Based on react-create-app
- No redundant integration and restructuring
- Integrated Electron Packaging
- use 'npm run create' to build your own project Immediately
- Default installation of common components
  - @babel/plugin-proposal-decorators
  - koa
  - koa-static
  - mobx
  - mobx-react
  - node-sass
  - react-router
  - get-port
  - inquirer
  - fs-extra

# Installation

```
git clone https://github.com/yuri2peter/react-app-builder.git
cd ./react-app-builder
npm install
```

# Quick Start

`npm start`

> ez way.

# Directory Structure

```
- build // compile directory
- config // configs for front end project
- electron // scripts and configs for electron
- front // front end project
- node_modules // node modules
- scripts // npm scripts
- server // back end project
```

# Scripts

| Scripts   |      Description       |
|----------|:-------------:|
| create | create a copy of the current project and rename it |
| start | react development environment |
| build | compile react project to build/front directory |
| test | run tests |
| server | enable Koa Server |
| electron | open electron application |
| electron-build | packaging electron applications |
| electron-win | packed in windows environments only |
| electron-linux | packed in a linux environment only |
| electron-mac | packing in a mac environment only |
