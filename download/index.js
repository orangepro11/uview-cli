#!/usr/bin/env node

const download = require('download-git-repo')

const downloadTemplatesFromGit = (url, name) => {
  return new Promise((resolve, reject) => {
    download(url, `./${name}`, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

module.exports = downloadTemplatesFromGit
