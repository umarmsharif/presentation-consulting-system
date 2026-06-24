#!/usr/bin/env node
// check_titles.js — action-title linter for a deck plan.
//
// Flags slide titles that read as topic-only nouns ("Revenue analysis",
// "Roadmap", "Three findings", "Ask") instead of insight assertions
// ("Revenue grew 15%", "Phase 1 ships in 4 weeks", "The funnel breaks
// in three places"). Run it on your ghost-deck plan before you build,
// and again before delivery.
//
// Exit code: 0 clean, 1 warnings present, 2 usage error.
//
// Usage:
//   node scripts/check_titles.js path/to/plan.json
//
// Accepts either shape of JSON:
//   1. { "slides": [ { "title": "...", "layout": "..." }, ... ] }
//   2. [ "first title", "second title", ... ]   (a plain array of strings)
//
// The heuristic: a title is flagged unless it contains at least one verb
// from a small action-verb list, OR uses an em-dash/colon construction
// that promises a follow-on insight ("Revenue: a 15% beat"), OR contains
// a number (numbers usually quantify a claim).
//
// This is a *gate*, not a hard rule — sometimes a topic title is right
// (e.g. on a section divider). The lint surfaces the candidates so the
// author can review and either rewrite or accept.

const fs = require("fs");

const inputsPath = process.argv[2];
if (!inputsPath) {
  console.error("Usage: node check_titles.js <plan.json>");
  process.exit(2);
}

let raw;
try {
  raw = JSON.parse(fs.readFileSync(inputsPath, "utf8"));
} catch (e) {
  console.error(`Could not read/parse ${inputsPath}: ${e.message}`);
  process.exit(2);
}

// Small whitelist of action verbs common in assertive prose. Lowercased
// matching against title tokens.
const ACTION_VERBS = new Set([
  // generic
  "is","are","was","were","be","been","being","has","have","had","does","do","did",
  "will","would","should","must","can","may","won","loses","lost","beats","beat","ships","ship","shipped",
  "grows","grew","grow","drops","dropped","drop","rises","rose","rise","falls","fell",
  "fall","kills","kill","killed","sits","sat","lives","lived","tied","tie","tying",
  "lands","landed","drives","drove","drive","gates","gate","blocks","blocked","block",
  "leads","led","captures","captured","capture","covers","covered","cover","signs","signed",
  "names","named","name","owns","owned","runs","ran","run","stops","stopped","stop",
  "slips","slipped","slip","slows","slowed","slow","scales","scaled","scale","trains","trained",
  "train","builds","built","build","earns","earned","earn","lose","needs",
  "needed","need","owes","owed","owe","pays","paid","pay","fixes","fixed","fix","breaks",
  "broke","break","broken","says","said","say","tells","told","tell","misses","missed","miss",
  "hits","hit","wins","matters","mattered","matter","spans","spanned","span",
  "enters","entered","enter","exits","exited","exit","picks","picked","pick","ignores",
  "ignored","ignore","starts","started","start","ends","ended","end","keeps","kept","keep",
  "makes","made","make","gets","got","get","puts","put","sets","set","gives","gave","give",
  "works","worked","work","fails","failed","fail","helps","helped","help","saves","saved","save",
  "frees","freed","free","fits","fit","reads","read","calls","called","call","shows","showed","show",
  // structure-y / argument verbs
  "ranks","ranked","frames","framed","frame","cuts","cut","sequences","sequenced",
  "sequence","unblocks","unblocked","unblock","compounds","compounded","compound",
  "stalls","stalled","stall","peaks","peaked","peak","outpaces","outpace",
  "outpaced","triples","triple","tripled","doubles","double","doubled","quadruples","quadrupled"
]);

// Topic-only red-flag words. A short title made mostly of these is a noun-stack.
const TOPIC_RED_FLAGS = new Set([
  "analysis","findings","roadmap","ask","summary","overview","review","results",
  "approach","plan","strategy","methodology","background","appendix",
  "introduction","conclusion","agenda","outlook","considerations","issues","risks",
  "opportunities","themes","highlights","breakdown","comparison","context","scope"
]);

// Normalise either input shape into [{ i, layout, title }]
const titles = [];
if (Array.isArray(raw)) {
  raw.forEach((t, i) => {
    if (typeof t === "string" && t.trim()) titles.push({ i: i + 1, layout: null, title: t });
  });
} else if (raw && Array.isArray(raw.slides)) {
  raw.slides.forEach((s, i) => {
    if (s && s.title) titles.push({ i: i + 1, layout: s.layout || null, title: s.title });
  });
} else {
  console.error('Expected { "slides": [...] } or an array of title strings.');
  process.exit(2);
}

function lintTitle(title) {
  const t = title.trim();
  const tokens = t.toLowerCase().replace(/[—–\-:.,;!?]/g, " ").split(/\s+/).filter(Boolean);
  if (!tokens.length) return { ok: true, reason: "empty" };

  // A number in the title is a strong signal it makes a quantitative claim.
  if (/\d/.test(t)) return { ok: true, reason: "contains-number" };

  // Em-dash, colon, or "and why" / "but" markers signal a two-clause assertion.
  if (/—|–|:|\bbut\b|\band why\b/i.test(t)) return { ok: true, reason: "two-clause-construction" };

  // An action verb makes it an assertion.
  if (tokens.some((tok) => ACTION_VERBS.has(tok))) return { ok: true, reason: "has-action-verb" };

  // A short noun-stack carrying a topic red-flag word is the core failure mode.
  if (tokens.length <= 4) {
    if (tokens.some((tok) => TOPIC_RED_FLAGS.has(tok))) {
      return { ok: false, reason: "noun-stack-with-topic-word" };
    }
    return { ok: false, reason: "short-no-verb-no-number" };
  }

  // Longer titles without a verb or number are suspicious, but less so.
  return { ok: false, reason: "no-verb-no-number" };
}

const flagged = [];
titles.forEach(({ i, layout, title }) => {
  const r = lintTitle(title);
  if (!r.ok) flagged.push({ i, layout, title, reason: r.reason });
});

console.log("ACTION-TITLE LINT");
console.log(`  Titles checked: ${titles.length}`);
console.log(`  Flagged: ${flagged.length}`);
console.log("");
if (flagged.length === 0) {
  console.log("  All slide titles read as assertions.");
  process.exit(0);
}
flagged.forEach((f) => {
  console.log(`  ! slide ${f.i}${f.layout ? ` [${f.layout}]` : ""}: "${f.title}"`);
  console.log(`    reason: ${f.reason}`);
  console.log(`    fix: rewrite as an insight statement (verb + specific claim).`);
  console.log(`         not "Three findings" but "The funnel breaks in three places."`);
  console.log(`         not "Roadmap" but "From MVP to enterprise in 18 weeks."`);
  console.log("");
});
process.exit(1);
