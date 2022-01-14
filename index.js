#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')

const { InitProject, buildCompressFile, buildAll } = require('./cmd')

// 初始化命令行工具
const v1 = program.version('1.0.0', '-v, --version')

v1.command('create <name>').action(async name => {
  await inquirer.prompt([])
  await InitProject(name)
})

v1.command('build <name>').action(async name => {
  await inquirer.prompt([])
  await buildCompressFile(name)
})

v1.command('rebuild').action(async () => {
  await inquirer.prompt([])
  await buildAll()
})

program.parse(process.argv)
