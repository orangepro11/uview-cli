#!/usr/bin/env node

const logSymbols = require('log-symbols')
const chalk = require('chalk')
const ora = require('ora')

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

module.exports = {
  PrintToConsole,
  ShowLoading,
}
