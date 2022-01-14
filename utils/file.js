#!/usr/bin/env node

const fs = require('fs')

// 读取文件为BASE64字符串
const readFileToBase64 = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.toString('base64'))
      }
    })
  })
}

// 把BASE64还原为文件
const saveBase64ToFile = (base64, filePath) => {
  return new Promise((resolve, reject) => {
    const data = Buffer.from(base64, 'base64')
    fs.writeFile(filePath, data, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

// 把字符串存储到文件中
const saveStringToFile = (content, filePath) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

// 从指定文件中读取内容
const readFileToString = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 删除指定文件
const deleteFile = filePath => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 获取目录下的所有子文件夹
const getAllSubDirs = dirPath => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err)
      } else {
        const dirs = files
        resolve(dirs)
      }
    })
  })
}

module.exports = {
  readFileToBase64,
  saveBase64ToFile,
  saveStringToFile,
  readFileToString,
  deleteFile,
  getAllSubDirs,
}
