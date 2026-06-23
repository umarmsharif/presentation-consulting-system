# Install

This repo is an Agent Skill. The same `SKILL.md` works across Claude Code, Claude.ai, and the Claude desktop app — only the install step differs.

## Claude Code (filesystem)

Personal skill (available in every project):

```bash
git clone https://github.com/umarmsharif/presentation-consulting-system.git \
  ~/.claude/skills/consulting-deck-builder
```

Or scope it to one project:

```bash
git clone https://github.com/umarmsharif/presentation-consulting-system.git \
  .claude/skills/consulting-deck-builder
```

Start a new session. Claude Code scans `~/.claude/skills/` (and `.claude/skills/`) at startup and loads any folder containing a `SKILL.md`. Confirm with `/skills` or just ask Claude to "build a consulting deck" and watch it trigger.

## Claude.ai / Claude desktop / Cowork (upload)

These surfaces don't read your filesystem — skills are uploaded through the UI.

1. Download or clone this repo, then zip the folder so the archive contains the skill directory at its top level (unzips to `consulting-deck-builder/SKILL.md`):

   ```bash
   cd presentation-consulting-system && cd .. && \
   zip -r consulting-deck-builder.zip presentation-consulting-system \
     -x '*.git*' '*/demo.pptx' '*/demo.pdf'
   ```

2. In Claude: **Settings → Capabilities** — enable Skills / code execution (Free, Pro, Max) or have an admin enable it in **Organization settings → Skills** (Team, Enterprise).
3. **Customize → Skills → `+` → Create skill → Upload a skill**, and choose the zip.
4. The skill appears in your list, toggled on.

## Running the example deck

`examples/build_demo.js` renders a four-slide demo. It needs:

- **Node.js** with **pptxgenjs** — run `npm install` in the skill folder (a `package.json` is included)
- **LibreOffice** (`soffice`) to convert PPTX → PDF
- **poppler** (`pdftoppm`) to convert PDF → PNG

```bash
npm install                                       # installs pptxgenjs from package.json
node examples/build_demo.js                       # writes demo.pptx
soffice --headless --convert-to pdf demo.pptx     # PPTX → PDF
mkdir -p out && pdftoppm -png -r 150 demo.pdf out/slide   # PDF → PNG per page (into out/)
```

The renders land in `out/` so they don't overwrite the sample images in `images/`.

In Claude Code or Cowork, just ask Claude to "build a deck on <your topic>" — it runs the workflow in `SKILL.md` and writes its own build script.
