const TYPE = {
  CLI: 1,
  HBX: 2,
}

const TemplateList = [
  {
    name: 'cli-uview2',
    tips: '使用uview2构建的命令行项目',
    type: TYPE.CLI,
  },
  {
    name: 'hbx-uview2',
    tips: '使用uview2构建的HbuilderX项目',
    type: TYPE.HBX,
  },
]

module.exports = {
  TemplateList,
  TYPE,
}
