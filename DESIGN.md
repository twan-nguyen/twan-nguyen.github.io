# DESIGN.md — "Ink & serif"

The design contract for this portfolio. Read it before changing anything visual or editing content. If a change needs to break a rule here, update this file in the same commit and say why.

- **Source of truth for the look:** the Claude Design canvas "Portfolio – Nguyễn Bá Tuấn", artboard *F · Ink & serif* (private link: <https://claude.ai/artifact/NkQwC9CFb9ApsHJRjFY7rx>).
- **Implementation:** [`src/app/globals.css`](src/app/globals.css) (tokens), [`src/components/root-shell.tsx`](src/components/root-shell.tsx) (fonts, metadata), [`src/components/portfolio.tsx`](src/components/portfolio.tsx) (layout), [`src/data/profile.ts`](src/data/profile.ts) (all copy, EN + VI).

## 1. Direction

A dark, ruled, typographic page. It reads like a well-made developer tool and does not look like a portfolio template.

- Ink-dark ground with a faint 135° hatch. Content sits in **one ruled column**, max 1200px, with hairline borders left and right.
- **Serif italic headings** (Newsreader) in pale blue, set against **mono metadata** (JetBrains Mono) and a clean sans body (Be Vietnam Pro).
- Structure comes from **1px hairlines**: cells, rows and section dividers. It never comes from cards, shadows or rounded corners.
- **One accent:** a single saturated blue, used only on the primary button. Pale-blue tints carry links and headings.

Inspired by the general qualities of zed.dev (ink ground, ruled frames, serif italic headings, mono details). **Do not copy** Zed's layout, copy, logo, product imagery or components.

## 2. Tokens

Defined once in `globals.css` as CSS variables and exposed to Tailwind via `@theme inline` (`bg-panel`, `text-faint`, `border-line`, …). Never hard-code a hex in a component when a token exists.

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0b0e13` | Page ground, behind the hatch |
| `--panel` | `#0f1319` | The ruled content column |
| `--panel-2` | `#0d1117` | Inset header strips (e.g. company row) |
| `--line` | `#222a35` | Every hairline |
| `--line-strong` | `#2f3a48` | Secondary button borders |
| `--ink` | `#e6ebf1` | Primary text, titles |
| `--ink-2` | `#c3ccd7` | Body text and lists |
| `--muted` | `#a3aebb` | Descriptions under titles |
| `--faint` | `#8d98a6` | Mono metadata, footer |
| `--nav` | `#b4bfcc` | Header navigation |
| `--dim` | `#5c6775` | Bullets of past roles |
| `--heading` | `#b9d1ff` | Serif headings (h1, h2) |
| `--link` / `--link-hover` | `#9cc0ff` / `#d6e5ff` | Inline links, current-role dates, primary skill labels |
| `--accent` | `#2f6fe0` | Primary button fill (the only saturated fill) |
| `--accent-edge` | `#5b8ff0` | Primary button border, current-role bullets |
| `--accent-rule` | `#3b6fd1` | Underline of the contact email |

Hatch: `repeating-linear-gradient(135deg, rgba(160,175,195,.045) 0 1px, transparent 1px 10px)` on `body`. Focus ring: `2px solid #6aa1ff`, offset 2px.

Contrast: `--faint` on `--panel` is about 6:1 and `--muted` about 8:1. Do not introduce a text colour darker than `--faint` for readable text. `--dim` is only for decorative bullets.

## 3. Typography

| Role | Font | Size / style |
|---|---|---|
| H1 (name) | Newsreader italic 400 | `clamp(56px, 8.6vw, 120px)`, line-height .95, tracking −0.02em, `--heading` |
| H2 (section) | Newsreader italic 400 | `clamp(36px, 4.4vw, 56px)`, line-height 1.05, `--heading` |
| Header wordmark | Newsreader italic | 21px, `--ink`. Plain text with no badge, box or monogram |
| H3 / H4 (items) | Be Vietnam Pro 600 | 20px work titles, 17px roles and company |
| Body | Be Vietnam Pro 400 | 15–16px, line-height 1.6. Lead paragraph `clamp(18px, 1.7vw, 21px)` |
| Metadata, nav, labels | JetBrains Mono 400 | 12–13px, lowercase skill labels, `--faint` |

- Every font is loaded through `next/font/google` **with the `vietnamese` subset**. Any new face must support Vietnamese.
- Serif is for headings and the wordmark only. Never set body copy in serif or mono.
- Use `text-wrap: pretty` on paragraphs.

## 4. Layout

- Column: `max-w-[1200px] mx-auto border-x border-line bg-panel`. Section horizontal padding `clamp(16px, 5vw, 64px)`. Vertical rhythm between sections `clamp(56px, 7vw, 88px)`.
- Section order is fixed: **Header → Hero → Selected work → Experience → Skills → Education & languages → Contact → Footer.**
- Ruled grids: either `grid lg:grid-cols-3` with cells `border-b lg:border-r lg:last:border-r-0` (flush with the column), or `border-t border-l` on the wrapper with `border-r border-b` on each cell (inside padded sections). Columns collapse to one on phones.
- Two-column rows (experience): `flex flex-wrap`, left `basis-[260px]`, right `grow-[2.4] basis-[460px]`. The divider is `border-b` on phones and `md:border-r` on wider screens.
- Must work at 375px wide with no horizontal scroll. Touch targets are at least 44px.

## 5. Components

- **Primary button:** square corners, `bg-accent border-accent-edge text-white`, min-height 46px. Use one per screen (the hero email).
- **Secondary button:** transparent, `border-line-strong`, min-height 44–46px.
- **Header:** pinned (`sticky top-0`) with a translucent `bg-panel/90` and backdrop blur, plus the bottom hairline. From `md` up it is one row: wordmark, nav, language switch. On phones it is two rows: wordmark and language switch on row 1, nav on row 2. `html { scroll-padding-top }` (104px on phones, 72px from `md`) keeps anchor jumps below it. Update both values if the header height changes.
- **Language switch:** a bordered pair `EN | VI`. The current locale is a non-link with `aria-current`. The other locale is a `Link` with `hrefLang` and `lang`.
- **Bullets:** a mono `+`, coloured `--accent-edge` for the current role and `--dim` for past roles.
- **External link:** mono text plus a 13px stroke arrow icon (inline SVG, `aria-hidden`).
- **Contact:** the email set large (`clamp(24px, 3.4vw, 40px)`) with an underline in `--accent-rule`, then secondary buttons. A soft radial blue glow at the bottom left is the only gradient on the page besides the hatch.
- Motion: a single `rise` fade on the hero, disabled under `prefers-reduced-motion`. Add no other animation without updating this file.

## 6. Content rules

These come from the CV data conventions and from design review. They apply to both languages.

1. **Each fact appears in exactly one place.** Product details live in *Selected work*. *Experience* links there and lists only what is not already said. Email appears only in the hero button and in Contact.
2. **No phone number, no date of birth, no intern/fresher labels, no company email.** The only public email is `twan.nguyenba@gmail.com`.
3. **No client names or detailed metrics.** Cogover and StringeeX are company products: no source code, and screenshots only with permission and with real data masked.
4. **No invented content:** no fake stats, no sample-data demos, no filler lines ("Say hello", "Let's build…"). Copy comes from the CV data file.
5. **No "dev template" clichés:** no tech-tag chips, no `</>` glyphs, no skill bars, no fake terminal windows, no emoji.
6. **Bilingual parity:** every string exists in `en` and `vi` in `src/data/profile.ts`. Vietnamese keeps full diacritics. Each locale has its own root layout so `<html lang>` is correct.

## 7. Decisions already made (do not re-open without a reason)

- An interactive pivot/report-builder demo was tried and **removed**. It did not show anything meaningful to visitors.
- A badge-style logo ("NBT" in a blue box) was **rejected** as cheap-looking. The wordmark is the name in serif italic.
- Light "paper" directions (editorial, Swiss, letter) were explored and **rejected** as too plain. The site stays dark.
- The light-only rule from the original CV style guide is intentionally overridden for the website. The PDF CV keeps its own light style.
