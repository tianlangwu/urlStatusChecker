fs = require('fs');
const sendRequest = require("../urlRequest/urlRequest.js")

const readFile = (fileString) => { 

fs.readFile(fileString, function (err, data) {

    const PATTERN = /(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/ig

    if (err) return console.log("Can't find file name \""+ fileString + "\" in the path");

    console.log("processing file \"" + fileString + "\"");
    let string = data.toString();
    // finding all urls put them into a string array
    let urls = string.match(PATTERN);
    if (urls.length > 0) {
        // remove redundant urls
        let uniqueUrls = [...new Set(urls)];

        for (let i = 0; i < uniqueUrls.length; i++) {
            let url = uniqueUrls[i];
            sendRequest(url);
        }
    }

})
}

module.exports = readFile;