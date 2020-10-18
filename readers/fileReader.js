fs = require('fs');
const { url } = require('inspector');
const sendRequest = require("../urlRequest/urlRequest.js")

const readFile = (fileString, json, status, filteredUrl) => { 


fs.readFile(fileString, function (err, data) {

    const PATTERN = /(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/ig

    if (err) return console.log("Can't find file name \""+ fileString + "\" in the path");

    console.log("processing file \"" + fileString + "\"");
    let string = data.toString();
    // finding all urls put them into a string array
    let urls = string.match(PATTERN);
    if(filteredUrl){    //if filter is not empty, compare each filter with each url and remove the matching urls
        for(let i = 0; i < filteredUrl.length; i++){
            for(let j = 0; j < urls.length; j++){
                if(urls[j].startsWith(filteredUrl[i].replace(/[^\x20-\x7E]/gmi, ""))){      //replace used to remove control characters read from file
                 urls.splice(j, 1);
                    j = j - 1;                 //if a target is removed, the elements are shifted by 1, therefore j-1 is needed;
                }
            }
        }
    }

    if (urls.length > 0) {
        // remove redundant urls
        let uniqueUrls = [...new Set(urls)];

        for (let i = 0; i < uniqueUrls.length; i++) {
            let url = uniqueUrls[i];
            sendRequest(url, json, status);
        }
    }

})
}

module.exports = readFile;