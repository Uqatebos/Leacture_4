const fs = require("fs");
const path = require("node:path");
const pathTxt =
  "C:\\Users\\psyho\\OneDrive\\Desktop\\Новая папка (2)\\result.txt";
  const filePointer = path.join(__dirname, "textFolder", "text.txt");
  console.log(filePointer)
const normPath = path.normalize(pathTxt);
const writeData = () => {
  let data = {
    gamesResult: [
      { result: "win" },
      { result: "loose" },
      { result: "win" },
      { result: "loose" },
    ],
  };
  const dataJSON = JSON.stringify(data);
  const writerStream = fs.createWriteStream(filePointer);
  writerStream.write(dataJSON, "UTF8");
  writerStream.end();
};
// writeData();



//

// data = {
//   game: [
//     { result: "win" },
//     { result: "loose" },
//     { result: "win" },
//     { result: "loose" },
//   ],
// };
// console.log(data)
// console.log(JSON.stringify(data))

//

const readData = () => {
  const readerStream = fs.createReadStream(pathTxt);
  readerStream.setEncoding("UTF8");
  let data = "";
  readerStream.on("data", (chunk) => {
    data += chunk;
  });
  readerStream.on("end", () => {
    console.log(data);
    console.log(JSON.parse(data));
  });
};

writeData();
// readData();
