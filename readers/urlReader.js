const sendRequest = require("../urlRequest/urlRequest.js")

const readUrl = (urlString) => { 
    
        var PATTERN = /(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/ig

        var urls = urlString.match(PATTERN);

        if(urls != null) sendRequest(urls[0]);
        
        else console.log("Wrong url Format, please enter url starting with https:// or http://.");
    
}

module.exports = readUrl;