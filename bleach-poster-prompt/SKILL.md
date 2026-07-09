---
name: bleach-poster-prompt
description: Create or refine prompts for BLEACH / 死神 poster-style image generation, especially silhouette-filled narrative compositions, group-cast posters, poster text systems, vertical composition, watercolor-cinematic fusion, and prompt variants with or without title text or richer color palettes.
---

# Bleach Poster Prompt

Use this skill when the user wants a high-end prompt for a BLEACH / 死神 poster, especially:

- silhouette-fill narrative compositions
- group-character poster layouts
- vertical movie-poster framing
- watercolor + paper-grain + cinematic fusion
- poster text systems, captions, or title placement
- richer color palettes instead of only dark tones

## Workflow

1. Identify the desired subject, focal character, and whether the poster should emphasize solo heroism or group cast energy.
2. Lock the composition first: outer silhouette, inner world-building, and where text will live.
3. Build the prompt from the inside out:
   - subject silhouette
   - character群像
   - world-setting symbols
   - palette and texture
   - poster typography system
   - negative constraints
4. If the user gives a vague brief, default to BLEACH-consistent choices that are immediately recognizable:
   - 黑崎一护侧脸剪影 as the main contour
   - 朽木露琪亚、石田雨龙、茶渡泰虎、井上织姬、阿散井恋次、朽木白哉、蓝染惣右介 as core supporting cast
   - 尸魂界、静灵庭、虚圈、黑腔、斩魄刀、灵压、面具碎片, and the conflict between守护与对峙
5. Decide the text strategy:
   - no title, only poster-style side text and info blocks
   - bottom title text
   - vertical Japanese-style slogan plus corner metadata
6. Set the color rule early:
   - default to a richer, more varied palette unless the user explicitly asks for monochrome or very dark tones
   - keep the palette coherent, but allow luminous gold, sakura pink, cobalt blue, teal glow, violet haze, and small crimson accents when the theme supports it
   - avoid making every BLEACH poster collapse into the same black-and-blue look

## Prompt Formula

Read `references/prompt-formula.md` for the reusable prompt blueprint and the exact ordering that works best.

## Output Expectations

- Produce one polished prompt unless the user explicitly asks for variants.
- Keep the prompt visually specific and avoid generic fantasy wording.
- Make all elements strongly theme-bound; do not add unrelated decorative clutter.
- Prefer richer color diversity by default; only push the palette toward near-monochrome when the user explicitly wants that mood.
- Include a compact negative prompt when it helps control composition.
