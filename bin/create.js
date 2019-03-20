#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const { createConfig } = require('../lib/common/questions')
const generators = require('../lib/common/generator')

program
.description('页面自动生成工具')
inquirer.prompt(createConfig).then(function (answers) {
  console.log('您输入的文件夹名为：', chalk.yellow(JSON.stringify(answers.folderName)))
  console.log('您输入的文件名为：', chalk.yellow(JSON.stringify(answers.pageName)))

  let htmlContent = fs.readFileSync(__dirname + '/../template/html.ejs', 'utf-8')
      htmlContent = generators.html(htmlContent, answers)
  let jsContent = fs.readFileSync(__dirname + '/../template/js.ejs', 'utf-8')
      jsContent = generators.js(jsContent, answers)
  let lessContent = fs.readFileSync(__dirname + '/../template/less.ejs', 'utf-8')
  // // 添加需要webpack打包的文件路径
  let webpackContent = fs.readFileSync('./config/directoryConfig.js', 'utf-8')
  webpackContent = generators.webpack(webpackContent, answers)

  fs.access(`./src/view/${answers.folderName}`, fs.constants.F_OK, function (err) {
    // 文件夹不存在则新建
    if (err) {
      fs.mkdirSync(`./src/view/${answers.folderName}`)
      fs.mkdirSync(`./src/view/${answers.folderName}/html`)
      fs.mkdirSync(`./src/view/${answers.folderName}/less`)
      fs.mkdirSync(`./src/view/${answers.folderName}/js`)
    }
    fs.access(`./src/view/${answers.folderName}/html/${answers.pageName}.html`, fs.constants.F_OK, function (err) {
      // 若文件已存在时
      if (!err) {
        inquirer.prompt([{
          type: 'confirm',
          name: 'overwrite',
          message: chalk.red('页面已存在,是否覆盖页面?'),
        }]).then(function(result) {
          if(result.overwrite) {
            writeAllFile(answers, htmlContent, jsContent, lessContent, webpackContent)
          }
        })
      } else {
        writeAllFile(answers, htmlContent, jsContent, lessContent, webpackContent)
      }
    })
  })
})

function writeSingleFile (answers, content, type) {
  fs.writeFileSync(`./src/view/${answers.folderName}/${type}/${answers.pageName}.${type}`, content)
}
function writeAllFile (answers, htmlContent, jsContent, lessContent, webpackContent) {
  writeSingleFile(answers, htmlContent, 'html')
  writeSingleFile(answers, jsContent, 'js')
  writeSingleFile(answers, lessContent, 'less')
  fs.writeFileSync('./config/directoryConfig.js', webpackContent)
}

program.parse(process.argv)