#!/usr/bin/env node
const checkFiltertedUrls = require("./readers/filterUrlReader.js");
const pjson = require("./package.json");
const MyFile = require("./readers/fileReader.js");
const urlRequest = require("./urlRequest/urlRequest.js");
const argv = require("optimist").argv;

async function run() {
  let myFile = new MyFile();

  if (process.argv.length == 2) {
    console.log(
      "urlStatusChecker is a command line tool for check all the URL's status inside the local html file.\n\n" +
        'The command is "node urlStatusChecker filename"\n\n' +
        "IMPORTANT! the tool only accpet .html file and make sure your .html file is in your current direction" +
        "Available option:\n -v / -version: Current version of urlStatusChecker\n\n" +
        "-u check URLs directly\n",
    );
  } else if (process.argv.length == 3) {
    if (
      process.argv[2] == "v" ||
      process.argv[2] == "version" ||
      argv.version ||
      argv.v ||
      argv.Version ||
      argv.V ||
      argv.VERSION
    )
      console.log("UrlStatusChecker version " + pjson.version);
    else if (process.argv[2] == "telescope") {
      urlRequest.checkTelescope();
    } else myFile.readFile(process.argv[2]);
  } else if (process.argv.length > 3) {
    if (
      process.argv[2] == "i" ||
      process.argv[2] == "ignore" ||
      argv.i ||
      argv.i ||
      argv.ignore ||
      argv.Ignore ||
      argv.IGNORE
    ) {
      checkFiltertedUrls(process.argv[3]);
    } else {
      let index = 3;
      if (argv.good) myFile.status = "good";
      else if (argv.bad) myFile.status = "bad";
      else if (argv.all);
      else if (argv.json || argv.j) myFile.json = true;
      else index = 2;

      if (argv.u) myFile.readUrl(process.argv[3]);

      for (let i = index; i < process.argv.length; i++) {
        await myFile.readFile(process.argv[i]);
      }
    }
  } else console.log("Wrong arguments passed");
}

run();
