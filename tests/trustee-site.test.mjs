import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");

async function importTs(path) {
  const { outputText } = ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const RETIRED = ["meet-dorit", "priorities", "ward-1", "vote", "voting", "donate", "lawn-sign"];
const routeFiles = readdirSync(new URL("src/routes/", root)).filter((f) => f.endsWith(".tsx"));
const liveRoutes = routeFiles.filter((f) => !RETIRED.includes(f.replace(/\.tsx$/, "")));

// Supporter sign-up (events, next campaign) is allowed since Dorit's Nov 1, 2026 feedback.
// Fundraising and 2026 voting instructions stay banned.
test("no fundraising or 2026 voting calls to action in live pages or shared components", () => {
  const files = [
    ...liveRoutes.map((f) => `src/routes/${f}`),
    ...readdirSync(new URL("src/components/", root))
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => `src/components/${f}`),
  ];
  const banned = /donat|zeffy|e-?transfer|fundrais|contribut|how to vote|register to vote|request a sign/i;
  for (const f of files) {
    const hits = read(f).match(banned);
    assert.equal(hits, null, `${f} mentions "${hits?.[0]}"`);
  }
});

test("donation code, secrets and endpoints are removed", () => {
  for (const f of ["src/components/ZeffyEmbed.tsx", "src/components/EtransferBlock.tsx", "google-apps-script/DonateCode.js", "src/data/voting.ts"]) {
    assert.ok(!existsSync(new URL(f, root)), `${f} should be deleted`);
  }
  assert.doesNotMatch(read(".github/workflows/deploy.yml"), /DONATE/);
  assert.doesNotMatch(read(".env.example"), /DONATE/);
});

test("retired campaign URLs redirect with noindex", () => {
  for (const r of RETIRED) {
    const src = read(`src/routes/${r}.tsx`);
    assert.match(src, /redirectHead\("\/[a-z-]*"\)/, `${r} must use redirectHead`);
    assert.match(src, /RedirectPage to="\/[a-z-]*"/, `${r} must render RedirectPage`);
  }
  assert.match(read("src/components/PageShell.tsx"), /name: "robots", content: "noindex"/);
});

test("every route is prerendered for GitHub Pages", () => {
  const config = read("vite.config.ts");
  for (const f of routeFiles) {
    const name = f.replace(/\.tsx$/, "");
    if (name.startsWith("__") || name.includes("$")) continue;
    const path = name === "index" ? "/" : `/${name.replace(/\.index$/, "")}`;
    assert.ok(config.includes(`{ path: "${path}" }`), `${path} missing from prerender pages`);
  }
});

test("footer carries the personal-site disclaimer", async () => {
  const { SITE } = await importTs("src/data/site.ts");
  assert.match(SITE.disclaimer, /personal website/);
  assert.match(SITE.disclaimer, /not an official York Region District School Board website/);
  assert.match(read("src/components/Footer.tsx"), /SITE\.disclaimer/);
  assert.doesNotMatch(read("src/components/Footer.tsx"), /Official Agent/);
});

test("certified result matches the Township of King certificate", async () => {
  const { ELECTION_RESULT, SITE } = await importTs("src/data/site.ts");
  assert.equal(ELECTION_RESULT.votes, 5430);
  assert.equal(ELECTION_RESULT.totalTrusteeVotes, 5430 + 4606 + 3356);
  assert.match(ELECTION_RESULT.certificateUrl, /^https:\/\/www\.king\.ca\/.+\.pdf$/);
  assert.equal(SITE.boardBudget, "$1.7 billion");
  const archive = read("src/routes/2026-campaign.tsx");
  assert.match(archive, /votes: 5430/);
  assert.match(archive, /votes: 4606/);
  assert.match(archive, /votes: 3356/);
});

test("schools: 13 elementary and 2 secondary, each linked to yrdsb.ca", async () => {
  const { ELEMENTARY, SECONDARY, SCHOOLS } = await importTs("src/data/schools.ts");
  assert.equal(ELEMENTARY.length, 13);
  assert.equal(SECONDARY.length, 2);
  for (const s of SCHOOLS) assert.match(s.url, /^https:\/\/[a-z]+-(ps|es|ss|hs)\.yrdsb\.ca\/$/, s.name);
});

