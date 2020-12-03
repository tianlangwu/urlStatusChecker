#!/usr/bin/env node
const checkFiltertedUrls = require("./readers/filterUrlReader.js");
const pjson = require("./package.json");
const MyFile = require("./readers/fileReader.js");
const argv = require("optimist").argv;
const {readUrl} = require("./readers/readUrl");

async function main() {
  let myFile = new MyFile();

  if (process.argv.length == 2) {
    console.log(
      "urlStatusChecker is a command line tool for check all the URL's status inside the local html file.\n\n" +
        'The command is "node urlStatusChecker filename"\n\n' +
        "Available option:\n -v / -version: Current version of urlStatusChecker\n\n" +
        "-u check URLs directly\n",
    );
  } else if (process.argv.length == 3) {
    if (
      process.argv[2] == "v" ||
      process.argv[2] == "version" ||
      argv.v ||
      argv.V
    )
      console.log("UrlStatusChecker version " + pjson.version);
    else myFile.readFile(process.argv[2]);
  } else if (process.argv.length > 3) {
    if (
      process.argv[2] == "i" ||
      process.argv[2] == "ignore" ||
      argv.i ||
      argv.i
    ) {
      checkFiltertedUrls(process.argv[3]);
    } else {
      let index = 3;
      if (argv.g) myFile.status = "good";
      else if (argv.b) myFile.status = "bad";
      else if (argv.j) myFile.json = true;
      else index = 2;

      if (argv.u) readUrl(process.argv[3]);
      else {
        for (let i = index; i < process.argv.length; i++) {
          await myFile.readFile(process.argv[i]);
        }
      }
    }
  } else console.log("Wrong arguments passed");
}

main();
