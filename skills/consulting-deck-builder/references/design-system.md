# Design system

This is the DNA of every deck the skill produces. Read it end to end before you build. The goal is simple: every deck should read as if it came from the same senior operator's desk, whatever the topic. What is locked is *taste*, not one fixed look — each theme is a complete, vetted palette, but the discipline beneath all of them is identical.

The system is a bright (or deliberately dark) ground, a single accent used sparingly, a display font paired with a sans body, and emphasis carried by whitespace, hairlines, and type weight rather than coloured bars. The implementation lives in `examples/build_demo.js`; this file documents the system the demo is built from.

## Contents

1. Themes (all eight token sets)
2. Typography and the vetted font list
3. Slide anatomy and the helper pattern
4. Spacing
5. Design principles
6. What to change vs. what to lock

---

## 1. Themes

Pick ONE theme per deck. Never hand-roll a palette and never mix two themes inside one deck. A theme is a complete, taste-vetted set — ground, neutrals, accent, and a default display font — not just an accent dropped on a fixed ground. Every theme obeys the same rules: one accent for emphasis, cohesive neutrals, emphasis by weight/hairline/whitespace, no dark-mode glow, no rainbow, no gradient.

The token **names** never change between themes, so every helper and pattern in this repo is theme-agnostic — swap the theme object and the whole deck re-skins. Six themes are light, two are dark; the dark themes work because a few semantic tokens carry the fills and reversed text that the plain ink/white values used to hardcode.

### The eight themes

| Theme | ground | ink (text) | accent | default display font | mode |
|---|---|---|---|---|---|
| **bright-white-pine** (default) | `FCFCFA` | `1A1A1A` | `12564A` | Charter | light |
| **slate** | `FBFCFD` | `16202B` | `1F3A5F` | Iowan Old Style | light |
| **oxblood** | `FCFAF9` | `241A1A` | `6E1423` | Baskerville | light |
| **solarized** | `FDF6E3` | `073642` | `268BD2` | Optima | light |
| **paper** | `F7F4EF` | `2A2724` | `A8552F` | Cochin | light |
| **mono** | `FFFFFF` | `121212` | `121212` | Charter | light |
| **ink** | `15181C` | `F1F4F6` | `5FB89E` | Palatino | **dark** |
| **midnight** | `121826` | `EEF2F8` | `E0A93B` | Hoefler Text | **dark** |

### Full token set per theme

Drop this object into the build and select with `THEMES[inputs.theme || "bright-white-pine"]`. Each theme defines: `surface` (ground), `ink` (text), `body` (paragraph copy), `mute` (captions/footnotes), `line` (hairlines), `panel` (faint card fill), `accent`, `accentDark` (a darker accent for depth), `tint` + `tintBorder` (the soft callout wash), and the four semantic tokens below.

