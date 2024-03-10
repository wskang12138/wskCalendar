import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
const __filenameNew = fileURLToPath(import.meta.url);

const __dirnameNew = path.dirname(__filenameNew);
let rootPath = `${__dirnameNew}\\package.json`;
let filePath = `${__dirnameNew}\\dist\\wskCalendar\\package.json`;
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
const fileWriteContent = (data) => {
  try {
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
