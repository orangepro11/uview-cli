const { Exec, ShowLoading } = require('../utils/commad')

const InstallNodeModules = async (dir, type) => {
  const snipper = ShowLoading('正在安装依赖中,请稍后...')
  try {
    await Exec(`cd ${dir} && ${type} install`)
    snipper.succeed('安装成功,开始使用吧!')
  } catch (e) {
    snipper.fail('安装失败')
    PrintToConsole(e.message, 'error')
  }
}
module.exports = {
  InstallNodeModules,
}
