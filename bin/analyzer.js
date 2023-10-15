#!/usr/bin/env node
import path from "node:path";
import fs, { access, constants } from "node:fs";

const inputPath = process.argv[2];
const filePath = inputPath && path.normalize(inputPath);

// Проверка на существование файла
const checkFileExist = (pathToFile) => {
  return new Promise((resolve, reject) => {
    access(pathToFile, constants.F_OK, (err) => {
      err ? reject(false) : resolve(true);
    });
  });
};

// Подсчитываю винрейт
const calcWinrate = (data) => {
  const resultGameArray = data.split("\n").filter(Boolean);
  const totalNuberOfGames = resultGameArray.length;
  const numberOfWin = resultGameArray.filter((word) => word === "win").length;
  const numberOfLoose = totalNuberOfGames - numberOfWin;
  const winrate = `${((numberOfWin / totalNuberOfGames) * 100).toFixed(2)}%`;
  console.log(
    `Был произведен анализ файла с логами:\nОбщее количество партий: ${totalNuberOfGames}\nКоличество выигранных партий: ${numberOfWin}\nКоличество проигранных партий: ${numberOfLoose}\nОбщий винрейт: ${winrate}`
  );
};

// Записываю содержимое файла в переменную
const readLogsFile = (pathToFile) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(pathToFile, "utf8");
    let data = "";
    readStream.on("data", (chunk) => {
      data += chunk;
    });
    readStream.on("end", () => {
      resolve(data);
    });
    readStream.on("error", (err) => {
      reject(err);
    });
  });
};

// Точка входа в программу
const main = async () => {
    if (process.argv.length < 3) {
        console.log("Вы не указали путь к файлу с логами\nЧто-бы проанализировать игровые логи используйте команду:\nnode ./bin/analyzer.js 'путь к файлу'");
        return;
      }
  try {
    if (await checkFileExist(filePath)) {
        const data = await readLogsFile(filePath)
        calcWinrate(data);
    }
  } catch (err) {
    console.log("Нет доступа к файлу по этому пути, попробуйте обернуть в кавычки путь и запустите программу снова");
  }
};

main();