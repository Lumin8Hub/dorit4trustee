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

const RETIRED = ["meet-dorit", "priorities", "ward-1", "vote", "voting", "donate", "lawn-sign", "get-involved"];
const routeFiles = readdirSync(new URL("src/routes/", root)).filter((f) => f.endsWith(".tsx"));
const liveRoutes = routeFiles.filter((f) => !RETIRED.includes(f.replace(/\.tsx$/, "")));

test("no fundraising or campaign calls to action anywhere in live pages or shared components", () => {
  const files = [
    ...liveRoutes.map((f) => `src/routes/${f}`),
    ...readdirSync(new URL("src/components/", root))
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => `src/components/${f}`),
  ];
  const banned = /donat|zeffy|e-?transfer|fundrais|contribut|lawn sign|volunteer for|join the campaign|how to vote|register to vote|request a sign/i;
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

test("updates have unique slugs, ISO dates and sources over https", async () => {
  const { UPDATES } = await importTs("src/data/updates.ts");
  assert.ok(UPDATES.length >= 1);
  assert.equal(new Set(UPDATES.map((u) => u.slug)).size, UPDATES.length);
  for (const u of UPDATES) {
    assert.match(u.date, /^\d{4}-\d{2}-\d{2}$/);
    for (const s of u.sources ?? []) assert.match(s.href, /^https:\/\//);
  }
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
