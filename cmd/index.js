#!/usr/bin/env node

const { uncompressFile, compressFile } = require('../utils/zip')
const { readFileToBase64, readFileToString, saveStringToFile, deleteFile, saveBase64ToFile } = require('../utils/file')
const fs = require('fs')
const path = require('path')
const { ShowLoading, PrintToConsole } = require('../utils/commad')

/**
 * 初始化项目的具体逻辑
 * 因为从git上下载项目不稳定，故采用解压缩文件的方案
 * @param {string} projectName 项目名称
 */
const InitProject = async (projectName, templateName = 'demo') => {
  const spinner = ShowLoading('正在初始化中...') // 显示loading
  try {
    // 如果已经存在则提示用户
    if (fs.existsSync(projectName)) {
      PrintToConsole('项目已存在', 'error')
      process.exit(1)
    }

    // 以下逻辑必须按顺序同步执行
    // 先在指定位置读取模板文件
    const f = require(path.resolve(__dirname, '../templates/output', `${templateName}.js`));
    // 先把字符串还原成压缩文件
    await saveBase64ToFile(f, `${templateName}.zip`)
    // 解压缩
    await uncompressFile(`./${templateName}.zip`, `./${projectName}`)
    // 重命名解压出来的文件夹
    fs.renameSync(templateName, projectName)
    // 删除压缩文件
    await deleteFile(`./${templateName}.zip`)
    spinner.succeed('初始化成功') // 提示用户完成
  } catch (e) {
    spinner.fail('初始化失败')
    PrintToConsole(e.message, 'error')
  }
}

const buildCompressFile = async (from) => {
  const spinner = ShowLoading('正在构建中...')
  try {
    // 先拼成输入路径,'templates/input/${from}
    const fromPath = path.resolve(__dirname, '../templates/input', from)
    // 拼出输出路径，'templates/output/
    const toPath = path.resolve(__dirname, '../templates/output')
    // 调用压缩文件的方法
    await compressFile(fromPath, path.resolve(toPath, `${from}.zip`))
    // 调用转BASE64的方法
    const content = await readFileToBase64(path.resolve(toPath, `${from}.zip`))
    // 调用写入文件的方法
    await saveStringToFile(`module.exports = \`${content}\``, path.resolve(toPath, `${from}.js`))
    // 删除压缩文件
    await deleteFile(path.resolve(toPath, `${from}.zip`))
    // 提示用户完成
    spinner.succeed('构建成功')
  } catch (e) {
    spinner.fail('构建失败');
    PrintToConsole(e.message, 'error')
  }
}

module.exports = {
  InitProject,
  setCompressFile,
  buildCompressFile
}
