const {checkUrl} = require("./readUrl");
const {describe, test, expect} = require("@jest/globals");

describe("readUrl tests", () => {
  test("should return the url with https:// ", () => {
    const httpsUrl = "https://www.google.com";
    expect(checkUrl(httpsUrl)).toBe(httpsUrl);
  });

  test("should return the url with https:// ", () => {
    const hpptUrl = "http://www.google.com";
    expect(checkUrl(hpptUrl)).toBe(hpptUrl);
  });

  test("should return null with bad url ", () => {
    const badUrl = "www.google.com";
    expect(checkUrl(badUrl)).toBe(null);
  });

  test("should return the null if input is not string ", () => {
    [null, undefined, Object, 2].forEach((p) => expect(checkUrl(p)).toBe(null));
  });
});
