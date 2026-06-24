// Demo deck: showcases the consulting-deck-builder design system.
// Theme: Bright White & Pine (default). Display: Charter (serif). Body: Manrope.
// Fully fictional content (Meridian, a mid-market B2B SaaS) — illustrative only.
// Requires pptxgenjs (npm i pptxgenjs). Run: node build_demo.js  (writes demo.pptx in the cwd)

const PptxGenJS = require("pptxgenjs");
const pres = new PptxGenJS();
pres.defineLayout({ name: "DEMO", width: 13.333, height: 7.5 });
pres.layout = "DEMO";

// ── v5 tokens — Bright White & Pine (the signature look) ───────────────────────
const SURFACE = "FCFCFA", INK = "1A1A1A", BODY = "45474A", MUTE = "8A8D90";
const LINE = "DADEDC", PANEL = "F2F4F3", WH = "FFFFFF";
const ACCENT = "12564A", ACCENT_DK = "0C3D34", TINT = "E6EFEA", TINT_BORDER = "C9DBD2"; // deep pine
const G = "2F7A55", A = "B07D2B", R = "B23A2E"; // semantic: good / amber / risk
const DISPLAY = "Charter", DISPLAY_BOLD = false, FONT = "Manrope"; // serif display + sans body

// ── Universal chrome ───────────────────────────────────────────────────────────
function header(s, breadcrumb, num, total) {
  s.background = { color: SURFACE };
  s.addText(breadcrumb.toUpperCase(), { x: 0.533, y: 0.42, w: 8.5, h: 0.3, fontSize: 10.5, bold: true, color: ACCENT, fontFace: FONT, charSpacing: 3 });
  s.addText(total ? `${num} / ${total}` : `${num}`, { x: 10.667, y: 0.42, w: 2.133, h: 0.3, fontSize: 10.5, color: MUTE, fontFace: FONT, align: "right" });
  s.addShape(pres.ShapeType.rect, { x: 0.533, y: 0.8, w: 12.267, h: 0.013, fill: { color: LINE }, line: { color: LINE } });
}

function titleBlock(s, context, headline) {
  s.addText(context, { x: 0.533, y: 1.0, w: 12.267, h: 0.36, fontSize: 13.5, italic: true, color: ACCENT, fontFace: FONT });
  s.addText(headline, { x: 0.533, y: 1.4, w: 12.267, h: 0.95, fontSize: 29, bold: DISPLAY_BOLD, color: INK, fontFace: DISPLAY });
}

function footer(s, note, label) {
  s.addText(note, { x: 0.533, y: 7.067, w: 9.333, h: 0.333, fontSize: 11, italic: true, color: MUTE, fontFace: FONT });
  s.addText(label, { x: 10.0, y: 7.067, w: 2.8, h: 0.333, fontSize: 11, color: MUTE, fontFace: FONT, align: "right" });
}

// ─── Slide 1: Title with thesis callout panel (pine tint) ──────────────────────
const s1 = pres.addSlide();
s1.background = { color: SURFACE };
s1.addText("RETENTION DIAGNOSTIC  ·  BOARD READ-OUT", { x: 0.533, y: 1.6, w: 11.467, h: 0.467, fontSize: 12, bold: true, color: ACCENT, charSpacing: 4, fontFace: FONT });
s1.addText("Breaking Meridian's\nRevenue Plateau", { x: 0.5, y: 2.2, w: 11.8, h: 1.6, fontSize: 46, bold: DISPLAY_BOLD, color: INK, fontFace: DISPLAY, lineSpacingMultiple: 0.98 });
s1.addText("Prepared for the leadership team  ·  Q2 2026  ·  Illustrative demonstration deck", { x: 0.533, y: 3.95, w: 11.0, h: 0.373, fontSize: 13.3, italic: true, color: MUTE, fontFace: FONT });

