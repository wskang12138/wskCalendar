
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const __dirnameNew = __dirname;
let rootPath = path.join(__dirnameNew, 'package.json');
let filePath = path.join(__dirnameNew, 'dist', 'wskCalendar', 'package.json');
// 创建持久化编译时间
const createPersistentCompilationTime = () => {
  // 1.判断是否存在文件
  try {
    getTimeFile();
  } catch (error) { }
};
// 2.获取时间文件
const getTimeFile = () => {
  try {
    fs.readFile(rootPath, "utf-8", (err, fileData) => {
      fileWriteContent(fileData);
    });
  } catch (error) {
  }
};
// 文件写入内容
const fileWriteContent = (data) => { //写入type:module
  try {
    // 解析 JSON 字符串为对象
    let jsonData = JSON.parse(data);
    // 新建对象
    let newJsonData = {};
    // 遍历旧对象的键
    for (let key in jsonData) {
      // 把每个键/值对添加到新对象
      newJsonData[key] = jsonData[key];
      // 在 description 后面添加新的键/值对
      if (key === "description") {
        newJsonData["type"] = "module";
      }
      if (key === "dependencies") {
         delete newJsonData["dependencies"]?.["wskcalendar"] //删除自己的依赖包防止下载套娃
      }
    }
    // 把对象转回 JSON 字符串，并保持原来的格式
    data = JSON.stringify(newJsonData, null, 2);
    fs.writeFile(filePath, Buffer.from(data, 'utf-8'), "utf-8", (err) => {
      if (err) {
        return console.warn(`🚀[developer 🌞🔥 (っ °Д °;)っ]🌈 ~ file: buildJson.js:31 ~ fs.writeFile ~ err: 写入文件失败`, err);
      } else {
        return console.warn(`🚀[developer 🌞🔥 (っ °Д °;)っ]🌈 ~ :
        \b ✅ json写入成功, 请进入目录 ${chalk.red("cd dist/wskCalendar")} 进行发布新版本:
        \b ${chalk.green("npm publish")}
        \b 返回：
        ${chalk.green("cd ../..")}
        \b ❌ 撤销版本请使用:
        \b ${chalk.yellow("npm unpublish wskCalendar@[指定版本号]")}
        \b 插件地址
        `);
      }
    });
  } catch (error) {
    console.warn(
      "🚀[ developer wsj ] ~ file: buildTime.ts:37 ~ fileWriteContent ~ error:",
      error
    );
  }
};
createPersistentCompilationTime();
