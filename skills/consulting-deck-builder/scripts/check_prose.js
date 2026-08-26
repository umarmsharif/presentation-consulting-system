#!/usr/bin/env node
// check_prose.js — prose linter for slide copy.
//
// The skill already states the prose rules; this enforces the three that
// are mechanically checkable, because a rule nothing checks is a rule that
// gets broken. Built after a capability deck shipped with five negative
// parallelisms across six slides — every one of them against a rule the
// skill had already written down.
//
// Checks:
//   1. Negative parallelism  — "not X, but Y" / "rather than" / "no A, no B"
//   2. Banned AI vocabulary  — the Prose and voice list
//   3. Em-dash density       — at most one per slide
//
// Exit code: 0 clean, 1 warnings present, 2 usage error.
//
// Usage:
//   node scripts/check_prose.js path/to/inputs.json
//   node scripts/check_prose.js path/to/build.js      (string literals)
//
// Quoted material is exempt: a client's own words are evidence, not copy.
// Anything inside "..." or '...' curly quotes is skipped.

const fs = require("fs");

const BANNED = ["delve","leverage","robust","seamless","transformative","paradigm",
  "cutting-edge","game-changer","unlock","holistic","synergy","streamline","empower",
  "scalable","revolutionize","elevate","frictionless","turnkey","best-in-class"];

// Negative parallelism: the cadence, not any single word.
const NEG = [
  { re: /\bnot just\b[^.!?]*\bbut\b/gi,        label: 'not just X but Y' },
  { re: /\bit'?s not\b[^.!?]*\bit'?s\b/gi,     label: "it's not X, it's Y" },
  { re: /,\s*not\s+(?:a|an|the|just)?\s*\w+/gi, label: 'X, not Y' },
  { re: /\brather than\b/gi,                    label: 'X rather than Y' },
  { re: /\bno\s+\w+,\s*no\s+\w+/gi,             label: 'no A, no B' },
];

function stripQuoted(s) {
  return s.replace(/[“][^”]*[”]/g, " ").replace(/[‘][^’]*[’]/g, " ");
}

function collect(file) {
  const raw = fs.readFileSync(file, "utf8");
  if (file.endsWith(".json")) {
    const d = JSON.parse(raw), out = [];
    const walk = (n, path) => {
      if (typeof n === "string") out.push({ text: n, where: path });
      else if (Array.isArray(n)) n.forEach((v, i) => walk(v, `${path}[${i}]`));
      else if (n && typeof n === "object") for (const k of Object.keys(n)) walk(n[k], path ? `${path}.${k}` : k);
    };
    walk(d, "");
    return out;
  }
  // build.js: string literals outside comment lines
  return raw.split("\n").flatMap((line, i) =>
    /^\s*(\/\/|\*)/.test(line) ? []
      : [...line.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(m => ({ text: m[1], where: `line ${i + 1}` })));
}

const file = process.argv[2];
if (!file) { console.error("usage: check_prose.js <inputs.json|build.js>"); process.exit(2); }

const items = collect(file);
const findings = [];
let emDashes = 0;

for (const { text, where } of items) {
  const body = stripQuoted(text);
  emDashes += (body.match(/—/g) || []).length;
  for (const { re, label } of NEG) {
    for (const m of body.matchAll(re)) findings.push({ where, kind: "negative-parallelism", label, hit: m[0].trim() });
  }
  for (const w of BANNED) {
    if (new RegExp(`(?<![a-z])${w}(?![a-z])`, "i").test(body)) findings.push({ where, kind: "banned-vocabulary", label: w, hit: w });
  }
}

if (!findings.length && emDashes === 0) { console.log("check_prose: clean"); process.exit(0); }

for (const f of findings) console.log(`  ${f.kind.padEnd(22)} ${f.label.padEnd(24)} ${f.where}\n${" ".repeat(4)}"${f.hit}"`);
if (emDashes) console.log(`  em-dash                ${emDashes} found — at most one per slide, and only when it earns its place`);

const negs = findings.filter(f => f.kind === "negative-parallelism").length;
if (negs > 2) console.log(`\n  ${negs} negative parallelisms is a pattern, not a slip. The cadence is a documented AI tell; vary it.`);
console.log(`\ncheck_prose: ${findings.length} finding(s)`);
process.exit(1);