const sourceFiles = () => [
  ...liveRoutes.map((f) => `src/routes/${f}`),
  ...readdirSync(new URL("src/components/", root))
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => `src/components/${f}`),
  "src/data/site.ts",
];

test("board updates go to the YRDSB newsroom, not a section on this site", async () => {
  const { BOARD_NEWS_URL } = await importTs("src/data/site.ts");
  assert.equal(BOARD_NEWS_URL, "https://www2.yrdsb.ca/newsroom/news");
  assert.ok(!existsSync(new URL("src/data/updates.ts", root)), "updates data should be deleted");
  assert.ok(!existsSync(new URL("src/routes/updates.$slug.tsx", root)), "update posts should be deleted");
  assert.match(read("src/routes/updates.index.tsx"), /ExternalRedirectPage href=\{BOARD_NEWS_URL\}/);
  for (const f of sourceFiles()) {
    if (f.endsWith("updates.index.tsx")) continue;
    assert.doesNotMatch(read(f), /to="\/updates|UPDATES/, `${f} still links to the old updates section`);
  }
  assert.match(read("src/components/Header.tsx"), /BOARD_NEWS_URL/);
  assert.match(read("src/components/Footer.tsx"), /BOARD_NEWS_URL/);
});

test("no email address or phone number is published; board matters wait for the YRDSB email", async () => {
  const { SITE } = await importTs("src/data/site.ts");
  assert.equal(SITE.email, undefined, "personal inbox must not be in site data");
  assert.equal(SITE.yrdsbPhone, undefined, "no phone number on the site");
  for (const f of sourceFiles()) {
    const src = read(f);
    assert.doesNotMatch(src, /tel:|@dorit4trustee|@gmail|\d{3}[-.\s]\d{3}[-.\s]\d{4}/, f);
    const mailtos = src.match(/mailto:[^`"]*/g) ?? [];
    for (const m of mailtos) assert.equal(m, "mailto:${SITE.yrdsbEmail}", `${f}: ${m}`);
  }
  assert.match(read("src/routes/contact.tsx"), /SITE\.yrdsbEmail \?/);
});

test("Dorit's Nov 1 feedback: no Nextdoor, no hero slogan, new real headshot", () => {
  for (const f of sourceFiles()) assert.doesNotMatch(read(f), /nextdoor/i, f);
  assert.doesNotMatch(read("src/routes/index.tsx"), /Back to Basics|hero__subtitle/);
  assert.ok(!existsSync(new URL("public/images/dorit-portrait.png", root)), "old portrait removed");
  assert.ok(existsSync(new URL("public/images/dorit-portrait.jpg", root)));
});

test("supporter sign-up identifies voters and asks for consent", () => {
  const form = read("src/components/SupporterForm.tsx");
  assert.match(form, /formType: "supporter"/);
  const requiredField = (field) => {
    const start = form.indexOf("name={`${id}-" + field + "`}");
    assert.ok(start > 0, `${field} field missing`);
    const tag = form.slice(start, form.indexOf(">", start));
    return /\brequired\b/.test(tag);
  };
  for (const field of ["first-name", "last-name", "email", "address", "community", "postal-code", "consent"]) {
    assert.ok(requiredField(field), `${field} must be required`);
  }
  assert.match(read("src/routes/get-involved.tsx"), /<SupporterForm \/>/);
  assert.match(read("google-apps-script/Code.js"), /formType === "supporter"/);
  assert.match(read("src/components/Header.tsx"), /to="\/get-involved"/);
});

test("resources are absolute URLs", async () => {
  const { RESOURCE_GROUPS } = await importTs("src/data/resources.ts");
  for (const g of RESOURCE_GROUPS) for (const l of g.links) assert.match(l.href, /^https?:\/\//, l.label);
});

test("endorsements appear only on the 2026 campaign page", () => {
  for (const f of liveRoutes) {
    if (f === "2026-campaign.tsx") continue;
    assert.doesNotMatch(read(`src/routes/${f}`), /ENDORSEMENTS/, f);
  }
  assert.match(read("src/routes/2026-campaign.tsx"), /ENDORSEMENTS\.map/);
});
