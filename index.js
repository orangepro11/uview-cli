#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')

const { InitProject, setCompressFile } = require('./cmd')

// 初始化命令行工具
const v1 = program.version('1.0.0', '-v, --version')

v1.command('create <name>').action(async name => {
  await inquirer.prompt([])
  await InitProject(name)
})

v1.command('reset').action(async () => {
  await inquirer.prompt([])
  await setCompressFile()
})

program.parse(process.argv)