```js
const THEMES = {
  "bright-white-pine": { surface:"FCFCFA", ink:"1A1A1A", body:"45474A", mute:"8A8D90", line:"DADEDC", panel:"F2F4F3", accent:"12564A", accentDark:"0C3D34", tint:"E6EFEA", tintBorder:"C9DBD2", strip:"1A1A1A", onStrip:"FFFFFF", onAccent:"FFFFFF", onAccentMute:"E6EFEA", muteFill:"C2CDC8", font:"Charter", displayBold:false },
  "slate":            { surface:"FBFCFD", ink:"16202B", body:"44505E", mute:"8893A0", line:"DCE3EA", panel:"EDF1F5", accent:"1F3A5F", accentDark:"13263F", tint:"E7ECF2", tintBorder:"CBD5E2", strip:"16202B", onStrip:"FFFFFF", onAccent:"FFFFFF", onAccentMute:"E7ECF2", muteFill:"C4D0DC", font:"Iowan Old Style", displayBold:false },
  "oxblood":          { surface:"FCFAF9", ink:"241A1A", body:"4A3F3F", mute:"948A88", line:"E8E0DC", panel:"F4EEEB", accent:"6E1423", accentDark:"4E0E19", tint:"F3E7E9", tintBorder:"E2CCD1", strip:"241A1A", onStrip:"FFFFFF", onAccent:"FFFFFF", onAccentMute:"F3E7E9", muteFill:"D8C9C6", font:"Baskerville", displayBold:false },
  "solarized":        { surface:"FDF6E3", ink:"073642", body:"586E75", mute:"93A1A1", line:"EEE8D5", panel:"F4EDD9", accent:"268BD2", accentDark:"1A6BA8", tint:"E7EEF2", tintBorder:"C9DCEA", strip:"073642", onStrip:"FDF6E3", onAccent:"FFFFFF", onAccentMute:"E7EEF2", muteFill:"D7D2BF", font:"Optima", displayBold:false },
  "paper":            { surface:"F7F4EF", ink:"2A2724", body:"54504A", mute:"938E85", line:"E6E0D6", panel:"EFE9E0", accent:"A8552F", accentDark:"7E3D20", tint:"F2E7DD", tintBorder:"E0CDBD", strip:"2A2724", onStrip:"FFFFFF", onAccent:"FFFFFF", onAccentMute:"F2E7DD", muteFill:"D9CFC0", font:"Cochin", displayBold:false },
  "mono":             { surface:"FFFFFF", ink:"121212", body:"3C3C3C", mute:"8C8C8C", line:"E4E4E4", panel:"F5F5F5", accent:"121212", accentDark:"000000", tint:"EDEDED", tintBorder:"D8D8D8", strip:"121212", onStrip:"FFFFFF", onAccent:"FFFFFF", onAccentMute:"D8D8D8", muteFill:"CFCFCF", font:"Charter", displayBold:false },
  "ink":              { surface:"15181C", ink:"F1F4F6", body:"C0C7CE", mute:"88909A", line:"2A3038", panel:"1D2228", accent:"5FB89E", accentDark:"3E9E84", tint:"18302B", tintBorder:"2F5A4F", strip:"F1F4F6", onStrip:"15181C", onAccent:"0C2B24", onAccentMute:"0C2B24", muteFill:"39443F", font:"Palatino", displayBold:false },
  "midnight":         { surface:"121826", ink:"EEF2F8", body:"B7C0CF", mute:"7E8A9C", line:"232C3D", panel:"19212F", accent:"E0A93B", accentDark:"B5841F", tint:"1E2A3F", tintBorder:"38466A", strip:"EEF2F8", onStrip:"121826", onAccent:"1A1407", onAccentMute:"1A1407", muteFill:"32404F", font:"Hoefler Text", displayBold:false },
};
const T = THEMES[(inputs && inputs.theme) || "bright-white-pine"];
```

### Semantic tokens (what makes dark themes work)

`ink` is the **text** colour — dark on a light ground, light on a dark ground. Four extra tokens carry what a hardcoded near-black/white pair used to do, so one clean token swap re-skins every recipe:

- `strip` / `onStrip` — the emphasis-bar fill and its text. Light themes: near-black bar, white text. Dark themes: a light bar with dark text.
- `onAccent` / `onAccentMute` — text on an accent fill. White on the dark accents; dark on the light accents (the teal and gold of the two dark themes).
- `muteFill` — the muted/secondary bar fill, a neutral that reads on the theme's ground.

The mechanical rule: never fill a shape with raw `ink`/`accent` and reverse `white`/`tint` text on top — that breaks on the dark themes. Use `strip`/`onStrip` for emphasis bars, table headers, dark cards, and decision nodes; use `onAccent`/`onAccentMute` for text on an accent fill; use `muteFill` for secondary bars. `ink` as *text* stays `ink`.

A small derived token keeps a tracked-caps accent label legible on a dark strip: lighten the accent toward white when the strip is dark, darken it toward black when the strip is light, selecting by the strip's luminance. A raw accent label fails on dark-accent light themes (slate, oxblood) where the accent sits too close to the near-black strip.

### Secondary / semantic accents (rare)

Reserve three semantic colours for status only, never for decoration: `good` ≈ `2F7A55` (positive / on-target), `amber` ≈ `B07D2B` (attention / borderline), `risk` ≈ `B23A2E` (below-target / severity). When one of these is used as a large fill, choose its text colour (white or dark) by *that* colour's own luminance, not by `onAccent` — `onAccent` is tuned to the theme accent.

**One accent per slide for emphasis.** If three things on a slide are the accent colour, two of them should be neutral. The accent focuses the eye; it does not decorate.

### Categorical chart palette (charts only)

The one-accent rule governs furniture and single-message slides. Multi-series **charts** are the deliberate exception — a chart plotting three or more real series needs three or more distinguishable hues. Keep one curated ramp for this, scoped strictly to chart fills:

```
CAT[0]  pine/accent   CAT[1]  ochre   CAT[2]  slate-blue
CAT[3]  clay          CAT[4]  sage    CAT[5]  muted-plum
```

