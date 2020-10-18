#!/usr/bin/env node

const readFile = require("./readers/fileReader.js")
const readUrl = require("./readers/urlReader.js")
const readUrlFilter = require("./readers/filterUrlReader.js")
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

    if (process.argv[2] == "i" || process.argv[2] == "ignore" || argv.i || argv.i || argv.ignore || argv.Ignore || argv.IGNORE){
       
        checkFiltertedUrls(false, "all"); //json format output is disabled for now, display result is set to all to show all responses.
        
    }
    else{
        let status = "all";
        let json = false;
        let i = 3;
        let filter = null;

        if (argv.good) status = "good";
        else if (argv.bad) status = "bad";
        else if (argv.json || argv.j) json = true;
        else {
            status = "all";
            i = 2;
        }
        
        if (argv.u) readUrl(process.argv[3]);

        else {
            for (i; i< process.argv.length; i++){
                readFile(process.argv[i], json, status, filter);
            }
        }
    }
}


else console.log("Wrong arguments passed");

async function checkFiltertedUrls(json, status) {           //function to receive/apply filters and read url files to check status code
    var ignoredUrl = await readUrlFilter(process.argv[3]);
    //read the file with filter applied
    for (let i = 4; i < process.argv.length; i++){
        readFile(process.argv[i], false, status, ignoredUrl);
    }
}