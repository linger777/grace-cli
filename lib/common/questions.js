module.exports = {
  createConfig : [{
    type: 'input',
    name: 'folderName',
    message: '请输入要生成的文件夹名称:',
    validate: function(value) {
      let pass = value !== ''
      if (pass) {
        return true;
      }
      return '请输入要生成的文件夹名称';
    }
  }, {
    type: 'input',
    name: 'pageName',
    message: '请输入要生成的html文件名:',
    validate: function(value) {
      let pass = value !== ''
      if (pass) {
        return true;
      }
      return '请输入要生成的html文件名';
    }
  }]
}