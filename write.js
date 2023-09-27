const fs = require('fs');
let data = 'demo write data \n';
const writerStream = fs.createWriteStream('output.csv');
writerStream.write(data, 'UTF8');
writerStream.end();
