#!/usr/bin/env node

const { uncompressFile, compressFile } = require('../utils/zip')
const { readFileToBase64, readFileToString, saveStringToFile, deleteFile, saveBase64ToFile } = require('../utils/file')
const fs = require('fs')
const { ShowLoading, PrintToConsole } = require('../utils/commad')
const f = require('../project')

/**
 * 初始化项目的具体逻辑
 * 因为从git上下载项目不稳定，故采用解压缩文件的方案
 * @param {string} projectName 项目名称
 */
const InitProject = async projectName => {
  const spinner = ShowLoading('正在初始化中...') // 显示loading
  try {
    // 如果已经存在则提示用户
    if (fs.existsSync(projectName)) {
      PrintToConsole('项目已存在', 'error')
      process.exit(1)
    }
    /**
     * 以下逻辑必须按顺序执行
     */
    await saveBase64ToFile(f, `${projectName}.zip`) // 先把字符串还原成压缩文件
    await uncompressFile(`${projectName}.zip`, projectName) // 解压缩
    await deleteFile(`${projectName}.zip`) // 删除压缩文件
    spinner.succeed('初始化成功') // 提示用户完成
  } catch (e) {
    spinner.fail('初始化失败')
    PrintToConsole(e.message, 'error')
  }
}

/**
 * 设置项目模板文件的具体逻辑
 * 来源文件夹暂时写死，就叫project，以约定大于配置的规范
 * @param {string} from 项目目录，文件夹路径
 */
const setCompressFile = async (from = 'project') => {
  const spinner = ShowLoading('正在设置中...') // 显示loading
  try {
    await compressFile(from) // 先压缩文件，压缩完以后就叫project.zip,写死的
    const content = await readFileToBase64('project.zip') // 读取文件为BASE64字符串
    await saveStringToFile(`module.exports = \`${content}\``, 'project.js') // 把BASE64存储到文件中，写死就叫project.js
    await deleteFile('project.zip') // 删除压缩文件
    spinner.succeed('设置成功') // 提示用户完成
  } catch (e) {
    spinner.fail('设置失败')
    PrintToConsole(e.message, 'error')
  }
}

const buildCompressFile = async (from) => {

}

module.exports = {
  InitProject,
  setCompressFile,
  buildCompressFile
}
