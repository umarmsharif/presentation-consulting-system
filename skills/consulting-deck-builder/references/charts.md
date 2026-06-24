# Charts — pick the type, then keep it honest

Two jobs here: choose the chart type that matches the *message* (not the shape of the data), then render it under the honesty rules. A chart's job is communication, not data inventory.

---

## 1. Message → chart type (quick-pick)

Decide what you want the reader to take away, then read across.

| The message you want the reader to take away | Chart |
|---|---|
| Compare **unordered** categories against each other | **Bar** (horizontal) |
| Compare categories with a **natural order**, especially time periods | **Column** (vertical) |
| Show **change** in a single measure over time | **Line** |
| Show the **relationship** between two continuous variables | **Scatter** |
| Show how a starting value **becomes** an ending value through additions/subtractions | **Waterfall** |
| Show **share-within-category AND share-of-total** simultaneously | **Mekko** (marimekko) |
| Compare three or more series **moving over time**, each in its own panel | **Small multiples** |
| Compare the **composition** of a few totals | **Stacked / 100% stacked bar** |
| Compare two or more series at each of a few categories | **Grouped bars/columns** |
| Show one category's **share of a single total** (rare in operator decks) | **Pie / donut** — see warnings |

If two charts could fit, pick the one with the lower cognitive cost for the reader.

### Notes on the harder calls

- **Bar vs. column.** Bar (horizontal) for unordered categories you will sort by size. Column (vertical) for ordered categories — usually time — where the order itself carries meaning.
- **Mekko vs. bar.** Reach for Mekko only when *both* share-within-category and share-of-total matter at once. If comparing values within one dimension is the whole message, a plain bar/column is clearer.
- **Waterfall vs. bar.** Waterfall when the question is "how do we get from A to B?" — a decomposition of change. If you are just comparing endpoints, it is a bar.
- **Pie / donut.** Use only when share of a single total is the *only* message, and even then prefer a single 100% stacked bar. **Never put two pies side by side** — readers cannot compare slices across separate pies. Use a 100% stacked bar so the eye reads one axis.
- **Small multiples vs. one busy line chart.** When three or more series each have their own shape over time, give each its own small panel on a shared scale rather than overplotting one chart with a five-line spaghetti.

### When NOT to use a chart at all

- A single number that anchors the slide → a stat-hero or big-numeral layout, not a one-bar chart.
- A relationship, not a quantity (sequence, hierarchy, overlap, flow) → a diagram primitive, not a chart.
- Three or fewer values with no trend → often just a clean table or three labelled figures.

---

## 2. Chart honesty rules (non-negotiable)

These are the rules a reader uses to decide whether to trust the chart. Break one and you lose the room.

- **No 3D, ever.** 3D perspective distorts proportionality and is a pure decoration tell.
- **Zero baseline on bars and columns.** The y-axis starts at 0 for any bar/column chart. If there is a genuine, documented reason to truncate, the truncation gets an explicit footer note. Line charts may use a non-zero baseline to show slope, but say so.
- **No borders around bars or columns**, and no chart-junk gridlines unless a gridline is genuinely helping the reader read a line's slope.
- **Label directly; drop the legend when colours are few.** With two or fewer colours, label each segment inline with its value or category. For line charts, label each line near its right edge — never a legend for four or fewer lines. A legend is acceptable only when categories exceed three.
- **Logical bar order, not alphabetical.** For bars (unordered categories), sort biggest to smallest unless there is a story-driven reason to break order. For columns (ordered categories, usually time), keep the natural order. Alphabetical order on either is almost always wrong — it gives the reader no signal about magnitude or direction.
- **Selective colour.** Only the message-critical bar/line/segment carries the accent; the rest stay neutral (ink or mute). One or two coloured elements direct the eye; six coloured elements cancel out. A single *focus* series may take the accent with the rest muted.
- **Number every proportional element.** Print the value on each bar, bubble, or segment. If a label will not fit inside a thin bar, put it immediately adjacent. Never use a legend as a substitute for direct labels.
- **Area-true sizing.** Any shape sized by value (bubbles, circles) scales by AREA, not radius. A "2× bigger" bubble has 2× the area (radius × √2).
- **Tie the chart to the title.** When the headline names a specific number, segment, or category, give that element visual emphasis in the chart — bold, accent, or both — so the reader's eye lands where the title points.
- **Footer carries the receipts.** Every chart slide footnotes its source, time window, and any caveat (axis breaks, exclusions, definitions). A reader who wants to challenge the chart should be able to locate the data.

### Waterfall specifics

- **Cumulative cascade.** Each bar starts at the previous running total, not a fixed zero-line.
- **One shared y-axis scale** across all bars.
- **The math must reconcile.** Verify the summation before render and state the equation in the footer.
- **Labels outside the bars** — values above, categories below the x-axis, captions further below.
- **Axis breaks only on large anchors** (bars with ≥ ~1.0" of visible height), positioned at the bar's visual midpoint; small anchors stay uncut.

---

## 3. Rendering note (portability)

Native auto-charts often degrade when a PPTX is re-imported into other tools (e.g. Google Slides) — scatter and bar charts are the usual casualties. The portable approach is to draw charts from primitives (rectangles, ellipses, lines) so every mark is a real shape that survives the round trip. The demo build (`examples/build_demo.js`) shows the hand-drawn approach for the common types. If you must use a native chart for a one-off, export the slide to PNG at 300 DPI and paste the image in, rather than shipping a fragile live chart.
