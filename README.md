# 如何运行

```bash
npm install gulp electron-prebuilt bunyan -g

# 安装项目依赖包
npm install

# 重新编译本地库
./node_modules/.bin/electron-rebuild -f

# 编译并监视文件变化
gulp
```

新打开一个命令行窗口，然后执行：

```bash
npm start
```

或者使用 `npm test` 来运行测试用例。

# 问题解决

问题1、运行程序时出现如下异常：

```
[Error: Module did not self-register.]
{ [Error: Cannot find module './build/default/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/Debug/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
```

解决办法：

执行 `./node_modules/.bin/electron-rebuild -f` 重新编译本地包。

