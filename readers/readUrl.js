const sendRequest = require("../urlRequest/urlRequest.js");
const PATTERN = /(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/gi;

const goodUrl = (urlString) => {
  if (typeof urlString != "string") return null;
  let urls = urlString.match(PATTERN);

  if (urls != null) return urls[0];
  else return null;
};

const readUrl = (urlString) => {
  const url = goodUrl(urlString);
  if (url != null) {
    sendRequest.sendRequest(url);
  } else
    console.log(
      "Wrong URL Format, please enter URL starting with https:// or http://",
    );
};

module.exports.readUrl = readUrl;
module.exports.checkUrl = goodUrl;
