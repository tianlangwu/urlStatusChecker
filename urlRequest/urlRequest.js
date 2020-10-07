const request = require('sync-request');
const chalk = require('chalk');

const sendRequest = (url, json, status) => { 

    try {
        const response = request('GET', url);
        
        if (json == true){
            jsonObj = {
                url: url,
                status: response.statusCode.toString()
            }
            console.log(JSON.stringify(jsonObj));
        }

        else {
                if (status == "good"){
                    if (response.statusCode == 200) console.log(chalk.green("[GOOD] " + url));
                }

                else if(status == "bad"){
                    if (response.statusCode == 400 || response.statusCode == 404) console.log(chalk.red("[BAD] " + url));
                }

                else {
                    if (response.statusCode == 200) console.log(chalk.green("[GOOD] " + url));
                    else if (response.statusCode == 400 || response.statusCode == 404) console.log(chalk.red("[BAD] " + url));
                    else if (response.statusCode == 301 || response.statusCode == 307|| response.statusCode == 308) console.log(chalk.blue("[Redirect]" + url))
                    else console.log(chalk.grey("[UNKNOWN]" + url));
                }
            }
    } catch (e){}

}

module.exports = sendRequest;