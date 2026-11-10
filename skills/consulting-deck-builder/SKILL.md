---
name: consulting-deck-builder
description: Build consulting-grade strategy decks, board briefings, diagnostics, roadmaps, and pitch decks that read as deliberately designed rather than machine-generated. Use this for any slide deliverable where the audience evaluates an argument — a recommendation, a case study, a market-entry read, a transformation plan. It enforces action titles, a ghost-deck plan before any body content, one disciplined design system (eight vetted themes, a display + body font pairing, hairlines over coloured bars, one accent per slide), honest charts, and a clean-prose voice with no AI-tell vocabulary. Trigger it whenever someone asks to make a deck, build a presentation, turn analysis into slides, or prepare a client/board/leadership deliverable — even when they do not name the skill.
---

# Consulting deck builder

Build decks that carry an argument and look like they came from a senior operator's desk. Most AI-made decks lose the room on sight — reflexive cream grounds, one font doing every job, coloured bars stapled to every card, titles that name a topic instead of stating a finding. This skill removes those tells by working through a fixed discipline: brief, verify the facts, ghost-deck, review the copy, build slide by slide, light QA.

Read `references/design-system.md` for the eight themes, the font list, and the slide anatomy; `references/patterns.md` for the layout catalog; `references/charts.md` for the message→chart mapping and honesty rules; and `examples/build_demo.js` for a working build you can copy from.

---

## The workflow

### (a) Intake — collect the user's preferences first

Open every deck by gathering the brief through **structured questions**, before any planning or building. Where the **AskUserQuestion** tool exists (Claude Code), deliver these as three calls; the tool takes up to four questions per call. On Cowork or chat, ask the same as one short numbered list. Do not start the ghost deck until they are answered. Running autonomously with no user present, state your defaults and proceed.

**Call 1 — the argument**

1. **Audience** — who reads it, and what do they already believe? (board · investor · client · internal leadership · team)
2. **Goal** — what one decision or action do you want after the last slide? This one sentence becomes the deck's spine.
3. **Deck type** — diagnostic · recommendation · roadmap · market-entry · transformation · pitch (options below).
4. **Framing** — how the argument opens: none · SCQA · SCR · BLUF · inductive · deductive · issue-tree (options below).

**Call 2 — the form**

5. **Length** — auto (let the content decide) · ~6–8 (executive) · ~10–14 · ~16+ (deep-dive).
6. **Theme** — bright-white-pine (default) · slate · oxblood · solarized · paper · mono · ink · midnight.
7. **Display font** — theme default · Charter · Palatino · Iowan · Baskerville · Hoefler · Cochin · Optima · Manrope Bold.
8. **Slide chrome** — which framing elements each slide carries: full (breadcrumb top-left + `N of M` page number + footer source/caveat — the consulting default) · headers only (breadcrumb + page number, no footer) · minimal (title and content only, no breadcrumb or footer).

**Call 3 — the contents**

9. **Sections** — which sections the deck carries, as a multi-select. Offer the deck type's typical spine as the pre-selected set (table below) and let the user drop or add sections; when the spine has more than four sections, split it across two multi-select questions. Settling the section list here saves a ghost-deck round: the table in step (b) then argues titles, not scope.
10. **Must-include, must-avoid** — any page, client name, figure or phrase that has to appear, and any that must not.

Output is PowerPoint unless the user asks otherwise. The topic and any source material come from their opening request; ask for them if missing. A wrong assumption here, above all on **type and framing**, means rebuilt slides later. Whatever the user picks for theme and font is recorded once at the top of the build and never mixed mid-deck (tokens in `references/design-system.md`).

**Deck-type options** — the type drives the slide order:

| Archetype | The reader's question | Typical spine |
|---|---|---|
| **diagnostic** | What's broken, and why? | symptom → root cause → evidence → implication |
| **recommendation** | What should we do? | answer first → why → how → what it costs → the ask |
| **roadmap** | In what sequence, by when? | end state → phases → dependencies → near-term moves |
| **market-entry** | Is the opportunity real, and how do we get in? | market size → where we win → path in → risks |
| **transformation** | How do we get from A to B? | current state → target state → the journey → milestones |
| **pitch** | Why this, why now, why us? | problem → solution → traction → market → the ask |

**Framing options** — overlay a deck type to set how the logic opens and flows (chosen explicitly for board and executive work):

