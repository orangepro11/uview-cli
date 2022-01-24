#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const { TemplateList, TYPE, MirrorConfigList } = require('./constant')
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
  const { templateName, projectName, projectManager, mirror } = await inquirer.prompt([
    {
      type: 'list',
      name: 'templateName',
      message: '请选择模板',
      choices: TemplateList.map(item => item.tips),
    },
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称',
      default: name,
    },
    {
      type: 'list',
      name: 'projectManager',
      message: '请选择依赖管理工具',
      choices: ['npm', 'yarn', 'pnpm'],
    },
    {
      type: 'list',
      name: 'mirror',
      message: '请选择镜像',
      choices: MirrorConfigList.map(item => item.tips),
    },
  ])
  const selected = TemplateList.find(item => item.tips === templateName)
  const useMirror = MirrorConfigList.find(item => item.tips === mirror)
  await InitProject(projectName, selected.name)
  if (selected.type === TYPE.CLI) {
    InstallNodeModules(name, projectManager, useMirror.cmd)
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
