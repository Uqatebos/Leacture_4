#!/usr/bin/env node
import readline from "node:readline";
import fs from "node:fs";
import path, {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
const input = readline.createInterface(process.stdin);
const customFileName = (process.argv[2] && `${process.argv[2]}.txt`) || 'gameLogFile.txt'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pathToFile = path.join(__dirname, customFileName)

const writeResultToFile = (filePath, result, fileLogName) => {
  const writeStream = fs.createWriteStream(filePath, {flags: 'a', encoding: 'utf8'});
  writeStream.on('end', () => {
    console.log(`Результат игры записан в файл ${fileLogName} с логами`)
  })
  writeStream.write(result)
  writeStream.end()

}

const rngNumber = () => Math.round(Math.random() * 1) + 1;

const rightAnswer = (number, data) => {
  if (data == number) {
    console.log(`Вы отгадали правильное число: ${number}`);
    return writeResultToFile(pathToFile, "win\n", customFileName);
  }
};
const wrongAnswer = (number, data) => {
  if (data != number) {
    console.log(
      `Вы не угадали, Ваше число: ${data}, загаданное число: ${number}`
    );
    return writeResultToFile(pathToFile, "loose\n", customFileName);
  }
};

const endGameMessage = () => console.log("Если хотите закончить игру, напишите: 'Закончить игру'");


const closeGameMessage = (logsFile, pathTologsFile) => console.log(`Игра закончена, создан файл с логами: ${logsFile}\nНайти его можно по пути: ${pathTologsFile}`)

input.on("close", () => closeGameMessage(customFileName, pathToFile))

process.on('SIGINT', () => {
  closeGameMessage(customFileName, pathToFile)
  process.exit(); 
});

// Основной поток игры:

console.log("Загадано число в диапазоне от 1 до 2");

input.on("line", (data) => {
  const guessNumber = rngNumber();
  if (data === "Закончить игру") {
    input.close();
  }
  if (isNaN(data) || '') {
    console.log("Введено не число, введите заново");
  } else if (data != 2 && data != 1) {
    console.log("Загаданное число либо 1, либо 2, попробуйте отгадать снова");
  } else {
    rightAnswer(guessNumber, data)
    wrongAnswer(guessNumber, data)
  }
  
  endGameMessage();
});








