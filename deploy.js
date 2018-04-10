const shell = require('shelljs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

let json = fs.readFileSync('package.json', {encoding: 'utf-8'})
const version = JSON.parse(json).version


const emoji = [':bug:', ':tada:', ':heavy_plus_sign:', ':heavy_minus_sign:', ':zap:', ':twisted_rightwards_arrows:', ':white_check_mark:', ':rocket:', ':lipstick:']
const newVersionType = {
  type: 'input',
  name: 'version',
  message: `请输入当前提交的版本号，当前版本：${version}         `
}

const commitMessage = {
  type: 'input',
  name: 'message',
  message: `请输入提交的信息，以便追踪问题`
}
const comfirmTYpe = {
  type: 'confirm',
  name: 'confirm',
  message: '确定发布当前版本？',
  default: true
}
const commitType = {
  type: 'list',
  name: 'type',
  message: `请输入提交的类型，以便其他协作者可直观查看本次提交       `,
  choices: [
    '1.解决bug',
    '2.初始化项目',
    '3.添加文件',
    '4.删除文件',
    '5.性能优化',
    '6.合并分支',
    '7.提测',
    '8.发布',
    '9.UI更新'
  ],
  filter: (value) => {
    return parseInt(value.split('.')[0]) - 1
  }
}

const Log = (str) => {
  console.log(str)
}

const run = async () => {
  const {version, message, type} = await inquirer.prompt([
    newVersionType,
    commitMessage,
    commitType
  ])

  Log(`
    当前版本信息:
    ${chalk.green('version')}:         ${chalk.bgRed(version)}
    ${chalk.green('message')}:         ${chalk.bgRed(message)}
    ${chalk.green('type')}:            ${chalk.bgRed(emoji[type])}
  `)
  const {confirm} = await inquirer.prompt([comfirmTYpe])
  if (confirm) {
    json = JSON.parse(json)
    json.version = version
    fs.writeFileSync('package.json', JSON.stringify(json, null, 4), {encoding: 'utf-8'})
    shell.exec('git checkout master')
    shell.exec('git pull origin master')
    shell.exec(`rm -rf index.html && webpack --config webpack.conf.js --env.NODE_ENV=pro --mode production --progress --env.VERSION_CODE=${version}`)
    shell.exec('git add .')
    shell.exec(`git commit -m "${emoji[type]}   ${message}"`)
    shell.exec(`git tag ${version}`)
    shell.exec(`git push origin master`)
    shell.exec(`git push origin ${version}`)
  } else {
    console.log('bye bye ~~')
  }
}
run()