// Thesis callout — pine tint panel, full fill + tint border (no left bar)
s1.addShape(pres.ShapeType.rect, { x: 0.533, y: 4.52, w: 12.267, h: 2.32, fill: { color: TINT }, line: { color: TINT_BORDER, pt: 0.8 } });
s1.addText("THESIS", { x: 0.867, y: 4.66, w: 2.667, h: 0.293, fontSize: 10.7, bold: true, color: ACCENT, charSpacing: 3, fontFace: FONT });
s1.addText(
  "Meridian's net revenue retention stalled at 101% because mid-market accounts leave during onboarding, well before any renewal date. Fixing the first 60 days recovers the plateau faster than any new-logo push.",
  { x: 0.867, y: 5.0, w: 11.6, h: 0.9, fontSize: 17, bold: true, color: INK, fontFace: DISPLAY, wrap: true }
);
s1.addText(
  "ARR flat at $48M for three quarters. Gross retention 88%. The growth gap is a leak the renewal desk cannot see, because it opens earlier in the lifecycle than they ever look.",
  { x: 0.867, y: 6.0, w: 11.6, h: 0.66, fontSize: 12.7, italic: true, color: BODY, fontFace: FONT, wrap: true }
);
s1.addText(
  "Illustrative content. Meridian is a fictional company; all figures are fabricated to demonstrate the design system.",
  { x: 0.533, y: 7.067, w: 12.267, h: 0.333, fontSize: 10.7, italic: true, color: MUTE, fontFace: FONT }
);

// ─── Slide 2: Diagnostic three-panel (dense findings) ──────────────────────────
const s2 = pres.addSlide();
header(s2, "THE DIAGNOSIS", 2, 4);
titleBlock(
  s2,
  "Three findings from the account-level cohort review, trailing twelve months.",
  "The plateau traces to three failures, all upstream of renewal"
);

