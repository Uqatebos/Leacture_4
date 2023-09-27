const fs = require('fs');
const readerStream = fs.createReadStream('text.txt');
readerStream.setEncoding('UTF8');
let data = '';
readerStream.on('data', (chunk) => {
    data += chunk
});
readerStream.on('end', () => {
    console.log(data)
});
