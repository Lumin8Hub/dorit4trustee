import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Exercise the actual card markup without bootstrapping unrelated router/page content.
const pageSource = readFileSync(new URL("../src/routes/index.tsx", import.meta.url), "utf8");
const cards = pageSource.slice(pageSource.indexOf("{ENDORSEMENTS.map"), pageSource.indexOf('<div className="endorsements__cta">'));
const expression = cards.slice(0, cards.lastIndexOf("</div>"));
const cardCode = ts.transpileModule(`function Cards({ ENDORSEMENTS }) { return <>${expression}</>; }`, {
  compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2022 },
}).outputText;
const Cards = new Function("React", `${cardCode}; return Cards;`)(React);

const source = readFileSync(new URL("../src/data/endorsements.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ES2022 },
});
const { ENDORSEMENTS } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

test("Dr Weidong Pei endorsement preserves the supplied title, photo, website and full quote", () => {
  const endorsement = ENDORSEMENTS.find((entry) => entry.name === "Dr Weidong Pei");
  assert.ok(endorsement, "Dr Weidong Pei endorsement must exist");
  assert.equal(endorsement.role, "Toronto District School Board Trustee");
  assert.equal(endorsement.riding, "Ward 4 - York Centre & Willowdale");
  assert.equal(endorsement.website, "https://www.weidongpei.ca/");
  assert.equal(endorsement.photo, "/images/endorsers/weidong-pei.png");
  assert.ok(existsSync(new URL(`../public${endorsement.photo}`, import.meta.url)));
  assert.deepEqual(endorsement.quote, [
    "I’m proud to endorse Dorit Smali for Public School Trustee.",
    "Dorit is a caring, hardworking, and passionate advocate who understands both education and the policies that shape our schools. For many years, she has advocated for children, families, and stronger schools, and she understands the challenges facing students, parents, and educators.",
    "What stands out about Dorit is her commitment to listening, understanding the issues, and working toward practical solutions. She is motivated by a genuine desire to help children succeed, support parents, and ensure teachers have the resources and support they need.",
    "I believe in Dorit and know she will bring passion, dedication, and a strong understanding of education to the role of YRDSB Trustee.",
  ]);
});

test("endorsement cards link Dr Pei's name and keep other names unchanged", () => {
  const html = renderToStaticMarkup(React.createElement(Cards, { ENDORSEMENTS }));
  assert.match(html, /<a href="https:\/\/www\.weidongpei\.ca\/">Dr Weidong Pei<\/a>/);
  assert.match(html, /<h3 class="endorsement-card__name">Stephen Lecce<\/h3>/);
  assert.match(html, /alt="Portrait of Dr Weidong Pei"/);
  assert.equal((html.match(/<article /g) || []).length, ENDORSEMENTS.length);
});
