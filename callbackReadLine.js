const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

rl.on("line", (data) => {
  console.log("Ваш ответ: ", data);
  if (data === "пока") {
    console.log("Работа завершена...");
    rl.close()
  }
});

// rl.question("What do you think of Node.js? ", (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// });
