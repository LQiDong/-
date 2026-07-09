# Design System: Redoyanul Haque Portfolio

Source URL: https://red1-for-hek.vercel.app/#  
Extraction method: `website-to-design-md` workflow with live `agent-browser eval` evidence.

## 1. Visual Theme & Atmosphere

The site is a dark, cinematic AI-developer portfolio with a black-purple foundation, lavender highlights, and kinetic typography. It feels more like an interactive motion reel than a static resume: text splits into characters, navigation labels duplicate on hover, sections occupy full viewport bands, and work cards sit inside a long scroll narrative.

- Overall feeling: futuristic, personal, technical, slightly theatrical.
- Visual density: medium-high; large whitespace at hero scale, then compact project and tech stacks.
- Brand posture: individual craftsperson, AI engineer, full-stack builder.
- Signature motifs: split-character animation, purple accent text, custom cursor, marquee-like duplicated nav labels, dark surfaces with faint glass cards.
- Opening visual: after load, the first viewport includes a full-screen WebGL canvas (`1254×564` desktop observed) that carries the robot/3D scene behind the hero identity.

### Key Characteristics

- Nearly black page base with soft violet/lavender type accents.
- A WebGL/3D robot canvas anchors the loaded homepage; treat it as a signature hero layer, not as incidental decoration.
- Full-screen section rhythm: hero, about, work, tech stack, contact.
- Text animation is central; many words are split into `.split-char` and `.split-line` spans.
- Cards and tech chips use low-opacity white fills instead of strong shadows.
- Navigation is restrained but animated: duplicated label text creates a rolling hover feel.

## 2. Color Palette & Roles

| Role | Semantic Name | Value | Usage |
| --- | --- | --- | --- |
| Page background | Void Black | `#0B080C` / `rgb(11, 8, 12)` | Body and contact section background. |
| Primary text | Lavender White | `#EAE5EC` / `rgb(234, 229, 236)` | Main copy, nav, headings. |
| Soft accent | Intro Lavender | `#C2A4FF` / `rgb(194, 164, 255)` | Hero intro text such as “Hello! I’m” and “An”. |
| Strong accent | Electric Violet | `#C481FF` / `rgb(196, 129, 255)` | Hero role headline, emphasis words. |
| Hot accent | Neon Pink | `#FB8DFF` / `rgb(251, 141, 255)` | Decorative highlight and lively accent states. |
| Deep accent | Saturated Purple | `#AA42FF` / `rgb(170, 66, 255)` | Strongest purple accent and highlight candidate. |
| Muted text | Silver Gray | `#ADACAC` / `rgb(173, 172, 172)` | Secondary or supporting text. |
| Card surface | Ghost White | `rgba(255,255,255,0.03)` | Tech-stack cards and faint UI surfaces. |
| Border | Soft White Ring | `rgba(255,255,255,0.1)` | Tech cards, subtle dividers. |

### Primary

- Use `#0B080C` as the site-wide base, not a blue-black or flat pure black.
- Use `#EAE5EC` for readable foreground text and nav labels.
- Use violet accents sparingly but prominently: role names, keywords, active states.

### Interactive

- Links are usually text-first, with motion or duplicated-label treatment rather than filled buttons.
- Tech chips use a faint white surface and a 1px translucent border.
- CTA button style can use dark/transparent surfaces with lavender text, or white text with a subtle violet hover.

### Neutral Scale

- `#0B080C`: page base.
- `rgba(255,255,255,0.03)`: low card fill.
- `rgba(255,255,255,0.1)`: border/ring.
- `rgba(255,255,255,0.6)` and `#ADACAC`: secondary copy.

### Theme Modes

Only a dark mode was observed. Do not infer a light theme.

#### Dark Mode

- Background: `#0B080C`.
- Surface: translucent white layers over black.
- Text: lavender white, gray secondary.
- Accent: lavender and violet.
- Notes: preserve high contrast without switching to pure white surfaces except for deliberate highlight moments.

### Shadows & Depth

- Depth is mostly created through opacity, scale, transform, blur, and animation rather than heavy shadows.
- Tech cards have no visible shadow; they rely on `rgba(255,255,255,0.03)` fill plus `rgba(255,255,255,0.1)` border.
- Motion depth appears in text reveal and scroll-driven transforms.

## 3. Typography Rules

### Font Family

- Primary: `Geist, sans-serif`.
- Secondary observed: `Noto Sans SC` appears in font stacks, likely available for fallback/mixed text.
- OpenType feel: clean geometric sans, modern developer aesthetic.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Hero name | Geist | ~40px desktop observed | 500 | 35px | normal | Uppercase personal name, split-character animation. |
| Hero role | Geist | 55px desktop / 20px mobile observed | 600 | 42px desktop / 30px mobile | 2px desktop | Violet role text, horizontal oversized treatment. |
| Intro eyebrow | Geist | 25px | 300 | 37.5px | normal | Lavender text: “Hello! I’m”, “An”. |
| About paragraph | Geist | ~23.8px | 600 | ~28.8px | 0.5px | Dense, bold, character-split narrative paragraph. |
| Nav link | Geist | 16px desktop / 11px mobile | 600 | 24px desktop / 16.5px mobile | 0.8px | Duplicated label text for hover animation. |
| Body / default | Geist | 16px | 400 | 24px | normal | Global baseline. |
| Logo | Geist | 18px desktop / 13px mobile | 700 | 27px / 19.5px | 0.2px | Compact initials mark. |

