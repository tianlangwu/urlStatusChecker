const fs = require('fs');
const sendRequest = require("../urlRequest/urlRequest.js")

const PATTERN = /(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/ig

class MyFile {

    constructor() {
        this.status = 'all';
        this.json = false;
        this.filteredUrl = null;
    }

    readFile (fileString = this.fileString, json = this.json, status = this.status, filteredUrl = this.filteredUrl) {

        return new Promise((resolve, reject) => {

            fs.readFile(fileString, async function (err, data) {

                if (err) return reject("Can't find file name \"" + fileString + "\" in the path");

                console.log("processing file \"" + fileString + "\"");
                let string = data.toString();
                // finding all urls put them into a string array
                let urls = string.match(PATTERN);

                if (filteredUrl != null) {
                    if (filteredUrl.length != 0) {    //if filter is not empty, compare each filter with each url and remove the matching urls
                        for (let i = 0; i < filteredUrl.length; i++) {
                            for (let j = 0; j < urls.length; j++) {
                                if (urls[j].startsWith(filteredUrl[i].replace(/[^\x20-\x7E]/gmi, ""))) {      //replace used to remove control characters read from file
                                    urls.splice(j, 1);
                                    j = j - 1;                 //if a target is removed, the elements are shifted by 1, therefore j-1 is needed;
                                }
                            }
                        }
                    }
                    else return console.log("Invalid ignore pattern, please check the ignore file content.");
                }

                if (urls.length > 0) {
                    // remove redundant urls
                    let uniqueUrls = [...new Set(urls)];
                    await sendRequest.checkUrls(uniqueUrls, json, status);
                }
                resolve();
            })
        })
    }

    readUrl = (urlString) => {

        let urls = urlString.match(PATTERN);

        if (urls != null) sendRequest(urls[0]);

        else console.log("Wrong URL Format, please enter URL starting with https:// or http://.");

    }


}


module.exports = MyFile;