Rules: assign in array order, never reorder per slide; cap at 6 categories (tail folds into `muteFill` "Other"); a single focus series may take `CAT[0]`/accent with the rest muted; never put a categorical hue on furniture (titles, strips, footers stay ink/accent/mute); pick cell-text colour per hue by luminance. On the two dark themes, lift each hue toward white so it reads on the dark ground.

### Two callout-strip treatments

Callout strips come in exactly two styles; never mix them arbitrarily.

- **Ink-emphasis strip** — `strip` fill, `accent` or `white` label, light body text. For **primary takeaways**: the "so what", a benchmark, a milestone, the headline shift.
- **Tint strip** — `tint` fill, `tintBorder` hairline. For **secondary / contextual callouts**: legends, compared dimensions, data caveats, destination panels.

Rule: primary takeaway is ink-emphasis; secondary context is tint. Both are **full fills**, not one-edge bars. A thin coloured border down one edge of a card is a side-tab tell and is banned (see §5). Never place a light tint strip directly below heavy dark content (e.g. gantt bars) — it reads washed-out; convert it to ink-emphasis there.

### Table and grid colour separation

In any table, matrix, or multi-column grid, two colour jobs must never share one token:

| Element | Colour job | Use |
|---|---|---|
| Column / tier headers | **Structural** — always `ink` | Identifies the dimension, not the value |
| Row labels | **Role** — the accent assigned to that role | Identifies the actor |
| Cell fills | **Role colour of the row** (full fill, not a left bar) | Carries the row's identity into the cell |
| Cell text on a dark fill | the on-fill token | Contrast |

When the palette changes, role colours change; the structural/role separation does not. And in a grid where one axis is swimlanes (roles, owners) and the other is categorical columns (tiers, phases), colour must encode ONE axis only — the other stays neutral. Doubling up makes false ownership claims wherever a swimlane colour happens to match a column colour.

---

## 2. Typography

### Two families — display + body

Pair a **display font** for prose with a **sans body** for everything else. A single family for everything is a recognised AI tell; the pairing is the fix and gives the deck a clear editorial voice.

- **Display: per-deck choice, set in the brief.** It is not locked to one face — choose it for the deck and record it in the token line. When the display is a serif, set it **roman** for headlines, section identity, and the occasional large editorial numeral; never set the hero as oversized italic serif (its own tell). When the all-sans option is chosen, the display face is the body sans set bold, leaning on weight rather than a serif for editorial contrast.
- **Body: always Manrope** (weights 300–800) — context lines, body copy, every tracked-caps label, table text, data numerals, footers. The body never changes; only the display face is the per-deck choice.

Token line at the top of every build:

```js
const DISPLAY = (inputs.brand && inputs.brand.font_display) || T.font;
const DISPLAY_BOLD = T.displayBold;   // true only for the all-sans pick
const FONT = "Manrope";               // body, always
```

The title helper sets its headline with `bold: DISPLAY_BOLD`, so a serif pick renders roman and the all-sans pick renders bold from one code path.

If the display face is a serif, keep **data numerals** (stat cards, chart values, KPI figures) in Manrope — old-style serif figures hurt scannability in dense data. The serif carries prose only: titles, section names, the occasional large editorial numeral.

### The vetted font list

All of these are installed on most systems and render in PowerPoint/LibreOffice; each has genuine character and sits off the overused list. Default in **bold** below.

| Face | Note |
|---|---|
| **Charter** (default) | editorial serif, renders clean everywhere |
| Palatino | warm serif |
| Iowan Old Style | quiet serif |
| Baskerville | formal serif; renders best in PowerPoint/Google Slides, weaker in LibreOffice preview |
| Hoefler Text | high-contrast serif |
| Cochin | elegant serif |
| Optima | humanist sans-serif with serif character |
| Manrope Bold | the all-sans pick — no serif; weight carries the contrast |

**Avoid the overused faces** that read as AI-generated default: Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk. Override the display only with a characterful, installed alternative — if the named face is not on the system, the renderer silently falls back.

### Hierarchy

| Role | Family | Size | Weight | Tracking | Colour |
|---|---|---|---|---|---|
| Slide title (headline) | DISPLAY | 28–32 | roman, or bold if all-sans | 0 | ink |
| Section identity (divider) | DISPLAY | 40–54 | roman, or bold if all-sans | 0 | ink |
| Breadcrumb (plain, no pill) | Manrope | 10–11 | 700 | 3 | accent |
| Page number (plain, no circle) | Manrope | 10–11 | 400 | 0 | mute |
| Context line | Manrope | 13–14 | italic | 0 | accent |
| Body text | Manrope | 10–12 | 400 | 0 | body |
| Label (small cap) | Manrope | 8–10 | 700 | 3 | accent or ink |
| Footnote / footer | Manrope | 9–11 | italic / 400 | 0 | mute |

