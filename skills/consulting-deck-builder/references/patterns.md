# Pattern catalog

A working set of layout patterns. Each entry gives: **when to use it**, the **visual structure**, and a short **build recipe** sketched in boxes/positions/tokens. Tokens (`SURFACE`, `INK`, `ACCENT`, `LINE`, `PANEL`, `TINT`, `MUTE`, `strip`/`onStrip`, etc.) and the `header()`/`title()`/`footer()` helpers come from `references/design-system.md`. Coordinates assume a 13.333 × 7.5" landscape canvas and the content band x = 0.533 … 12.8.

**The catalog is a floor, not a ceiling.** It encodes safety and consistency for repeat layouts; it does not impose a fixed vocabulary on novel content. When content is quantitative, default to a chart even if a stat-row would be the closest documented match. When a brief needs density the patterns produce sparsely, invent a new layout. Components compose — a chart under an ink-emphasis takeaway, a primitive beside a stat tile — within one rule set: one message per slide, one accent, every band carries data.

A quick density note: the sparse patterns (title, divider, stat-hero, big-numeral) are **condiments** — section bridges and summaries, used once or twice per deck, never as the opening workhorse. A sparse slide one trains the reader to expect filler. Mid-deck slides should fill roughly 95% of the vertical canvas with information.

---

## Workhorses

### 1. Title / closing bookend — *sparse*

**When:** opening and closing slides only.
**Structure:** bright `SURFACE` ground, no accent bar. A plain tracked brand/topic label, a large display-font title, presenter/date in Manrope italic, and (on the title) a thesis statement in a `TINT` panel — full fill + `tintBorder`, not a one-edge bar. The closing slide is the one place a full-bleed `ACCENT` fill is allowed; numbered conclusion points use an accent oval badge + display-font title + Manrope body.
**Recipe:** brand label at y≈1.73 (11pt tracked accent); title at y≈2.33 (44pt display, ink); thesis panel below as a `TINT` rectangle with `tintBorder`, body text inset ≥0.18".

### 2. Executive summary / governing-thought briefing — *medium*

**When:** the answer-first one-pager or pre-read — a single governing-thought recommendation carried by structured prose, not bullets.
**Structure:** the headline *is* the governing-thought claim (a sentence with a verb). Beneath it a two-column body. Left (~58%): three prose blocks under small mute all-caps markers (Situation / Complication / Recommendation), the recommendation's first sentence set semibold (the ask). A thin vertical hairline divides the columns. Right (~38%): three to four stacked evidence boxes (`PANEL` fill, `LINE` hairline, a thin accent top-edge rule, accent bold label, mute two-line detail).
**Recipe:** the accent appears only at small scale (box top-rules and labels), subordinate to the headline weight — no accent fill block, no side bar. Prose is intentional; avoid rule-of-three bullets.

### 3. Diagnostic three-panel — *light*

**When:** three parallel findings of equal weight (the classic "we found three things").
**Structure:** three equal columns at thirds (`col(1,4)` / `col(5,4)` / `col(9,4)`). Each: an accent oval numeral badge, a bold ink finding lead, and two to three lines of `BODY` gloss. One panel may take the accent if one finding is load-bearing; otherwise keep the badges accent and the cards neutral.
**Recipe:** badges at the top of each column (y≈2.55), lead at y≈3.1, gloss below. Equal gutters; no boxes needed if whitespace separates them cleanly.

### 4. Prioritisation matrix (2×2) — *medium*

**When:** placing many items across two axes (effort vs. impact, reach vs. confidence).
**Structure:** a square grid centred in the content band, axis labels on the left and bottom edges (never rotated text — it renders buggy). Items are dots; the recommended quadrant's items take the accent, the rest stay ink/mute. Quadrant labels sit in muted type, not heavy fills.
**Recipe:** draw the two axis lines as `LINE` hairlines; plot dots as small `ellipse` shapes with the value/name adjacent. A short legend panel can sit to the right. A denser cousin puts a micro-exhibit (a sparkline or mini-bar) in each cell instead of bare dots — cap each cell at one mark to keep it legible.

### 5. Phased roadmap / gantt — *medium*

