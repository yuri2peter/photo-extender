const inquirer = require('inquirer');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const replace = require('replace-in-file');
const { promisify } = require('util');

const readDir = promisify(fs.readdir);

(async () => {
  const result = {};
  const inputAppName = async () => {
    const { appName } = await inquirer.prompt([
      {
        type: 'input',
        message: 'Input your app\'s name',
        name: 'appName',
        default: 'my-react-app',
      },
    ]);
    result.appName = appName;
  };
  const inputDest = async () => {
    const defaultDest = '../' + result.appName;
    const { dest } = await inquirer.prompt([
      {
        type: 'input',
        message: 'Input destination',
        name: 'dest',
        default: defaultDest,
      },
    ]);
    result.dest = path.resolve(dest);
    const { confirmDest } = await inquirer.prompt([
      {
        type: 'confirm',
        message: 'Confirm destination: ' + result.dest,
        name: 'confirmDest',
      },
    ]);
    if (!confirmDest) {
      await inputDest();
    }
  };
  const createApp = async ({ dest, appName }) => {
    const temp = path.resolve(dest, './react-app-builder-create-temp');
    const ignore = [
      '.git',
      '.idea',
      'build',
      'package-lock.json',
    ];
    // 建立目录
    await fsExtra.ensureDir(dest);
    await fsExtra.ensureDir(temp);
    // 拷贝项目文件
    await fsExtra.copy('./', temp);
    // 删除忽略文件
    await Promise.all(ignore.map(t => path.resolve(temp, t))
      .map(async t => {
        return fsExtra.remove(t)
      }));
    // 重命名readme
    await fsExtra.move(path.resolve(temp, 'README.md'), path.resolve(temp, 'readme-react-app-builder.md'));
    // 替换关键字为app name
    await replace({
      files: [
        'package.json',
        'front/public/index.html',
        'front/public/manifest.json',
      ].map(t => path.resolve(temp, t)),
      from: /react-app-builder/g,
      to: appName,
    });
    // 拷贝至目标目录
    let fileList = await readDir(temp);
    await Promise.all(fileList.map(async t => {
      try {
        await fsExtra.move(path.resolve(temp, t), path.resolve(dest, t))
      } catch (e) { }
    }));
    // 检查temp目录
    fileList = await readDir(temp);
    if (fileList.length > 0) {
      console.warn(`Some files failed to move. Please check manually in "${temp}"`)
    } else {
      await fsExtra.remove(temp);
    }
  };

  await inputAppName();
  await inputDest();
  console.log('Creating...');
  await createApp(result);
  console.log('Done.');
})();
