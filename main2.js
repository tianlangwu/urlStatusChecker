fs = require('fs');
const request = require('sync-request');
const chalk = require('chalk');
const getHrefs = require('get-hrefs');

const argv = require('optimist').argv;


var PATTERN = /\b(https?:\/\/.*?\.[a-z]{2,4}\/[^\s]*\b)/;

if (process.argv.length < 2){
    console.log("Wrong arguments passed");
}

else if (process.argv.length = 2){

if (argv.version || argv.v || argv.Version || argv.V ||argv.VERSION) {
    console.log("LinkStatusChecker version 0.0.1");
}

else {console.log(
    "urlStatusChecker is a Command Line tool for check all the url's status inside the local html file.\n"+
    "The command is \"urlStatusChecker filename\" for checking the local\n"+
    "Available option:\n -v / -version: Current version of urlStatusChecker"
)}

}
else if (process.argv.length == 3){

    var fileName = process.argv[2];
    fs.readFile(fileName, function (err,data){
        if (err) throw err;
        var string = data.toString();
        var array = [];
        array = getHrefs(string);
        filteredArray = array.filter(function (str){
            return PATTERN.test(str);
        })

        for (var i=0; i<filteredArray.length; i++){
            url = filteredArray[i];
            try{
            var response = request('GET', url);
            if (response.statusCode == 200)  console.log(chalk.green("[GOOD] " + url));
            else if (response.statusCode == 400 || response.statusCode == 404) console.log(chalk.red("[BAD] " + url));
            else console.log(chalk.grey("[UNKNOWN]" + url));
            } catch(e){console.log("[No Respond]" + url)}

        }

    })
  
 }

else console.log("Wrong arguments passed")

