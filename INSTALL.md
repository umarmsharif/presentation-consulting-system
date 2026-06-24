# Install

This repo is a Claude Code plugin that contains the `consulting-deck-builder` skill (in `skills/consulting-deck-builder/`). The same skill works across Claude Code, Claude.ai, and the desktop app; only the install step differs.

## Claude Code — plugin marketplace (recommended)

```
/plugin marketplace add umarmsharif/presentation-consulting-system
/plugin install consulting-deck-builder@presentation-consulting-system
```

Start a new session and ask Claude to build a deck.

## Claude Code — manual skill copy

If you'd rather not use the marketplace, copy the skill folder into your skills directory:

```bash
git clone https://github.com/umarmsharif/presentation-consulting-system.git /tmp/cdb
cp -r /tmp/cdb/skills/consulting-deck-builder ~/.claude/skills/      # personal (all projects)
# or: cp -r /tmp/cdb/skills/consulting-deck-builder .claude/skills/  # this project only
cd ~/.claude/skills/consulting-deck-builder && npm install
```

Claude Code scans `~/.claude/skills/` (and `.claude/skills/`) at startup and loads any folder containing a `SKILL.md`.

## Claude.ai / Claude desktop / Cowork (upload)

These surfaces don't read your filesystem; skills are uploaded through the UI.

1. Clone the repo and zip the skill folder so the archive unzips to `consulting-deck-builder/SKILL.md`:

   ```bash
   git clone https://github.com/umarmsharif/presentation-consulting-system.git /tmp/cdb
   cd /tmp/cdb/skills && zip -r ~/consulting-deck-builder.zip consulting-deck-builder \
     -x '*/demo.pptx' '*/demo.pdf' '*/node_modules/*'
   ```

2. In Claude: **Settings → Capabilities**, enable Skills / code execution (Free, Pro, Max), or have an admin enable it in **Organization settings → Skills** (Team, Enterprise).
3. **Customize → Skills → `+` → Create skill → Upload a skill**, and choose the zip.
4. The skill appears in your list, toggled on.

## Running the example deck

`skills/consulting-deck-builder/examples/build_demo.js` renders a four-slide demo. It needs:

- **Node.js** with **pptxgenjs** (run `npm install` in `skills/consulting-deck-builder/`; a `package.json` is included)
- **LibreOffice** (`soffice`) to convert PPTX → PDF
- **poppler** (`pdftoppm`) to convert PDF → PNG

```bash
cd skills/consulting-deck-builder
npm install                                       # installs pptxgenjs from package.json
node examples/build_demo.js                       # writes demo.pptx
soffice --headless --convert-to pdf demo.pptx     # PPTX → PDF
mkdir -p out && pdftoppm -png -r 150 demo.pdf out/slide   # PDF → PNG per page (into out/)
```

The renders land in `out/` so they don't overwrite the sample images in `images/`.

In Claude Code or Cowork, just ask Claude to "build a deck on <your topic>"; it runs the workflow in `SKILL.md` and writes its own build script.