**Tracked caps for SHORT labels only.** A small, bold, uppercase label gets 2–3 units of tracking. Never track body text, and never set long passages in uppercase — both are legibility tells.

---

## 3. Slide anatomy and the helper pattern

Every content slide shares one anatomy. The reader learns it by slide three and reads content, not orientation. Keep the chrome stripped: a plain breadcrumb and one hairline at the top, a plain page number, no eyebrow pill, no pagination circle, no one-edge accent bars, no headline underscore.

```
┌────────────────────────────────────────────────────────────────┐
│ BREADCRUMB · SECTION                                  15 / 40   │  ← plain tracked breadcrumb (accent) + plain page number (mute)
│ ─────────────────────────────────────────────────────────────  │  ← single header hairline (line), y = 0.8
│ Context: one italic sentence framing before data (accent).      │  ← context line, y = 1.0
│                                                                  │
│ Slide title — display font, 28–32pt                             │  ← headline, y = 1.4 (no underscore bar)
│                                                                  │
│  [ main content zone — varies by layout pattern ]               │  ← content start y = 2.55
│                                                                  │
│ ─────────────────────────────────────────────────────────────  │  ← footer divider, y = 7.05
│ italic footnote, source/caveat                Source | N of M   │  ← footer (mute), y = 7.067
└────────────────────────────────────────────────────────────────┘
```

### Key coordinates (landscape 13.333 × 7.5 inches)

| Element | Value | Note |
|---|---|---|
| Left margin | x = 0.533 | content and frame share it |
| Breadcrumb / page number | y = 0.42 | plain text, no pill, no circle |
| Header hairline | y = 0.8 | the only rule at the top |
| Context line | y = 1.0 | italic, accent |
| Headline | y = 1.4 | display font; no accent underscore |
| Content start | y = 2.55 (diagrams 2.60) | not 2.8 — that leaves a loose gap and risks overflow |
| Content right edge | ≤ 12.8 | symmetric with the left margin; never bleed to the slide edge |
| Footer divider | y = 7.05 | hairline above the footer |
| Bottom safe edge | y + h ≤ 6.97 | no element above the footer crosses this |

### The 12-column grid