| Framing | When to use | Spine |
|---|---|---|
| **SCQA** | Build tension before the answer (narrative briefings) | Situation → Complication → Question → Answer |
| **SCR** | A tighter SCQA for short reads | Situation → Complication → Resolution |
| **BLUF** | Time-poor executives; answer on slide one | bottom line first → support → detail |
| **inductive** | Build from evidence up to a conclusion | evidence → pattern → conclusion |
| **deductive** | Argue down from accepted premises | premise → premise → therefore |
| **issue-tree** | Decompose the question MECE | question → branches → sub-branches → answer |

Common pairings: "recommendation + BLUF", "diagnostic + SCQA".

### (a2) Verify before you build — MANDATORY

Ask more than feels necessary here. A question costs the user a tap; a wrong claim on a slide that reaches a client, a board or an investor costs their credibility, and it is the most expensive mistake this skill can make. Do this before the ghost deck, with **AskUserQuestion** where it exists.

List every factual claim the source material makes and sort it into four groups, then confirm each group with the user:

1. **Proof points** — for every named client, case study or logo: is the relationship current or ended, and may the name be shown?
2. **Agreements and status words** — for every partnership, contract or launch: signed, agreed in principle, or in discussion? live, or planned? Use the exact status the user confirms.
3. **Offers the deck makes** — a reference call, a data pack, a deadline. Has the other party agreed to it? Never offer a reference from a client who has not said yes.
4. **Numbers, names and dates** — the source of each figure, the spelling of each person and company, and one start and end date per period. Where two source pages disagree, ask which is right; do not pick one.

Rules that follow from this:

- Look in the user's own published material (their site, reports, research) for a missing figure before searching outside, and say where each figure came from.
- A claim the user cannot confirm is cut, softened to what they can confirm, or marked `[to confirm]` in the ghost deck. It is never shipped as written.
- Keep the confirmed answers in the build's data file (`confirmed: true`, `status: "agreed in principle"`), so a later edit cannot quietly restore the stronger wording.
- Running autonomously with no user present, list the unverified claims at the top of the delivery note.

### (b) Ghost-deck the whole thing first — MANDATORY

**Do not write a single line of body content until the ghost deck is approved.** The ghost deck is the entire narrative as a table: one row per slide, with the **action title** and the **chosen layout** for each. Nothing else — no body copy, no chart data yet.

| # | Action title (the "so what") | Layout |
|---|---|---|
| 1 | Revenue grew 15% but the growth came from one fragile segment | stat-hero |
| 2 | The funnel breaks in three places, and the middle one is fixable now | diagnostic-three-panel |
| 3 | Fixing the mid-funnel returns 8× what the other two cost | chart + commentary rail |
| … | … | … |

Present this table and get explicit sign-off before building anything. In Claude Code, use the **AskUserQuestion** tool — offer *approve all / revise specific slides / restructure*; on Cowork or chat, ask for the same approval in prose. Build no slide until the brief and the ghost deck are both signed off. If you are running autonomously with no person present, state the archetype, framing, and ghost deck you are proceeding with, then continue.

The ghost deck is where the argument gets fixed. Read the action titles **top to bottom on their own** — they should tell the whole story without any slide opening. If they don't, the story isn't there yet; fix it in the table, not in the slides. This is the single highest-leverage step in the whole process.

Run the titles through `scripts/check_titles.js` at this stage to catch any that slipped back into topic-label form.

### (b2) Review the copy before the first render — MANDATORY

Storyline and slide-writing checks run on the text, before any slide is drawn. Run after delivery, they change titles and force a rebuild. Two passes, in this order:

1. **Storyline pass, on the ghost deck.** State the reader, their question and the one-sentence answer. Read the titles alone: the answer should appear in a title by the second content slide, and each title should follow from the one before. Test one rival answer ("do nothing" is usually the strongest) and name what the deck lacks to beat it.
2. **Slide-writing pass, on each page's draft copy** (title, context line, body items, closing line), once the body is drafted and before it is rendered:
   - **Supported** — the body proves the title, in the body's own terms, and the title is no stronger than the evidence.
   - **Words match numbers** — a count in the title equals the items in the body ("three questions" over three questions; "25+ clients" over a grid labelled "18 of the 25+").
   - **Defined before used** — a term in the title is named on that page or an earlier one.
   - **Context line earns its place** — it says what to look at in the body. Cut lines that only describe the page ("everything you need before the detail").
   - **Closing line adds no new claim** — it draws the implication of what the page already shows.
   - **One term, one number** — the same thing carries the same name and the same figure on every page.

If the companion skills `storylining` and `effective-slidewriting` are installed, invoke them for these two passes. Record that both ran (in the data file or the delivery note); step (c) does not start until they have.

### (c) Build each slide with discipline

Once the ghost deck is approved, build slides one at a time, in this order every time:

