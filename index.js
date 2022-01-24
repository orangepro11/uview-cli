#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const { TemplateList, TYPE } = require('./constant')
const fs = require('fs')
const { PrintToConsole, Exec } = require('./utils/commad')
const { InitProject, buildCompressFile, buildAll } = require('./cmd')
const { InstallNodeModules } = require('./cmd/install')

// 初始化命令行工具
const v1 = program.version('1.0.7', '-v, --version')

v1.command('create <name>').action(async name => {
  if (fs.existsSync(name)) {
    PrintToConsole('项目不是空目录，重新选择一个吧', 'error')
    process.exit(1)
  }
  const choices = TemplateList.map(item => item.tips)
  const { templateName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'templateName',
      message: '请选择模板',
      choices,
    },
  ])
  const selected = TemplateList.find(item => item.tips === templateName)
  await InitProject(name, selected.name)
  if (selected.type == TYPE.CLI) {
    InstallNodeModules(name, 'yarn')
  }
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
