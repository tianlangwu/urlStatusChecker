fs = require('fs');
const sendRequest = require("../urlRequest/urlRequest.js")

const readFile = (fileString) => { 

fs.readFile(fileString, function (err, data) {

    var PATTERN = /(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/ig

    if (err) return console.log("Can't find file name \""+ fileString + "\" in the path");

    console.log("processing file\" " + fileString + "\"");
    var string = data.toString();
    // finding all urls put them into a string array
    var urls = string.match(PATTERN);
    if (urls.length > 0) {
        // remove redundant urls
        var uniqueUrls = [...new Set(urls)];

        for (var i = 0; i < uniqueUrls.length; i++) {
            var url = uniqueUrls[i];
            sendRequest(url);
        }
    }

})
}

module.exports = readFile;