1. **Action title first.** It is already written in the ghost deck. Place it; the slide now has a job.
2. **Layout.** Pick the pattern from `references/patterns.md` that fits the message. Quick map from the slide's job to a starting pattern:

| The slide's job | Starting pattern |
|---|---|
| Answer-first executive summary | executive-summary / governing-thought briefing |
| Three parallel findings | diagnostic-three-panel |
| Place many items on two axes | prioritisation matrix (2×2) |
| Time-phased plan or workstreams | phased roadmap / gantt |
| Compare scenarios or options | three-column comparison / feature-comparison matrix |
| Decompose a change from A to B | waterfall |
| One statistic anchors the beat | stat-hero / big-numeral (condiment only) |
| Explain a model and prove it | central model with evidence rail |
| An ordered process | numbered step spine |
| A chart whose moments need interpreting | chart + anchored commentary rail |
| Fragmented inputs into one destination | source-to-destination diagram |

   The catalog is a floor, not a ceiling — if quantitative content needs a chart the catalog doesn't show, build the chart; if a brief needs density the patterns produce sparsely, invent a layout. Components compose: a chart under an ink-emphasis takeaway, a primitive beside a stat tile.
3. **Visual.** Build the chart or diagram. For quantitative content, default to a chart over stat cards — see `references/charts.md` to pick the type, then keep it honest (no 3D, zero baselines, direct labels, logical bar order). One accent element per slide; the rest stay neutral.
4. **Icons on every card.** Every card, stat tile, panel and column header carries one monoline icon that means something for its content, in a single colour and weight across the deck. On a stat tile the icon sits above the numeral, never beside it, where it narrows the box and wraps the number. A grid where some cards have icons and some do not reads as unfinished; check every card before rendering.
5. **Context line + footer.** Open the slide with one italic context sentence (why the reader is looking, before the number lands). Close it with the footer: an italic source/caveat on the left, a `Source | N of M` label on the right. Every chart slide footnotes its source, time window, and any caveat. Honour the **slide-chrome** choice from intake: *headers only* keeps the breadcrumb and page number but drops the footer; *minimal* drops the breadcrumb and footer both, leaving title and content. Apply the choice consistently across every slide.

Use the `header()` / `title()` / `footer()` helpers (in `references/design-system.md`) so every slide shares one anatomy and the reader reads content, not orientation.

### (d) Light QA before delivery

A short pass, not a second project:

1. **Titles tell the story.** Read every action title top to bottom — the deck's argument is legible from the titles alone. Re-run `scripts/check_titles.js`.
2. **Every claim traces to evidence.** Each recommendation points back to a stated finding; each chart has a source. Every proof point, status word and offer matches what the user confirmed in step (a2), and estimated chart points are drawn differently from measured ones (hollow markers, with a legend).
3. **Design discipline holds.** One accent per slide. Every card, stat tile and panel has its icon. No one-edge accent bars, no eyebrow pills, no oversized section numerals, no second font sneaking in. Nothing crosses the bottom safe edge.
4. **Prose is clean.** No banned vocabulary (below), at most one em-dash per slide, no negative parallelisms ("not X, but Y"), no closing-summary slide that just recaps the deck.

---

## Universal conventions

These hold on every slide regardless of layout.

- **Action titles, not topic titles.** The headline states the takeaway, not the subject. "The funnel breaks in three places" — not "Funnel analysis." If a title could sit on a chapter divider, it isn't earning its place.
- **Context before data.** Each slide opens with one italic context line so the reader knows why before their eye lands on a number.
- **One idea per slide.** Two titles means two slides.
- **One accent per slide.** The eye should land on one accent element first. If three things are the accent colour, two should be neutral.
- **Bold ties the chart to the title.** When the headline names a number or segment, that element gets emphasis in the chart — bold, accent, or both — so the eye lands where the title points.
- **Selective colour.** Only message-critical elements carry the accent; supporting elements stay ink or mute.
- **Hairlines over bars.** Carry emphasis with type weight, a full-width hairline, a full fill, or whitespace — never a coloured stripe down one edge of a card.
- **Honest charts.** No 3D, zero baselines on bars/columns, direct labels over legends when colours are few, logical (not alphabetical) bar order, area-true sizing. Full rules in `references/charts.md`.
- **Footer discipline.** Every content slide: italic source/caveat left, `Source | N of M` right.
- **Austerity signals confidence.** Whitespace is not wasted. Dense, anxious slides read as insecure. Sparse layouts (stat-hero, big-numeral) are condiments — bridges, not workhorses; a sparse slide one trains the reader to expect filler.

---

## Prose and voice

