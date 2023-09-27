const readline = require("readline");
const fs = require('fs')
const writeStream = fs.writeStream
const input = readline.createInterface(process.stdin);
const rngNumber = () => Math.round(Math.random() * 1) + 1;
let resultCounter = [];
console.log(rngNumber());
input.on("close", () => {
  console.log('Игра закончена, создан файл с логами')
});
console.log("Загадано число в диапазоне от 1 до 2");
input.on("line", (data) => {
  if(data === 'Закончить игру') {
    input.close()
  }
  if (isNaN(data)) {
    console.log("Введено не число, введите заново");
  } else if (data !== 2 || data !== 1) {
    console.log("Загаданное число либо 1, либо 2, попробуйте отгадать снова");
  } else if (data < rngNumber) {
    console.log("Загаданное число больше");
  } else if (data > rngNumber) {
    console.log("Загаданное число меньше");
  } else if (data == rngNumber) {
    input.close();
  }
});
