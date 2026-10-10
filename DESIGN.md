# DESIGN.md — "Ink & serif"

The design contract for this portfolio. Read it before changing anything visual or editing content. If a change needs to break a rule here, update this file in the same commit and say why.

- **Source of truth for the look:** this file. Where the code and this file disagree, fix one so they match in the same commit.
- **Implementation:** [`src/app/globals.css`](src/app/globals.css) (tokens), [`src/components/root-shell.tsx`](src/components/root-shell.tsx) (fonts, metadata), [`src/components/portfolio.tsx`](src/components/portfolio.tsx) (layout), [`src/data/profile.ts`](src/data/profile.ts) (all copy, EN + VI).

## 1. Direction

A dark, ruled, typographic page. It reads like a well-made developer tool and does not look like a portfolio template.

- Ink-dark ground with a faint 135° hatch. Content sits in **one ruled column**, max 1200px, with hairline borders left and right.
- The page is a **frame**: every block is a full-bleed band closed by a hairline that runs edge to edge, with a small **+ registration mark** where it crosses a vertical line (see §4).
- **Serif italic headings** (Newsreader) in pale amber, set against **mono metadata** (JetBrains Mono) and a clean sans body (Be Vietnam Pro).
- Structure comes from **1px hairlines**: cells, rows and section dividers. It never comes from cards, shadows or rounded corners.
- **One accent:** a single warm amber, used only on the primary button. Pale-amber tints carry links and headings. Amber was chosen to keep the site visibly distinct from zed.dev, whose signature is pale-blue serif on ink.