The content band (x = 0.533 … 12.8, width ≈ 12.267") is a 12-column grid with a 0.18" gutter — column width ≈ 0.857". Compose layouts on it instead of hand-computing widths. A small `col(start, span)` helper (1-based) returns `{x, w}` for a block: full = `col(1,12)`; halves = `col(1,6)` / `col(7,6)`; thirds = `col(1,4)` / `col(5,4)` / `col(9,4)`; a 62/38 split = `col(1,7)` / `col(8,5)`.

### The helper pattern (copy this shape)

Every deck implements three helpers before any slide. This is the load-bearing structure of the whole system — three functions wrap the anatomy so each pattern only draws its own content zone. Written generically (pptxgenjs style):

```js
// Plain tracked breadcrumb + header hairline (no pill); plain page number (no circle)
function header(s, breadcrumb, num, total) {
  s.background = { color: SURFACE };
  s.addText(breadcrumb.toUpperCase(), { x:0.533, y:0.42, w:9, h:0.3,
    fontSize:10.5, bold:true, color:ACCENT, fontFace:FONT, charSpacing:3 });
  s.addText(total ? `${num} / ${total}` : `${num}`, { x:10.6, y:0.42, w:2.2, h:0.3,
    fontSize:10.5, color:MUTE, fontFace:FONT, align:"right" });
  s.addShape(pres.ShapeType.rect, { x:0.533, y:0.8, w:12.267, h:0.013,
    fill:{ color:LINE }, line:{ color:LINE } });
}

// Italic context line (Manrope) + display-font headline (roman, or bold if all-sans)
function title(s, context, headline) {
  s.addText(context, { x:0.533, y:1.0, w:12.267, h:0.4,
    fontSize:13.7, italic:true, color:ACCENT, fontFace:FONT });
  s.addText(headline, { x:0.5, y:1.4, w:12.3, h:0.95,
    fontSize:30, bold:DISPLAY_BOLD, color:INK, fontFace:DISPLAY });
}

// Footer divider is drawn once; this writes the two-part footer line
function footer(s, note, label) {
  s.addText(note, { x:0.533, y:7.067, w:9.333, h:0.333,
    fontSize:11, italic:true, color:MUTE, fontFace:FONT });
  s.addText(label, { x:10.0, y:7.067, w:2.8, h:0.333,
    fontSize:11, color:MUTE, fontFace:FONT, align:"right" });
}
```

A fourth tiny helper — a straight `connector(x1,y1,x2,y2)` that draws a thin rotated rectangle between two points — covers spokes, bowtie lines, and staircase risers without curved connectors (which render badly in LibreOffice).

### Title, closing, and divider slides

- **Title slide** — bright `surface` ground, brand/topic name as a plain tracked label (not a pill), a large display-font title, author/date in Manrope italic, and a thesis statement in a `tint` panel (full fill + `tintBorder`, not a one-edge bar). No floating eyebrow chip above the title.
- **Section divider** — a worded section title in large display font plus a full-width hairline and a one-line preview. **No oversized numeral** (the 01/02/03 tell). The phase a section belongs to may sit as a small tracked label; the worded name carries it.
- **Closing slide** — ink headlines on the surface, or the one full-bleed accent fill the system allows (the last content slide is the one place a full accent fill belongs — it is the punctuation mark).

---

## 4. Spacing

pptxgenjs has no real grid, so geometry composes on a small named scale rather than scattered magic numbers. Vary it — uniform spacing everywhere is itself a tell.

- **Gutter** ≈ 0.18": between adjacent panels; the grid gutter.
- **Group vs. section** ≈ 0.26" within a group / 0.42" between groups: tight within, generous between. Do not use one spacing value everywhere.
- **Callout padding** ≥ 0.18": inner padding inside any bordered, tinted, or filled box. Text never sits flush to an edge.
- **Row height / bar** ≈ 0.21": table-row and gantt-bar minimum for legibility.
- Finer offsets: ≈ 0.10" within a group, ≈ 0.06" for hairline nudges.

Every y-coordinate sits on a logical baseline. No element above the footer has `y + h > 6.97`.

---

## 5. Design principles

**1. One idea per slide.** Two titles means two slides.

**2. Context before data.** Every slide opens with a context line, so the reader knows why they are looking before their eye lands on a number.

**3. Accent sparingly.** The eye should land on one accent element first. More than one means something is wrong.

**4. Austerity signals confidence.** Whitespace is not wasted space. Dense, anxious slides read as insecure.

**5. Hairlines over coloured bars.** Carry structure and emphasis with type weight, a full-width hairline, a full fill, or whitespace. No one-edge accent bars on cards or panels — the side-tab is a slop tell.

**6. Selective colour.** Only message-critical elements carry the accent. Six coloured columns cancel each other out; one or two coloured columns tell the eye where to look.

**7. Display font for prose, body sans for everything else.** The serif/sans contrast (or, in the all-sans pick, the weight hierarchy) is half of what makes the deck read editorial rather than generated.

**8. Every visible band carries information.** A band, strip, or column holding no data is decoration — delete it.

**9. Area-true sized shapes.** Circles, bubbles, anything sized by value uses AREA proportionality, not radius. A "2× bigger" circle has 2× the area (radius × √2), not 2× the radius (which gives 4× area and lies to the eye).

**10. Honest charts.** No 3D, ever — it distorts proportion. Zero baselines on bar/column charts. Direct-label lines and segments instead of legends when colours are few. Logical bar order, not alphabetical. Full rules in `references/charts.md`.

**11. Structural colour and role colour never share a token.** Column/tier headers use `ink`; row labels and cell fills use the role colour. Holds regardless of palette.

---

## 6. What to change vs. what to lock

### Change per deck

- Theme (pick one of the eight) and, within it, the accent if brand-locked
- Display face — only a characterful, installed alternative off the overused list
- Content, slide plan, pattern selection
- Source / presenter / audience / date

### Lock (the signature)

- The curated theme set — pick one per deck; never hand-roll a palette or mix themes mid-deck
- The two-family pairing (display + body sans) — never collapse to one family
- The stripped anatomy: plain breadcrumb + hairline, plain page number, no one-edge accent bars, no eyebrow pill, no oversized section numeral
- One-accent discipline and cohesive neutrals within the chosen theme
- The two callout-strip treatments (ink-emphasis, tint)
- The footer structure

If you want to change something locked, ask whether a different deliverable (a variant) is warranted instead of bending the system.
