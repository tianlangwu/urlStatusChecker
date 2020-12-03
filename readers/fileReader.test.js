const MyFile = require("./fileReader.js");
const myFile = new MyFile();

describe("fileReader tests", () => {
  test("read a nonexisting file return reject", async () => {
    const fileName = "abcd";
    expect(() => myFile.readFile(fileName, false, "all", null)).rejects;
  });
});