### Principles

- Typography should feel animated and constructed, not editorially soft.
- Large words can be split into characters/lines for motion, but final readable forms must remain clear.
- Use uppercase for name, project labels, and strong navigational cues.
- Keep accent text violet; avoid introducing many unrelated accent colors.

## 4. Component Stylings

### Navigation

- Header is a flexible full-width row with centered email and compact initials logo.
- Desktop header observed at `1179px × 97px`, padding `35px 0`, margin-bottom `-80px`.
- Mobile header compresses to `360px × 92px`, padding `15px 0`.
- Nav labels use duplicated text, e.g. `ABOUT ABOUT`, `WORK WORK`, `CONTACT CONTACT`, creating a vertical roll/hover metaphor.
- Resume button becomes a tall vertical element on mobile, observed around `17px × 107px`.

### Hero

- First viewport is full-height, dark, and text-led.
- Structure: small lavender intro, uppercase name, then large violet role text.
- The hero role is the strongest brand element and can exceed container width on small screens for a kinetic feel.
- The loaded hero includes a full-viewport WebGL canvas, observed as one visible `canvas` with WebGL context and dimensions `1254×564`. This appears to host the robot/3D scene; preserve it as a background/companion layer for the personal identity rather than replacing it with static illustration.

### Robot / WebGL Hero Layer

- Use a single full-viewport canvas pinned to the first screen.
- The canvas should sit behind or alongside the hero copy, using the same black-purple atmosphere.
- The robot/3D object should feel technical and cinematic, with subtle motion rather than game-like interaction.
- Keep text readable over the canvas by using dark negative space, controlled opacity, or a faint vignette.
- If rebuilding without WebGL, use a high-quality rendered robot image/video fallback, but keep the visual role: an AI-agent presence that introduces the portfolio before the rest of the scroll narrative.

### Buttons and Links

- Primary text links are unboxed; motion supplies affordance.
- Strong CTA pattern observed: “See All Works →” around `193px × 54px`, padding `15px 35px`, medium weight.
- Hover should feel smooth and animated rather than changing to a heavy filled state.

### Cards and Containers

- Tech stack items: `rgba(255,255,255,0.03)` fill, `1px solid rgba(255,255,255,0.1)`, `10px` radius.
- Desktop tech chip observed around `73px × 86px`, padding `8px`.
- Mobile tech chip observed around `52px × 62px`, padding `5px`.
- Work cards are visual/image-led; text sits in the project section rather than inside heavy white cards.

### Image Treatment

- Imagery should be dark-compatible and integrated into the black/purple atmosphere.
- Project previews can be cropped, animated, and partially masked.
- Avoid light gallery cards unless intentionally creating contrast.

### Distinctive Components

- WebGL robot scene: full-viewport canvas in the landing section; core signature of the loaded homepage.
- Custom cursor layer: `.cursor-main` follows pointer and reinforces motion identity.
- Split-character text: `.split-char` elements animate opacity, blur, and transform into place.
- Marquee infrastructure: `.rfm-marquee-*` styles suggest looping horizontal motion for repeated items.
- Tech stack grid: compact square chips with icons/labels on faint glass surfaces.

## 5. Layout Principles

### Spacing System

- Base rhythm is viewport-led rather than dense dashboard spacing.
- Sections commonly consume one full viewport on desktop: landing, about, work.
- Header padding: desktop `35px 0`, mobile `15px 0`.
- Tech chips: `8px` desktop padding, `5px` mobile padding.

### Grid & Container

- Desktop content uses a centered max-width container around `1179px` inside a `1254px` viewport.
- Contact section observed with `900px` width and centered margins on desktop.
- Mobile sections collapse into vertical flex/block layouts around `360px` content width.

### Whitespace Philosophy

- Hero and section starts use strong vertical drama.
- Text blocks can be dense, but they are surrounded by large section-level breathing room.
- Motion helps separate content more than dividers do.

### Border Radius Scale

- Micro: 0px for global/typographic elements.
- Standard card: `10px` for tech chips.
- Large panels: use sparingly; the observed design leans rectangular and motion-led.
- Pill: acceptable for CTAs, but not the dominant shape language.

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | `#0B080C` background, no border | Page and section base. |
| Faint surface | `rgba(255,255,255,0.03)` + 1px white border | Tech stack cards and small UI blocks. |
| Motion depth | transform, opacity, blur transitions | Hero text, scroll reveals, hover labels. |
| Focus/active | violet accent color or text motion | Links, role text, interactive cues. |