Slide copy and speaker notes should read as written by a person with a point of view, not assembled by a model. Generic guidance:

- **Clean and specific.** Prefer concrete nouns and real numbers to abstraction. "Activation dropped from 31% to 19% after the March release" beats "activation saw a notable decline."
- **State the so-what.** Every line should advance the argument. If a sentence could be deleted without losing meaning, delete it.
- **No AI-tell vocabulary.** Avoid: *delve, leverage, robust, seamless, transformative, paradigm, cutting-edge, game-changer, unlock, holistic.* These words signal generated text; replace each with a plain equivalent or cut it.
- **Minimal em-dashes.** At most one per slide. An em-dash used for rhythm on every line is a tell.
- **No negative parallelisms.** Avoid the "It's not X, it's Y" / "Not just A, but B" cadence. It is a cliché.
- **No self-explaining hedges.** Cut "it's worth noting that," "it's important to remember that." Just say the thing.
- **No closing-summary slide that recaps the deck.** End on the ask or the next step, not a restatement.
- **Tracked caps for short labels only.** Never track body text or set long passages in uppercase.

---

## A worked ghost deck

To see the discipline in motion, here is a full ghost deck for a fictional recommendation. The client is **Meridian**, a mid-market B2B SaaS company; the goal sentence is "approve the mid-funnel rebuild as the next quarter's priority." Archetype: recommendation. Theme: `bright-white-pine`.

| # | Action title (the "so what") | Layout |
|---|---|---|
| 1 | Meridian should rebuild the mid-funnel next quarter — it is the cheapest path to the growth target | title bookend |
| 2 | Growth slowed to 4% even as spend rose 30%, so the problem is conversion, not demand | stat-hero |
| 3 | The funnel leaks in three places; the middle leak is the largest and the most fixable | diagnostic-three-panel |
| 4 | Trials that hit the "second project" step convert 6× better, and only 12% reach it | chart + commentary rail |
| 5 | Of the three fixes, the mid-funnel rebuild returns 8× its cost within two quarters | prioritisation matrix |
| 6 | The rebuild ships in three phases over 14 weeks, with value landing from week 6 | phased roadmap |
| 7 | Two risks could stall it; both are detectable early and have named mitigations | status-card grid |
| 8 | Approve the rebuild and a two-engineer team by Friday to hold the Q3 launch | closing ask |

Read titles 1–8 on their own: they tell the entire story (slowing growth → conversion is the cause → three leaks → the middle one is biggest → the fix pays back 8× → here's the plan → here are the risks → here's the ask). That legibility *is* the test. If the titles read as "Growth," "The funnel," "Options," "Plan," "Risks," "Ask," the argument is hiding inside the slides where the reader has to dig for it.

Only after this table is approved does any chart get built or any body line get written. Run it through `scripts/check_titles.js` first — every title above clears, because each carries a number, a verb, or a two-clause construction.

---

## Common failure modes

The tells that mark a deck as machine-made, and the fix for each:

- **Topic titles.** "Funnel analysis" instead of "The funnel breaks in three places." Fix: every title is an assertion with a verb or a number. The linter catches most.
- **A sparse slide one.** A single stat opening the deck trains the reader to expect filler. Fix: open on a workhorse — a chart or a real diagnostic — and save the stat-hero for a mid-deck bridge.
- **Two fonts doing one job, or one font doing every job.** Fix: one display face for prose, one body sans for everything else; data numerals stay in the body sans.
- **Coloured bars on every card.** The side-tab tell. Fix: hairlines, fills, weight, whitespace.
- **Three accents fighting on one slide.** Fix: one accent element; the rest neutral.
- **A legend where a direct label would do.** Fix: label the bar or line itself when colours are few.
- **A closing slide that recaps the deck.** Fix: end on the ask or the next step.
- **A status claim nobody checked.** "Signed", "live", "reference available" carried over from the source. Fix: step (a2); use the status the user confirmed.
- **A title sized for a font the reader lacks.** The title wraps to a third line on their machine and collides with the line below. Fix: confirm the fonts are installed before the first render, and reserve two title lines by estimating line breaks at 80% of the box width.
- **Bare cards.** Some tiles carry an icon and others do not. Fix: an icon on every card, above the numeral on stat tiles.

---

## What good looks like

A finished deck reads in two passes. First pass: a reader skims the action titles top to bottom and gets the whole argument. Second pass: each slide proves its title with one clean visual, one accent, and a sourced footer. The design never asks for attention; it gets out of the way of the argument. That is the whole game — a deck that reads as deliberate keeps the room, and a deck that reads as generated loses it before the first word is spoken.
