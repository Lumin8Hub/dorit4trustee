import assert from "node:assert/strict";
import { test } from "node:test";
import { sanitizePageUrl, createGtag, sanitizedReferrer } from "../src/lib/analytics-consent.mjs";

test("gtag queue receives argument objects and initializes with safe config location", () => {
  const calls = [];
  const gtag = createGtag(calls);
  gtag("js", 1);
  gtag("config", "G-TEST", { page_location: "safe" });
  assert.deepEqual(
    calls.map((args) => Array.from(args)),
    [
      ["js", 1],
      ["config", "G-TEST", { page_location: "safe" }],
    ],
  );
});

test("referrer retains safe origin and path but strips query and fragment", () => {
  assert.equal(
    sanitizedReferrer("https://example.org/give?email=x#top"),
    "https://example.org/give",
  );
});

test("page URLs omit unknown and sensitive query values while retaining campaign tags", () => {
  assert.equal(
    sanitizePageUrl(
      "https://dorit4trustee.com/contact?email=a%40b.com&utm_source=flyer&name=Jane#form",
    ),
    "https://dorit4trustee.com/contact?utm_source=flyer",
  );
});

test("page URLs retain only bounded, safe UTM campaign parameters", () => {
  assert.equal(
    sanitizePageUrl(
      "https://dorit4trustee.com/?utm_campaign=spring%20drive&utm_term=schools&token=secret",
    ),
    "https://dorit4trustee.com/?utm_campaign=spring+drive",
  );
});
