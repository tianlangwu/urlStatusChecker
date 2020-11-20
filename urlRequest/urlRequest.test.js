const nock = require("nock");
const {sendRequest, checkUrls} = require("./urlRequest");
const chalk = require("chalk");
const {
  describe,
  beforeEach,
  afterEach,
  test,
  expect,
} = require("@jest/globals");

const originalConsoleLogFn = global.console.log;

describe("sendRequest tests", () => {
  let logOutput = null;

  function testLogFn(string) {
    logOutput = string;
  }

  beforeEach(() => {
    global.console.log = testLogFn;
    logOutput = null;
  });

  afterEach(() => {
    global.console.log = originalConsoleLogFn;
    logOutput = null;
  });

  test("sending request to a good url will return Good+ url", async () => {
    const url = "https://www.google.com";
    const expected = "[GOOD] https://www.google.com";

    nock(url).intercept("/", "HEAD").reply(200);

    await sendRequest(url);
    expect(logOutput).toEqual(chalk.green(expected));
  });

  test("send request to a bad url will return Bad + url", async () => {
    const url = "https://www.google.com";
    const expected = "[BAD] https://www.google.com";

    nock(url).intercept("/", "HEAD").reply(400);

    await sendRequest(url);
    expect(logOutput).toEqual(chalk.red(expected));
  });

  test("send request to a redirect url will return Redirect + url", async () => {
    const url = "https://www.google.com";
    const expected = "[Redirect] https://www.google.com";

    nock(url).intercept("/", "HEAD").reply(301);

    await sendRequest(url);
    expect(logOutput).toEqual(chalk.blue(expected));
  });

  test("send request to a unknown url will return unknown + url", async () => {
    const url = "https://www.google.com";
    const expected = "[UNKNOWN] https://www.google.com";

    nock(url).intercept("/", "HEAD").reply(555);

    await sendRequest(url);
    expect(logOutput).toEqual(chalk.grey(expected));
  });

  test("send request to a url with json output", async () => {
    const url = "https://www.google.com";
    const expected = '{"url":"https://www.google.com","status":"200"}';

    nock(url).intercept("/", "HEAD").reply(200);

    await sendRequest(url, true);
    expect(logOutput).toEqual(expected);
  });

  test("send request to a good url that only return only good status", async () => {
    const url = "https://www.google.com";
    const expected = "[GOOD] https://www.google.com";

    nock(url).intercept("/", "HEAD").reply(200);

    await sendRequest(url, false, "good");
    expect(logOutput).toEqual(chalk.green(expected));
  });

  test("send request to a bad url that only return only good status", async () => {
    const url = "https://www.google.com";
    const expected = null;

    nock(url).intercept("/", "HEAD").reply(400);

    await sendRequest(url, false, "good");
    expect(logOutput).toEqual(expected);
  });

  test("send request to a bad url that only return only bad status", async () => {
    const url = "https://www.google.com";
    const expected = "[BAD] https://www.google.com";

    nock(url).intercept("/", "HEAD").reply(400);

    await sendRequest(url, false, "bad");
    expect(logOutput).toEqual(chalk.red(expected));
  });

  test("send request to a bad url that only return only good status", async () => {
    const url = "https://www.google.com";
    const expected = null;

    nock(url).intercept("/", "HEAD").reply(200);

    await sendRequest(url, false, "bad");
    expect(logOutput).toEqual(expected);
  });

  test("sending request to a good url array will return Good + url", async () => {
    const [...urls] = ["https://www.google.com"];
    const expected = "[GOOD] https://www.google.com";

    [...urls].forEach((p) => nock(p).intercept("/", "HEAD").reply(200));
    await checkUrls(urls);
    expect(logOutput).toEqual(chalk.green(expected));
  });

  test("sending request to empty string will return null", async () => {
    const url = "";
    await sendRequest(url);
    expect(logOutput).toEqual(null);
  });
});
