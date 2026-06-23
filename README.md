# Consulting decks that don't look AI-made

Most AI-generated decks announce themselves. The warm cream backgrounds, the three-bullet rhythm on every slide, the oversized section numerals, the same six fonts everyone uses. Executives have learned to spot the pattern in seconds, and the moment they do, the argument loses weight before it's read.

This is an open **Agent Skill** that builds strategy decks which avoid that trap. It pairs a design language engineered against the tells with the structural logic of how strategy work is actually built. The output reads like a person who knows the subject made it.

Install it into Claude Code or the Claude desktop app and ask for a deck.

## The problem it solves

Three things go wrong with most decks, AI-assisted or not:

1. **They look generic.** Template aesthetics signal low effort. A board notices.
2. **They read like filler.** Vague claims, hedged language, the vocabulary of a press release. No specific number anyone can act on.
3. **They don't carry an argument.** Slides labelled by topic instead of conclusion, so the reader assembles the "so what" themselves.

A deck is a decision tool. If it doesn't move a decision, the design was beside the point.

## Sample output

Four slides from the included demo build. The company, "Meridian," is fictional and every figure is fabricated to show the design system.

![Demo deck title slide](images/slide-1.png)
![Diagnostic three-panel slide](images/slide-2.png)
![Impact-effort prioritisation matrix slide](images/slide-3.png)
![Phased roadmap gantt slide](images/slide-4.png)

## Install

**Claude Code:**

```bash
git clone https://github.com/umarmsharif/presentation-consulting-system.git \
  ~/.claude/skills/consulting-deck-builder
```

Start a new session and ask Claude to build a deck.

**Claude.ai / desktop / Cowork:** zip the folder and upload it via `Customize → Skills → Create skill → Upload a skill`.

Full steps, requirements, and how to run the demo: see [INSTALL.md](INSTALL.md).

## How to use it

Once installed, just ask:

> "Build me a diagnostic deck on our churn problem, 8 slides, Bright White & Pine theme."

The skill runs a short brief, proposes a **ghost deck** (action titles + layout per slide) for your sign-off, then builds each slide. It writes its own PowerPoint build script, so you get an editable `.pptx`, not a screenshot.

## What's included

- **8 themes**: complete palettes and type pairings (Bright White & Pine, Slate, Oxblood, Solarized, Paper, Mono, Ink, Midnight).
- **A pattern catalogue**: workhorse exhibits (diagnostic three-panel, impact/effort matrix, phased gantt, waterfall, comparison tables, stat heroes) plus denser composites.
- **Chart guidance**: a message-to-chart-type guide and the honesty rules (no 3D, direct labels, zero baselines, logical ordering).
- **A working example**: `examples/build_demo.js` renders the four slides above.
- **A title linter**: `scripts/check_titles.js` flags topic-labels that should be action titles.
- **Prose discipline**: built-in guidance to strip the vocabulary and rhythms that read as AI.

## What's not here (the full version)

This open release gives you the design system and the workflow. The private build I use with clients adds the depth:

- A reference library pattern-matched against 600+ recent consulting decks.
- The full exhibit library and per-archetype pattern pools.
- A voice layer tuned to a specific author.
- A learning loop that feeds delivered-deck QA back into the system.

If you have a deck that has to land in front of a board, an investor, a client, or a hard internal decision, that's where I come in.

## Work with me

I'm Umar Sharif. I build AI systems for businesses and share what I learn. This is one of them.

**Email:** umarmsharif@gmail.com

## License

MIT, see [LICENSE](LICENSE). Use it, modify it, ship it. Attribution appreciated, not required.
