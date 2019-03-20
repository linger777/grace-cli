function findInsertTags (content, ...tag) {
  return tag.every(val => new RegExp('\<\!\-\-\ ' + val + '\ \-\-\>').test(content))
}
module.exports = {
  findInsertTags
}