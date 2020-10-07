#!/usr/bin/env node

const readFile = require("./readers/fileReader.js")
const readUrl = require("./readers/urlReader.js")
const pjson = require('./package.json');
const argv = require('optimist').argv;

 if (process.argv.length == 2) {
    
    console.log(
        "urlStatusChecker is a command line tool for check all the URL's status inside the local html file.\n\n" +
        "The command is \"node urlStatusChecker filename\"\n\n" +
        "IMPORTANT! the tool only accpet .html file and make sure your .html file is in your current direction" +
        "Available option:\n -v / -version: Current version of urlStatusChecker\n\n"+
        "-u check URLs directly\n"
        )
}

else if (process.argv.length == 3) {

    if (process.argv[2] == "v" || process.argv[2] == "version" || argv.version || argv.v || argv.Version || argv.V || argv.VERSION)
        console.log("UrlStatusChecker version " + pjson.version);

    else readFile(process.argv[2]);
    
}

else if (process.argv.length > 3) {

    if (argv.u) readUrl(process.argv[3]);
    //processsing multiple file 
    else {
        for (let i = 2; i< process.argv.length; i++){
            readFile(process.argv[i]);
        }

    }

}

else console.log("Wrong arguments passed");

