const changeCase = require('change-case')
const { findInsertTags } = require('../../utils')

function html(content, answers) {
  if (findInsertTags(content, 'folderName')) {
    return content.replace(
      /<!-- folderName -->/g,
      answers.folderName
    ).replace(
      /<!-- pageName -->/g,
      answers.pageName
    )
  }
}
function js(content, answers) {
  if (findInsertTags(content, 'pascalCasePageName', 'camelCasePageName')) {
    return content.replace(
      /<!-- pascalCasePageName -->/g,
      changeCase.pascalCase(answers.pageName)
    ).replace(
      /<!-- camelCasePageName -->/g,
      changeCase.camelCase(answers.pageName)
    )
  }
}
function webpack (content, answers) {
  let path = new RegExp(`/view/${answers.folderName}/js/${answers.pageName}`)
  if (path.test(content)) {
    console.log(chalk.green('路径在directoryConfig.js中已存在~'))
    return content
  }
  return content.replace(/(const arrayName = \[([\S\s])*?')\n(])/g, function(match, p1, p2, p3) {
    return `${p1},\n  '/view/${answers.folderName}/js/${answers.pageName}'\n${p3}`
  })
}

module.exports = {
  html, 
  js,
  webpack
}