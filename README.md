# 快速上手

1. 安装本工具

```
npm install -g uview-cli
```

2. 构建项目

```
uview-cli create <项目名称>
```

# 项目启动方式

## 源码获取

1. clone 源码

2. yarn install 安装全部依赖（建议用 yarn，因为我有 yarn.lock）

## 本地调试

有以下三种方式：

### 直接运行

```bash
node index.js create test
```

### 使用准备好的 scripts 命令

```bash
yarn create test
```

### 在本地 link 成可执行文件

```bash
npm link


uview-cli create test
```

> npm link 命令需要管理员权限，在 mac 和 linux 上使用 sudo 运行。

# 项目依赖

1. chalk 用于修改控制台中字符串的样式

2. commandar 用来解析命令行的参数

3. compressing 用来压缩和解压文件

4. download-git-repo 用来从 git 仓库中 clone 源码

5. handlebars 模板引擎，暂时没用到

6. inquirer 用来和用户交互，引导用户一步一步走下去，暂时没用到

7. log-symbols 用来往终端中输出一些符合，比如 success，error 之类的

8. ora 提供交互上下文

9. replace-in-file 另一个模板引擎，暂时没用到

# 工作方式

## 命令行参数

在 index.js 中指定了都会接受哪些命令

```js
v1.command('create <name>').action(async name => {
  await inquirer.prompt([])
  await InitProject(name)
})
```

以上命令指定了会接受 create 命令，并且需要一个必填的参数 name，之后在 action 中可以指定处理逻辑。inquirer.prompt([]) 就是用来询问用户的一些细节，这里留空表示不需要询问用户任何东西。

注意这个文件有两个注意的地方，一个是头顶的

```js
#!/usr/bin/env node
```

这是**必须的**，因为最后我们的代码是要链接成可执行的脚本文件，必须告诉终端用什么解释器执行这个脚本。它只需要在这个入口文件中写但建议每个文件都加上。

还有一个是最后的

```js
program.parse(process.argv)
```

这也是必须的，用来告诉进程可以接受命令行参数了，去掉这句话就没效果，上面的命令行白指定。参数指的是输入流，命令行属于输入流的一种（在计算机中一切皆可抽象为文件流的概念）。



## 和用户交互

inquirer.js提供了在命令行和用户进行交互的能力，基本使用如下：



```js
const { templateName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'templateName',
      message: '请选择模板',
      choices: ['cli-uview2', 'hbx-uview2'],
    },
  ])
```

prompt接受一个数组，数组里的每一个参数是个对象，用来描述每一项的提问。之后用户的答案会被存储到templateName里，可以通过解构语法取出来。



### type

有如下可选项：

input、confirm、 list、rawlist、expand、checkbox、password、editor



### name

指明要把用户的输入存储到哪个变量里



### message

给用户看的消息



### choices

配合list使用。



### when

判断当前问题是否需要回答（一般和用户在之前回答中的答案有关联）



### default

默认的答案



### filter

对用户回答的过滤器



### validate

对用户回答的校验器



## 具体处理逻辑

具体处理逻辑写在 cmd 文件夹中，此文件注释清晰可自行阅读，这里说一下大致流程。

### 初始化项目

原本是计划从 git 仓库拉取源码的，但这个过程相当不可靠，有的用户就死活连不上网络。所以采用我们预先准备文件然后直接解压的方式。嵌入压缩文件可以简单的调用 reset 命令完成，注意不需要接受任何参数，只需要目录名叫 project 即可，

工具会自动把文件夹转换为.zip 格式，然后把.zip 转成 BASE64 字符串存储起来，在用户调用 init 命令的时候把 BASE64 还原成.zip，再解压，整个过程不超过 1 秒，

### 构建模板项目

需要把模板文件放到 templates/output 文件夹下，然后执行

```
yarn dev build <文件夹的名字>
```

文件夹名即最终的项目名。

Tips： 虽然命令有点怪但习惯就好了。

# 工具函数

一些常用的工具函数封装在 utils 文件夹下。

# 命令列表

| 命令      | 参数                 | 说明                                                                           |
| ------- | ------------------ | ---------------------------------------------------------------------------- |
| create  | 项目名称               | 此命令用于用户初始化构建项目，其原理是去 templates/output 下找同名的 js 文件把写在里面的字符串读取解压。              |
| build   | 模板源文件夹名称（也即模板项目名称） | 用于开发者构建模板项目，其原理是把在 templates/input 找相应的文件夹压缩并转成 BASE64 存储到 output 同名 js 文件里。 |
| rebuild | 重新构建input下的所有文件    | 先删除output下的所有文件，然后依次对jnput下的文件夹执行build                                       |
