const request = require("request");
const chalk = require("chalk");

const sendRequest = (url, json, status) => {
  return new Promise((resolve) => {
    request(url, {method: "HEAD"}, function (_, res) {
      if (!res) return resolve();
      if (json == true) {
        const jsonObj = {
          url: url,
          status: res.statusCode.toString(),
        };
        console.log(JSON.stringify(jsonObj));
      } else {
        if (status == "good") {
          if (res.statusCode == 200) console.log(chalk.green("[GOOD] " + url));
        } else if (status == "bad") {
          if (res.statusCode == 400 || res.statusCode == 404)
            console.log(chalk.red("[BAD] " + url));
        } else {
          if (res.statusCode == 200) console.log(chalk.green("[GOOD] " + url));
          else if (res.statusCode == 400 || res.statusCode == 404)
            console.log(chalk.red("[BAD] " + url));
          else if (
            res.statusCode == 301 ||
            res.statusCode == 307 ||
            res.statusCode == 308
          )
            console.log(chalk.blue("[Redirect] " + url));
          else console.log(chalk.grey("[UNKNOWN] " + url));
        }
      }
      resolve();
    });
  });
};

const checkUrls = (urls, json, status) => {
  return Promise.all(urls.map((url) => sendRequest(url, json, status)));
};

module.exports = {
  sendRequest,
  checkUrls,
};
