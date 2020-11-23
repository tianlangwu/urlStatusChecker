const execa = require("execa");
const {describe, test, expect} = require("@jest/globals");
expect.addSnapshotSerializer(require("jest-snapshot-serializer-ansi"));

describe("end-to-end integration", () => {
  test("prints tool with no arguments pass", async () => {
    const {stdout, stderr} = await execa("node", ["urlstatuschecker"]);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints tool version with arument -v", async () => {
    const {stdout, stderr} = await execa("node", ["urlstatuschecker", "-v"]);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints url information with a path", async () => {
    const {stdout, stderr} = await execa("node", [
      "urlstatuschecker",
      "tests/test1.html",
    ]);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints url information with two filepath", async () => {
    const {stdout, stderr} = await execa("node", [
      "urlstatuschecker",
      "tests/test1.html",
      "tests/test2.html",
    ]);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints url information with path and json output", async () => {
    const {stdout, stderr} = await execa("node", [
      "urlstatuschecker",
      "-j",
      "tests/test1.html",
    ]);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints url information with path and only good output", async () => {
    const {stdout, stderr} = await execa("node", [
      "urlstatuschecker",
      "-g",
      "tests/test1.html",
    ]);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints url information with path and only bad output", async () => {
    const {stdout, stderr} = await execa("node", [
      "urlstatuschecker",
      "-b",
      "tests/test1.html",
    ]);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints url information with url string", async () => {
    const {stdout, stderr} = await execa("node", [
      "urlstatuschecker",
      "-u",
      "https://www.google.com",
    ]);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("prints url information with ignore arugment", async () => {
    const {stdout, stderr} = await execa("node", [
      "urlstatuschecker",
      "-i",
      "tests/test1.html",
      "tests/test2.html",
    ]);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });
});