**When:** a time-phased plan or workstream sequencing.
**Structure:** a left workstream column (grouped by phase) and a right gantt grid where workstreams are rows and time is horizontal. A bottom interdependencies band ties them together.
**Recipe:** rows at ≥0.21" height; bars are `roundRect` shapes filled by phase. Milestones use the **ink-emphasis** treatment, not soft tint — a light tint strip directly beneath heavy bars reads washed-out. Time axis labels along the top in `MUTE`.

### 6. Three-column comparison — *light*

**When:** Conservative / Base / Aggressive, or option A / B / C scenarios.
**Structure:** three equal columns with coloured (`ink` structural) headers, then label/value rows down each, with an optional bottom summary band.
**Recipe:** header strip `strip` fill / `onStrip` text; alternating `PANEL`/`SURFACE` rows; one column may be marked recommended with a light `TINT` body fill (not an accent fill) and a small "recommended" caption. Scenario names go in the header, not buried in the body.

### 7. Waterfall — baseline to target — *medium*

**When:** decomposing how a starting value becomes an ending value through a chain of additions/subtractions.
**Structure:** cumulative cascading bars — each starts at the previous running total. Additions in `good`, subtractions in `risk`, the baseline and target anchors in `ink`/`accent`. Labels outside the bars (values above, categories below). A full-width accent goal bar can anchor the target at the bottom.
**Recipe:** reserve a fixed right-side slot for value labels so the last bar's end never collides with a cumulative figure. Use thousands separators on all figures. State the reconciling equation in the footer. See `references/charts.md` for the honesty rules.

### 8. Stat hero — *sparse*

**When:** a single statistic anchors the whole beat — a section bridge, not a bulk slide.
**Structure:** one number dominating (90pt+ display), a one-sentence explanation, and the source. Optionally one or two supporting figures.
**Recipe:** number centred or left at y≈2.6; explanation in `BODY` directly under it; resist adding a second message. Use at most once or twice per deck.

### 9. Big-numeral findings — *sparse*

**When:** a few key findings each anchored by a number (the "five key findings" row).
**Structure:** one number per finding (50–60pt display) with a short tracked-caps label and a one-line gloss, arranged in a row or radially.
**Recipe:** numbers in Manrope (data numerals stay sans even under a serif display); labels tracked caps; exactly one number may take the accent. A bridge pattern — keep it occasional.

---

## Denser exhibits

### 10. Status-card grid — *medium*

**When:** decomposing a system into N parts each carrying a status (a health dashboard, a readiness grid).
**Structure:** a 2×2 (or 2×3) grid of equal `roundRect` cards. Each card: a tracked-caps label, a one-line claim, and a `good`/`amber`/`risk` status mark. The single most urgent card may take the accent; the rest stay `PANEL` + `LINE`.
**Recipe:** equal cards with ≥0.18" padding; status encoded by a small pill or dot, not by flooding the whole card with the semantic colour. Hairline rule between label and body inside each card.

### 11. Icon-stat-card grid — *medium*

**When:** a four-driver KPI decomposition where each cell sizes one number and one card is the load-bearing finding.
**Structure:** a 2×2 grid of equal cards. Each: a top-left stroked icon tile holding one monoline mark, a big display numeral + small unit, a tracked-caps label, a hairline, and a one-line `MUTE` gloss. Exactly ONE card takes the `ACCENT` fill (its text and icon flip to `onAccent`); the other three stay `PANEL` + ink stroke.
**Recipe:** keep icons monoline, single-weight, single-colour, and meaningful — a down-arrow, a draining chevron, a rising slope drawn from `triangle`/`line`/`ellipse`. Multicolour or clip-art glyphs are a slop tell.

### 12. Feature-comparison matrix — *medium*

