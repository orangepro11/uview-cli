#!/usr/bin/env node

const logSymbols = require('log-symbols')
const chalk = require('chalk')
const ora = require('ora')
const process = require('child_process')

const PrintToConsole = (content, type = 'success') => {
  if (type == 'success') {
    console.log(logSymbols.success, chalk.green(content))
  } else if (type == 'error') {
    console.log(logSymbols.error, chalk.red(content))
  }
}

const ShowLoading = content => {
  const spinner = ora(content)
  spinner.start()
  return spinner
}

const Exec = cmd => {
  return new Promise((resolve, reject) => {
    process.exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(stderr)
      }
      resolve(stdout)
    })
  })
}

module.exports = {
  PrintToConsole,
  ShowLoading,
  Exec,
}
