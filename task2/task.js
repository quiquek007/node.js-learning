import csv from 'csvtojson';
import fs from 'fs';

const outputPath = './task2/output.txt';
const inputPath = './task2/nodejs-hw1-ex1.csv';
const onError = err => err && console.error(err);
const writer$ = fs.createWriteStream(outputPath, { flags: 'a' });
let lineCounter = 0;

if (fs.existsSync(outputPath)) {
    fs.unlink(outputPath, err => {
        if (err) throw err;
    });
}

csv()
    .fromFile(inputPath)
    .subscribe(chunk => {
        console.log(`line ${lineCounter++}:`, chunk);
        writer$.write(`${JSON.stringify(chunk)}\n`, onError), onError, () => writer$.end();
    });