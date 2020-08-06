## ts 学习
### 1.项目初始化
1.初始化项目
```
    npm init -y 
```
2.安装typescript 
```
    npm i typescript -D
```
3.package.json 修改script
```js
    "tsc": "tsc"
```
4.初始化ts项目
```
    npm run tsc -- --init
```

### 代码生成
1.编译代码
```
    tsc xxxx.ts  // 生成 js 文件
```
2.执行文件
```
    node xxxx.js  //node环境运行生成的对应js文件
```
3.快捷执行代码
```
    npm install ts-node -g // 替换上面的两部

    ts-node xxx.ts  
```