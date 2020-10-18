const fs = require('fs');
const MyFile = require("./fileReader.js");

const myFile = new MyFile();

const readUrlFilter = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {

            if (err) reject("error in opening filter file.");
            resolve(data.toString().split("\n").filter(u => (u.startsWith("http://") || u.startsWith("https://"))));

        })
    })
}

async function checkFiltertedUrls(file) {
    //function to receive/apply filters and read url files to check status code
    var ignoredUrl = await readUrlFilter(file);
    myFile.filteredUrl = ignoredUrl;

    if (ignoredUrl.length == 0) console.log(`Invalid ignore patterns, each line of the ignore file text should either be an Url or start with '#' indicating comments.`)
    //read the file with filter applied
    else {
        for (let i = 4; i < process.argv.length; i++) {
            console.log(`processing ignored file ${process.argv[i]}`);
            myFile.readFile(process.argv[i]);
        }
    }
}

module.exports = checkFiltertedUrls;