**When:** which of N options clears each must-have capability (the check/cross table).
**Structure:** a tinted left label column of capabilities; a single `ACCENT`-fill option-header band across the option columns (the slide's one accent); body cells are presence glyphs built from primitives — a tick (two line segments), a cross (two crossed lines), or a partial Harvey ball (a mute outline `ellipse` + an `ink` wedge at ¼/½/¾/full). The recommended column gets a light `TINT` body fill (not accent) and a "recommended" caption.
**Recipe:** glyphs encode PRESENCE, not RAG — so colour them ink/mute only, never the good/amber/risk tokens or the chart palette. A small glyph legend makes the marks self-explaining.

### 13. Central model with evidence rail — *heavy*

**When:** the heaviest framework beat — explain an operating/strategy model AND prove it on one slide.
**Structure:** three zones. Left (~62%): four engine nodes as `roundRect` boxes joined by `LINE` hairline connectors (draw the connectors *before* the nodes so they sit under the boxes), with exactly ONE `ACCENT` focus node (the gap/unproven part); the proven nodes are `SURFACE` + `LINE`. Right (~38%): a single `TINT` panel holding four proof rows, each a bold ink claim over a `MUTE` gloss, split by `LINE` hairlines. Bottom: a full-width `strip` band with `onStrip` so-what text.
**Recipe:** make nodes `SURFACE`, not white, so they survive the dark themes. No gradients, shadows, icon glyphs, or side bars.

### 14. Numbered step spine — *medium* (vertical or horizontal)

**When:** a process/value-chain/roadmap read as ordered steps.
**Structure (horizontal):** N evenly-spaced numbered nodes (`roundRect` + display numeral) marching across the content band, joined by right-pointing chevrons (`triangle` rotated 90°) over a hairline rail; each node sits above a centred bold step title + one-line `MUTE` body. The destination node (last) carries the single `ACCENT` fill; the rest are `PANEL` + `LINE` with ink numerals.
**Structure (vertical):** the same idiom rotated — numbered nodes down a left spine with the rail vertical, titles and body to the right of each node.
**Recipe:** distinct from a gradient operating-flow — no owner pills, no foundation block, no shaded cards. Just numbered nodes, chevrons, and a rail.

### 15. Chart + anchored commentary rail — *heavy*

**When:** a show-change chart whose two or three key moments each need interpretation bound to the evidence.
**Structure:** a chart fills the left ~62–66%; the focus mark is a single `ACCENT` bar/point (others `MUTE`), with value labels on. A right rail of two or three notes (bold claim + `MUTE` gloss). Binding is by **co-numbered tags** — a small ①②③ `ellipse` at each annotated bar and the matching number on its rail note.
**Recipe:** the co-numbering ties prose to evidence without leader-line spaghetti. One accent across the whole slide; anchor the rail notes to the chart's own x/y so they line up with their bars.

### 16. Source-to-destination diagram — *heavy*

**When:** a fragmented current state consolidating into one destination (many tools → one system of record; distributed inputs → one decision artifact).
**Structure:** a two-zone vertical stack. Top: a row of source cards (`PANEL` fill, `LINE` border), each with a name, a sub-label, a status pill (`good`/`amber`/`mute`), a "captures" line, and a bottom stat. Middle: a downward chevron under each source card. Bottom: a full-width destination panel.
**Recipe:** the destination panel must use the **tint strip** (`TINT` fill + `tintBorder` hairline), never an `ink`/dark slab — a dark slab against light source cards reads as a contrast jolt, not anchoring weight. Sub-element pills inside the tint panel use `SURFACE`/white fill with a `LINE` border to read as nested cards.

---

## A few more, briefly

- **Two-pole comparison** — contrast two opposed positions side by side; a centre "vs" node and two pole columns, each led by its own header banner in a *different* hue (the legitimate two-colour case, because the two-sidedness is the message).
- **Iterative cycle flow** — a ring of numbered stage nodes around a central cadence hub with directional chevrons, for a process that *repeats* rather than ends. Built from an unfilled ellipse ring + rotated chevrons (no curved connectors, no rotated text).
- **Pyramid text exhibit** — a governing thought decomposed into three or four supporting arguments, purely in type: a bold lead-in (one accent lead per slide) over one to three lines of prose each. No boxes; hierarchy is weight, size, whitespace.
- **Risk register** — a table of risks with severity coded by `good`/`amber`/`risk`, columns for likelihood, impact, and mitigation, IDs in a severity-coloured cell.
- **Pull-quote exhibit** — a voice-of-customer or authority quotation: a large open-quote glyph in accent, the quote in the display serif italic at size, a hairline, and a "Name, Role" attribution (no em-dash attribution lines).

---

## When you invent a new pattern

If a reference image or a brief needs a layout nothing here covers, build it — then, if it renders clean across themes and fills a genuine gap, write a short entry for it in the same shape (when to use / structure / recipe). Treating the catalog as exhaustive is the mistake; growing it is the intent. Do not add an entry for a one-off that will never recur.