### Depth Principles

- Prefer transform-based depth over drop shadows.
- When a card is needed, keep it dark/translucent.
- Use blur and opacity for entrance animation, not permanent haze.
- Keep the page background stable; let foreground text and cards animate.

## 7. Do's and Don'ts

### Do

- Use Geist or a close geometric sans.
- Keep the base nearly black and the accent family purple/lavender.
- Use character/line animation for large hero and section text.
- Use faint glass cards for tech or metadata chips.
- Preserve the full-screen scroll rhythm.

### Don't

- Do not replace the mood with bright SaaS white cards.
- Do not overuse gradients; the observed site relies more on dark base + violet text.
- Do not make nav feel corporate; keep it compact, kinetic, and text-driven.
- Do not use heavy shadows for every surface.
- Do not add unrelated green/orange accent families.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Mobile | ~390px observed | Header compresses, nav text shrinks to 11px, hero becomes taller than viewport, work section stacks vertically. |
| Tablet | Inferred 768-1024px | Keep dark hero rhythm, reduce oversized text, stack project cards earlier. |
| Desktop | 1254px observed | Full-width container, 97px header, one-screen hero/about/work sections. |

### Touch Targets

- Maintain at least 44px height for CTAs on mobile.
- Nav labels may be visually small, but tappable wrappers should remain larger than the text.

### Collapsing Strategy

- Desktop: horizontal/centered nav, large viewport-led sections.
- Mobile: keep nav visible but tiny; stack work cards and tech chips.
- Long work section is acceptable on mobile; observed mobile scroll height is ~9312px.

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary CTA / accent: `#C481FF`.
- Background: `#0B080C`.
- Heading text: `#EAE5EC`.
- Accent intro: `#C2A4FF`.
- Card fill: `rgba(255,255,255,0.03)`.
- Border: `rgba(255,255,255,0.1)`.

### Quick Summary

Build a dark AI-developer portfolio with a black-purple base, lavender-white type, and kinetic typography. Use Geist, uppercase hero naming, split-character text reveals, subtle translucent cards, and minimal borders. The page should feel like an animated technical identity reel rather than a conventional resume. Keep surfaces dark, motion smooth, and accents confined to violet/lavender.

### Example Component Prompts

- Hero: “Create a full-viewport dark hero with a compact lavender intro, uppercase name in lavender-white, and a large violet role line using split-character reveal motion.”
- Navigation: “Build a compact header with initials, centered email, and duplicated nav labels that roll on hover.”
- Tech card: “Use a 10px-radius translucent card with `rgba(255,255,255,.03)` fill, `1px rgba(255,255,255,.1)` border, centered icon/label, and a soft 0.3s hover.”
- Work section: “Make project previews image-led and motion-led, avoiding bright card surfaces; pair each project with a numeric index and compact technology line.”

### Ready-to-Use Prompt

Design a personal AI engineer portfolio in the style of Redoyanul Haque’s site: black-purple `#0B080C` background, Geist typography, lavender-white text, violet role accents, full-screen scroll sections, split-character text animation, compact animated nav, low-opacity glass tech chips, and image-led work previews. Keep the UI cinematic, technical, and motion-first.

### Iteration Guide

1. First match the atmosphere: dark base, violet accents, animated typography.
2. Then match component details: nav label duplication, faint cards, 10px tech-chip radius.
3. Finally tune motion: text should reveal cleanly with opacity/blur/transform, not bounce or feel playful.

## Optional Appendix: Interaction Patterns

- Scroll behavior: full-page narrative with smooth/Lenis-style scrolling; observed `html` class includes `lenis`.
- Hover behavior: nav labels duplicate and likely roll; tech cards transition over `0.3s`.
- Click behavior: nav anchors jump to `#about`, `#work`, `#contact`; resume is a separate CTA.
- Animation tone: crisp, cinematic, developer-portfolio polish.

## Optional Appendix: Content & Messaging Patterns

- Headline pattern: personal greeting → uppercase name → professional role.
- CTA language: direct and work-oriented, e.g. “See All Works →”.
- Voice: technical, personal, confident, AI-focused.
- Trust signals: project list, tech stack, contact/social links.

## Optional Appendix: Observed Pages

- `https://red1-for-hek.vercel.app/#`: single-page AI developer portfolio; supplied typography, colors, section structure, motion clues, component styling, desktop and mobile responsive behavior.

## Evidence Notes

- Observed with `agent-browser` desktop viewport `1254×564`, document height `6442px`.
- Rechecked the loaded homepage state after user note: one visible WebGL canvas was observed at `1254×564`, confirming the robot/3D hero layer was a real rendered surface and not only a static DOM section.
- Observed mobile viewport `390×844`, document height `9312px`.
- Exact values above are direct computed-style evidence unless marked inferred.
- No light mode was observed.
