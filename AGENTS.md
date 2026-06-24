# consulting-deck-builder

An open Agent Skill for building consulting-grade strategy decks: board briefings, diagnostics, roadmaps, recommendations, and pitches. The output reads as the work of a senior operator, not a template.

This file is the **portable entry point**. Any agent that reads `AGENTS.md` (Codex, Cursor, opencode, Gemini CLI, Cline, Amp, Antigravity, and others) can use the skill: when the user asks to build a deck, a presentation, or to turn analysis into slides, follow `SKILL.md`.

## How to use

The skill lives in `skills/consulting-deck-builder/`. To build a deck:

1. Read `skills/consulting-deck-builder/SKILL.md` for the full workflow: intake → ghost-deck sign-off → per-slide build → QA.
2. Pull its references as the workflow points to them: `references/design-system.md` (8 themes, fonts, slide anatomy), `references/patterns.md` (layout catalogue), and `references/charts.md` (chart selection + honesty rules), all inside that skill folder.
3. Use `skills/consulting-deck-builder/examples/build_demo.js` as a working pptxgenjs build to copy from. Requires Node and `pptxgenjs` (`npm install` in that folder).

## The discipline in one paragraph

Collect the brief first (audience, goal, deck type, framing such as SCQA / diagnostic / recommendation, length, theme, font, slide chrome) through structured questions, before anything is built. Plan the whole deck as a **ghost deck** (an action title and a layout per slide) and get sign-off before writing body content. Then build each slide title-first: one accent per slide, honest charts, hairlines over coloured bars, clean prose with no AI-tell vocabulary. A deck that reads as deliberate keeps the room; one that reads as generated loses it before the first word.

License: MIT.
