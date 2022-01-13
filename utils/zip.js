#!/usr/bin/env node

const fs = require('fs')
const zip = require('compressing').zip

const compressFile = async from => {
  await zip.compressDir(`./${from}`, './project.zip', {
    ignoreBase: false,
  }) // 输出写死，就叫project.zip
}

const uncompressFile = async (name, to) => {
  await zip.uncompress(`./${name}`, `./`)
  // 重命名文件夹
  fs.renameSync(`./project`, `./${to}`)
}

module.exports = {
  compressFile,
  uncompressFile,
}
