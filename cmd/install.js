const { Exec, ShowLoading, PrintToConsole } = require('../utils/commad')

const InstallNodeModules = async (dir, manager, mirror) => {
  const snipper = ShowLoading('正在安装依赖中,请稍后...')
  try {
    await Exec(`${manager} ${mirror}`)
    await Exec(`cd ${dir} && ${manager}  install`)
    snipper.succeed('安装成功,开始使用吧!')
  } catch (e) {
    snipper.fail('安装失败')
    PrintToConsole(e.message, 'error')
  }
}
module.exports = {
  InstallNodeModules,
}
