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

const MirrorConfigList = [
  {
    cmd: '',
    tips: '不需要为我处理',
  },
  {
    cmd: `config set registry https://registry.npm.taobao.org`,
    tips: '淘宝镜像',
  },
  {
    cmd: `config set registry https://registry.npmjs.org`,
    tips: '官方镜像',
  },
]

module.exports = {
  TemplateList,
  TYPE,
  MirrorConfigList,
}