Inspired by the general qualities of zed.dev (ink ground, ruled frames with nodes and dashed rulers, serif italic headings, mono details, eased load-in and scroll reveals). The frame grammar and motion were adopted on purpose at the owner's request. **Do not copy** Zed's copy, logo, product imagery, editor screenshots, marquee, or the artwork of its spinning hero graphic (the hero background here is built from this site's own grid and diamond motifs). The footer credits zed.dev as the inspiration in both languages (`inspiredBy` in `profile.ts`); keep that credit.

## 2. Tokens

Defined once in `globals.css` as CSS variables and exposed to Tailwind via `@theme inline` (`bg-panel`, `text-faint`, `border-line`, …). Never hard-code a hex in a component when a token exists.

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0b0e13` | Page ground, behind the hatch |
| `--panel` | `#0f1319` | The ruled content column |
| `--panel-2` | `#0d1117` | Inset header strips (e.g. company row) |
| `--panel-hover` | `#121821` | Hover fill of work and skill cells |
| `--line` | `#222a35` | Every hairline |
| `--line-strong` | `#2f3a48` | Secondary button borders |
| `--ink` | `#e6ebf1` | Primary text, titles |
| `--ink-2` | `#c3ccd7` | Body text and lists |
| `--muted` | `#a3aebb` | Descriptions under titles |
| `--faint` | `#8d98a6` | Mono metadata, footer |
| `--nav` | `#b4bfcc` | Header navigation |
| `--dim` | `#5c6775` | Bullets of past roles |
| `--heading` | `#f5d39b` | Serif headings (h1, h2), hero diamonds |
| `--link` / `--link-hover` | `#f0b867` / `#ffe2b0` | Inline links, current-role dates, primary skill labels |
| `--accent` / `--accent-hover` | `#d9863a` / `#e59a52` | Primary button fill (the only saturated fill) |
| `--on-accent` | `#1b1207` | Text on the accent fill. White on amber is only 2.8:1, so it is never used |
| `--accent-edge` | `#f0a860` | Primary button border, current-role bullets |
| `--accent-rule` | `#c9762a` | Underline of the contact email |
| `--ease-out-expo` | `cubic-bezier(.16,1,.3,1)` | The only easing curve for entrance motion |

Hatch: `repeating-linear-gradient(135deg, rgba(160,175,195,.045) 0 1px, transparent 1px 10px)` on `body`. Focus ring: `2px solid var(--focus)` (`#ffc46b`), offset 2px.

Contrast: `--faint` on `--panel` is about 6:1 and `--muted` about 8:1. Do not introduce a text colour darker than `--faint` for readable text. Measured: `--heading` 13:1, `--link` 10.4:1, `--on-accent` on `--accent` 6.5:1. `--dim` is only for decorative bullets.

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

- **Frame.** Every block (header, each section, footer) is a `Row` in `portfolio.tsx`, never a bare `<section>`:
  - a full-width band, `flex`, closed by `border-b border-line` that spans the whole viewport;
  - in the middle, the column cell: `w-full max-w-[1200px] border-x border-line bg-panel`;
  - either side, a gutter (`flex-1`) whose outer edge is a **dashed ruler line** (`.gutter-l` / `.gutter-r`: `--line-strong`, 4px on, 4px off). Column edges stay solid;
  - a **node** where the bottom hairline meets each vertical line: an 11px **+ registration mark** with 1px arms in `--faint`, drawn brighter than the lines it sits on and centred on both of them (verified to 0px). It echoes the `+` bullets. Do not go back to diamond nodes: they were Zed's mark.
  - Gutters and nodes appear only from the `frame` breakpoint (`83rem`, 1328px), where the column no longer touches the viewport edges. The band gets `px-8` there. Below it the column is full width and only the hairlines remain.
  - The footer is the only band without a closing hairline or nodes (`closed={false}`).
- Section horizontal padding `clamp(16px, 5vw, 64px)`. Vertical padding inside a band `clamp(56px, 7vw, 88px)`.
- Section order is fixed: **Header → Hero → Selected work → Experience → Skills → Education & languages → Contact → Footer.**
- Ruled grids: either `grid lg:grid-cols-3` flush with the column, with cells `border-b last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0` so they never double the band's hairline, or `border-t border-l` on the wrapper with `border-r border-b` on each cell (inside padded sections). Columns collapse to one on phones.
- Two-column rows (experience): `flex flex-wrap`, left `basis-[260px]`, right `grow-[2.4] basis-[460px]`. The divider is `border-b` on phones and `md:border-r` on wider screens.
- Must work at 375px wide with no horizontal scroll. Touch targets are at least 44px.

## 5. Components

- **Primary button:** square corners, `bg-accent border-accent-edge text-on-accent`, `hover:bg-accent-hover`, min-height 46px, a 2px darker inset edge at the bottom that drops on hover. Use one per screen (the hero email).
- **Secondary button:** transparent, `border-line-strong`, min-height 44–46px.
- Both buttons sink 1px while pressed (`active:translate-y-px`).
- **Header:** a `Row` pinned with `sticky top-0`. The band is `bg-bg/80`, the cell `bg-panel/90`, both under backdrop blur, with the bottom hairline and nodes. From `md` up it is one row: wordmark, nav, language switch. On phones it is two rows: wordmark and language switch on row 1, nav on row 2. `html { scroll-padding-top }` (104px on phones, 72px from `md`) keeps anchor jumps below it. Update both values if the header height changes.
- **Language switch:** a bordered pair `EN | VI`. The current locale is a non-link with `aria-current`. The other locale is a `Link` with `hrefLang` and `lang`.
- **Bullets:** a mono `+`, coloured `--accent-edge` for the current role and `--dim` for past roles.
- **External link:** mono text plus a 13px stroke arrow icon (inline SVG, `aria-hidden`). The arrow nudges up and right on hover.
- **Work and skill cells** take `--panel-hover` on hover (300ms colour transition).
- **Contact:** the email set large (`clamp(24px, 3.4vw, 40px)`) with an underline in `--accent-rule`, then secondary buttons.
- **Hero background** (`HeroBackdrop` in `portfolio.tsx`), behind the hero text, `aria-hidden`, no pointer events. Centred exactly on the hero, never offset:
  - a fine **grid** of 24px cells (`.hero-grid`, pale amber at 5%). The grid box is 2400px (100 cells), so grid lines cross exactly at the centre;
  - seven **overlapping diamonds** (the node motif), each 11% smaller than the last and offset 13° from it. They turn slowly against each other (alternate layers reverse), each at its own pace (70s to 166s a turn), so their crossings keep shifting. There is a small fixed diamond at the centre. Strokes stay 1px (`non-scaling-stroke`), `--heading` at 16%.
  - The whole layer fades out radially from the centre and stays faint: it sets a mood and never competes with the text. On phones it drops to 60% opacity.
  - Do not add text, logos or data to it.
- **Gradients:** only three, all amber and faint: the radial glow at the bottom left of Contact, a bottom-up wash in the hero (6%), and the hatch. Add no others.
- **Motion** (all in `globals.css`, all switched off under `prefers-reduced-motion`). Add no other animation without updating this list:
  1. `animate-rise`: hero children fade up 14px over 0.9s on `--ease-out-expo`, staggered 90ms by `[--i:n]` (kicker, name, summary, currently, buttons).
  2. `spin-layer`: each hero diamond turns once per its own duration, linear, around its centre. Its resting angle lives in `transform` (`--a`) and the animation turns `rotate`, so the two compose. With reduced motion they stand still at their resting angles.
  3. `caret`: a blinking block caret (`--accent-edge`) at the end of the hero's *currently* line. Together with the hero diamonds it is one of only two looping animations; it is not a terminal and gets no prompt or typed text.
  4. `reveal`: headings and blocks below the fold fade up 18px as they scroll in, driven by `animation-timeline: view()` over a fixed 200px (so tall blocks on phones are not left half-faded). Browsers without scroll timelines show them unanimated. Never put `reveal` on an element whose borders touch the column edges; put it on the content inside the cell instead.
  5. Micro-interactions: button press, cell hover, arrow nudge, nav colour transitions.

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
- The original pale-blue palette and diamond nodes were **replaced** by amber and `+` marks so the site does not read as a copy of zed.dev. Newsreader was kept: serif italic headings are a common style, not Zed's alone.
- Light "paper" directions (editorial, Swiss, letter) were explored and **rejected** as too plain. The site stays dark.
- The light-only rule from the original CV style guide is intentionally overridden for the website. The PDF CV keeps its own light style.
