#!/usr/bin/env node

const fs = require('fs')
const zip = require('compressing').zip

const compressFile = async (from, to) => {
  await zip.compressDir(from, to, {
    ignoreBase: false,
  })
}

const uncompressFile = async name => {
  await zip.uncompress(name, `./`)
}

module.exports = {
  compressFile,
  uncompressFile,
}