const panels = [
  {
    n: "01",
    head: "Onboarding decides retention",
    stat: "63%",
    statLabel: "of churn happens in months 1–3",
    body: "Accounts that hit first value inside 21 days renew at 94%. Those past 45 days renew at 71%. The activation window, not the product, sets the ceiling.",
  },
  {
    n: "02",
    head: "Expansion is concentrated, not broad",
    stat: "11",
    statLabel: "accounts drive 70% of net expansion",
    body: "Seat and usage growth sits in a thin band of power users. The long tail is flat from month four onward, so one lost champion erases a quarter of upsell.",
  },
  {
    n: "03",
    head: "The signal arrives too late",
    stat: "38 days",
    statLabel: "median lag before a risk flag fires",
    body: "Health scores update on support tickets and renewal dates. By the time an account turns red the recovery window has usually closed.",
  },
];
const pW = 3.96, pH = 4.18, pY = 2.55, pGap = 0.18;
const pX = panels.map((_, i) => 0.533 + i * (pW + pGap));
panels.forEach((p, i) => {
  const x = pX[i];
  s2.addShape(pres.ShapeType.rect, { x, y: pY, w: pW, h: pH, fill: { color: PANEL }, line: { color: LINE, pt: 0.8 } });
  // Number badge (accent oval)
  s2.addShape(pres.ShapeType.ellipse, { x: x + 0.27, y: pY + 0.3, w: 0.62, h: 0.62, fill: { color: ACCENT }, line: { color: ACCENT } });
  s2.addText(p.n, { x: x + 0.27, y: pY + 0.3, w: 0.62, h: 0.62, fontSize: 15, bold: true, color: WH, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  // Panel headline (display serif)
  s2.addText(p.head, { x: x + 0.3, y: pY + 1.06, w: pW - 0.6, h: 0.8, fontSize: 17, color: INK, fontFace: DISPLAY, wrap: true, valign: "top" });
  // Hairline divider
  s2.addShape(pres.ShapeType.rect, { x: x + 0.3, y: pY + 1.92, w: pW - 0.6, h: 0.013, fill: { color: LINE }, line: { color: LINE } });
  // Big stat (Manrope numerals)
  s2.addText(p.stat, { x: x + 0.3, y: pY + 2.05, w: pW - 0.6, h: 0.62, fontSize: 38, bold: true, color: ACCENT, fontFace: FONT });
  s2.addText(p.statLabel.toUpperCase(), { x: x + 0.3, y: pY + 2.68, w: pW - 0.6, h: 0.5, fontSize: 9.5, bold: true, color: MUTE, fontFace: FONT, charSpacing: 1, wrap: true });
  // Body
  s2.addText(p.body, { x: x + 0.3, y: pY + 3.18, w: pW - 0.6, h: 0.92, fontSize: 11, color: BODY, fontFace: FONT, wrap: true, valign: "top" });
});
footer(s2, "Source: illustrative cohort analysis, trailing 12 months. Risk flag = health score crossing the red threshold.", "Meridian | 2 of 4");

// ─── Slide 3: Prioritisation matrix (2x2 with plotted dots) ────────────────────
const s3 = pres.addSlide();
header(s3, "WHERE TO ACT", 3, 4);
titleBlock(
  s3,
  "Six candidate fixes scored on impact to net retention against effort to ship.",
  "Two fixes carry the recovery; the rest can wait a quarter"
);

// Matrix geometry
const mX = 0.533, mY = 2.62, mW = 7.6, mH = 4.05; // plot area
const padL = 0.0; // axes drawn at edges of plot
// Plot background
s3.addShape(pres.ShapeType.rect, { x: mX, y: mY, w: mW, h: mH, fill: { color: PANEL }, line: { color: LINE, pt: 0.8 } });
// Quadrant divider lines (mid)
const midX = mX + mW / 2, midY = mY + mH / 2;
s3.addShape(pres.ShapeType.rect, { x: midX, y: mY, w: 0.013, h: mH, fill: { color: LINE }, line: { color: LINE } });
s3.addShape(pres.ShapeType.rect, { x: mX, y: midY, w: mW, h: 0.013, fill: { color: LINE }, line: { color: LINE } });
// Axis titles (kept horizontal — pptxgenjs rotates per-character on narrow boxes)
s3.addText("IMPACT ON NET RETENTION  →", { x: mX, y: mY - 0.34, w: mW, h: 0.26, fontSize: 9.5, bold: true, color: INK, charSpacing: 2, fontFace: FONT, align: "center" });
s3.addText("EFFORT TO SHIP  →", { x: mX - 0.02, y: mY + mH + 0.08, w: mW, h: 0.26, fontSize: 9.5, bold: true, color: INK, charSpacing: 2, fontFace: FONT, align: "center" });
// Quadrant labels (corners, mute)
s3.addText("DO NOW", { x: mX + 0.12, y: mY + 0.1, w: mW / 2 - 0.24, h: 0.26, fontSize: 9, bold: true, color: MUTE, charSpacing: 2, fontFace: FONT, align: "left" });
s3.addText("PLAN", { x: midX + 0.12, y: mY + 0.1, w: mW / 2 - 0.24, h: 0.26, fontSize: 9, bold: true, color: MUTE, charSpacing: 2, fontFace: FONT, align: "right" });
s3.addText("QUICK WINS", { x: mX + 0.12, y: mY + mH - 0.32, w: mW / 2 - 0.24, h: 0.26, fontSize: 9, bold: true, color: MUTE, charSpacing: 2, fontFace: FONT, align: "left" });
s3.addText("DEFER", { x: midX + 0.12, y: mY + mH - 0.32, w: mW / 2 - 0.24, h: 0.26, fontSize: 9, bold: true, color: MUTE, charSpacing: 2, fontFace: FONT, align: "right" });

// Dots: x = effort (0 low → 1 high, left→right), y = impact (0 low → 1 high, bottom→top)
// We want high-impact / low-effort in TOP-LEFT ("DO NOW"). So plot x by effort, y by (1-impact) for screen coords.
const dots = [
  { id: "A", label: "Activation playbook (first 21 days)", impact: 0.92, effort: 0.30, focus: true },
  { id: "B", label: "Early-warning health score", impact: 0.84, effort: 0.38, focus: true },
  { id: "C", label: "Champion-tracking alerts", impact: 0.66, effort: 0.34, focus: false },
  { id: "D", label: "Usage-based expansion nudges", impact: 0.58, effort: 0.70, focus: false },
  { id: "E", label: "Renewal-desk retraining", impact: 0.34, effort: 0.28, focus: false },
  { id: "F", label: "Pricing-tier restructure", impact: 0.45, effort: 0.88, focus: false },
];
const dotR = 0.34;
dots.forEach((d) => {
  const cx = mX + d.effort * mW;
  const cy = mY + (1 - d.impact) * mH; // higher impact = higher on screen
  const fill = d.focus ? ACCENT : "C2CDC8";
  s3.addShape(pres.ShapeType.ellipse, { x: cx - dotR / 2, y: cy - dotR / 2, w: dotR, h: dotR, fill: { color: fill }, line: { color: d.focus ? ACCENT_DK : MUTE, pt: 0.75 } });
  s3.addText(d.id, { x: cx - dotR / 2, y: cy - dotR / 2, w: dotR, h: dotR, fontSize: 11, bold: true, color: d.focus ? WH : INK, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
});

// Legend panel (right) — pine tint strip for secondary context
const lgX = 8.45, lgW = 4.35, lgY = 2.55, lgH = 4.32;
s3.addShape(pres.ShapeType.rect, { x: lgX, y: lgY, w: lgW, h: lgH, fill: { color: TINT }, line: { color: TINT_BORDER, pt: 0.8 } });
s3.addText("THE SIX FIXES", { x: lgX + 0.26, y: lgY + 0.22, w: lgW - 0.52, h: 0.3, fontSize: 10.7, bold: true, color: ACCENT, charSpacing: 2, fontFace: FONT });
const lgRowY = lgY + 0.66, lgRowH = 0.6;
dots.forEach((d, i) => {
  const ry = lgRowY + i * lgRowH;
  // ID chip
  s3.addShape(pres.ShapeType.ellipse, { x: lgX + 0.26, y: ry, w: 0.34, h: 0.34, fill: { color: d.focus ? ACCENT : WH }, line: { color: d.focus ? ACCENT : MUTE, pt: 0.75 } });
  s3.addText(d.id, { x: lgX + 0.26, y: ry, w: 0.34, h: 0.34, fontSize: 10, bold: true, color: d.focus ? WH : INK, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  // label
  s3.addText(d.label, { x: lgX + 0.74, y: ry - 0.04, w: lgW - 1.0, h: 0.44, fontSize: 11, bold: d.focus, color: d.focus ? INK : BODY, fontFace: FONT, wrap: true, valign: "middle" });
});
footer(s3, "Source: illustrative scoring workshop. Impact = modeled lift to net retention; effort = engineering-weeks to ship.", "Meridian | 3 of 4");

// ─── Slide 4: Phased roadmap gantt (overlapping workstream bars) ───────────────
const s4 = pres.addSlide();
header(s4, "THE ROADMAP", 4, 4);
titleBlock(
  s4,
  "Three phases over nine months; workstreams overlap so recovery compounds.",
  "Stabilise the funnel, then expand; net retention back to 110% by Q1 2027"
);

// Gantt geometry
const gLabelW = 3.0;            // left workstream label column
const gX = 0.533 + gLabelW;     // grid left
const gRight = 12.8;            // grid right
const gW = gRight - gX;
// Vertical stack (top → bottom): phase bands · month-scale row · grid · milestone strip.
const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]; // 9-month window ending Q1 2027 (Mar)
const colW = gW / months.length;

const phBandY = 2.5, phBandH = 0.34;        // phase bands at top
const monY = phBandY + phBandH + 0.06;       // month-scale row directly below the phase bands
const monH = 0.28;
const gTop = monY + monH + 0.04;             // grid starts under the month row (≈ 3.22)
const gBot = 6.02;                           // grid bottom — leaves breathing room before the milestone strip
const gGridH = gBot - gTop;

// Phase band header (above the month row)
const phases4 = [
  { name: "PHASE 1 · STABILISE", start: 0, span: 3, col: INK },
  { name: "PHASE 2 · ACTIVATE", start: 3, span: 3, col: A },
  { name: "PHASE 3 · EXPAND", start: 6, span: 3, col: ACCENT },
];
phases4.forEach((ph) => {
  const px = gX + ph.start * colW;
  const pw = ph.span * colW - 0.04;
  s4.addShape(pres.ShapeType.rect, { x: px, y: phBandY, w: pw, h: phBandH, fill: { color: ph.col }, line: { color: ph.col } });
  s4.addText(ph.name, { x: px + 0.08, y: phBandY, w: pw - 0.16, h: phBandH, fontSize: 10, bold: true, color: WH, charSpacing: 1.5, fontFace: FONT, valign: "middle" });
});

// Month-scale row: explicit, legible month labels aligned to each column, with a hairline under them.
s4.addShape(pres.ShapeType.rect, { x: gX, y: monY + monH, w: gW, h: 0.013, fill: { color: LINE }, line: { color: LINE } });
months.forEach((m, i) => {
  const cx = gX + i * colW;
  s4.addText(m, { x: cx, y: monY, w: colW, h: monH, fontSize: 9.5, bold: true, color: BODY, charSpacing: 1, fontFace: FONT, align: "center", valign: "middle" });
});

// Month-boundary vertical gridlines across the grid (light)
months.forEach((m, i) => {
  const cx = gX + i * colW;
  s4.addShape(pres.ShapeType.rect, { x: cx, y: gTop, w: 0.01, h: gGridH, fill: { color: LINE }, line: { color: LINE } });
});
// right grid edge
s4.addShape(pres.ShapeType.rect, { x: gRight, y: gTop, w: 0.01, h: gGridH, fill: { color: LINE }, line: { color: LINE } });

// Workstream rows with overlapping bars (start month index 0-based, span in months)
const rows = [
  { ws: "Activation playbook",   start: 0, span: 4, col: ACCENT, note: "first value in 21 days" },
  { ws: "Early-warning scoring", start: 1, span: 4, col: ACCENT, note: "leading risk signals" },
  { ws: "Champion tracking",     start: 3, span: 3, col: A,      note: "alerts on power users" },
  { ws: "Onboarding redesign",   start: 2, span: 4, col: A,      note: "guided setup flow" },
  { ws: "Expansion nudges",      start: 5, span: 4, col: G,      note: "usage-triggered upsell" },
];
// Evenly distribute 5 rows across the grid band so each bar sits centred in its lane, with air between rows.
const laneH = gGridH / rows.length;          // ≈ 0.56 per lane
const barH = 0.3;
rows.forEach((r, i) => {
  const laneTop = gTop + i * laneH;
  const laneMid = laneTop + laneH / 2;
  // Row label (vertically centred on the lane)
  s4.addText(r.ws, { x: 0.533, y: laneMid - 0.26, w: gLabelW - 0.16, h: 0.3, fontSize: 11.5, bold: true, color: INK, fontFace: FONT, valign: "middle" });
  s4.addText(r.note, { x: 0.533, y: laneMid + 0.02, w: gLabelW - 0.16, h: 0.24, fontSize: 9.5, italic: true, color: MUTE, fontFace: FONT, valign: "middle" });
  // Bar (centred in the lane)
  const bx = gX + r.start * colW + 0.03;
  const bw = r.span * colW - 0.06;
  const by = laneMid - barH / 2;
  s4.addShape(pres.ShapeType.roundRect, { x: bx, y: by, w: bw, h: barH, rectRadius: 0.06, fill: { color: r.col }, line: { color: r.col } });
});

// Milestone target strip — INK emphasis below the dark gantt bars (per design rule).
// Sits below the grid (gBot 6.02) with a clear gap, and clears the footer divider (y=7.05) below.
const msY = 6.25;
s4.addShape(pres.ShapeType.rect, { x: 0.533, y: msY, w: 12.267, h: 0.6, fill: { color: INK }, line: { color: INK } });
s4.addText("MILESTONE", { x: 0.7, y: msY, w: 1.7, h: 0.6, fontSize: 10, bold: true, color: ACCENT, charSpacing: 2, fontFace: FONT, valign: "middle" });
s4.addText("Net revenue retention recovers from 101% to 110%; gross retention 88% to 93%; first-value lag 45 to 21 days.", { x: 2.4, y: msY, w: 10.2, h: 0.6, fontSize: 12.5, bold: true, color: WH, fontFace: FONT, valign: "middle", wrap: true });
footer(s4, "Source: illustrative phasing plan. Bars show active build windows; phases overlap by design so recovery compounds.", "Meridian | 4 of 4");

// ─── Write ─────────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "demo.pptx" })
  .then(() => console.log("OK demo.pptx written"))
  .catch((e) => { console.error(e); process.exit(1); });
