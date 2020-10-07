const sendRequest = require("../urlRequest/urlRequest.js")

const readUrl = (urlString) => { 
    
        const PATTERN = /(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/ig
        
        let urls = urlString.match(PATTERN);
        
        if(urls != null) sendRequest(urls[0]);
        
        else console.log("Wrong URL Format, please enter URL starting with https:// or http://.");
    
}

module.exports = readUrl;