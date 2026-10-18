---
name: Rich Anthill
description: A nature documentary shot at ant height; the scroll is the camera, certainty is focus.
colors:
  soil: "#17110c"
  soil-2: "#221a13"
  soil-3: "#2e241b"
  deep-soil: "#0f0b08"
  ash: "#e2e1da"
  ash-2: "#d3d1c8"
  bone: "#ece6da"
  bone-2: "#b3aa9c"
  bone-3: "#8a8174"
  line: "#3b3027"
  ink: "#17110c"
  ink-2: "#4d453d"
  ink-3: "#5c544a"
  line-ash: "#b9b6ab"
  ant: "#e0612b"
  ant-ash: "#9a3510"
  lichen: "#b7c48a"
  lichen-ash: "#465418"
typography:
  hero:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.625rem, 1.4rem + 5.4vw, 6rem)"
    fontWeight: 330
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "\"opsz\" 72"
  display:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.125rem, 1.35rem + 3.3vw, 4.5rem)"
    fontWeight: 320
    lineHeight: 1.04
    letterSpacing: "-0.03em"
    fontVariation: "\"opsz\" 72"
  title:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.625rem, 1.25rem + 1.5vw, 2.625rem)"
    fontWeight: 340
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "\"opsz\" 72"
  narration:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.375rem, 1.1rem + 1.15vw, 2.125rem)"
    fontWeight: 340
    lineHeight: 1.22
    letterSpacing: "-0.012em"
    fontVariation: "\"opsz\" 48"
  lead:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.1875rem, 1.06rem + 0.5vw, 1.4375rem)"
    lineHeight: 1.42
    fontVariation: "\"opsz\" 24"
  read:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "1.125rem"
    lineHeight: 1.55
    fontVariation: "\"opsz\" 16"
  body:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  ui-small:
    fontFamily: "Golos Text, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.2
  data:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0"
  data-s:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  none: "0"
  chip: "1em"
  mark: "50%"
spacing:
  s-1: "0.25rem"
  s-2: "0.5rem"
  s-3: "0.75rem"
  s-4: "1rem"
  s-5: "1.5rem"
  s-6: "2rem"
  s-7: "3rem"
  s-8: "4rem"
  s-9: "6rem"
  s-10: "9rem"
  s-11: "12rem"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.soil}"
    typography: "{typography.ui-small}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "2.875rem"
  button-secondary:
    textColor: "{colors.bone}"
    typography: "{typography.ui-small}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "2.875rem"
  latest-day-control:
    textColor: "{colors.bone}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: "0 0.75rem"
    height: "2.5rem"
  latest-day-control-hover:
    backgroundColor: "{colors.soil-2}"
  citation-chip:
    textColor: "{colors.bone-2}"
    typography: "{typography.data-s}"
    rounded: "{rounded.chip}"
    padding: "0.05em 0.4em 0.1em"
  citation-chip-open:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.soil}"
  stand-in-super:
    textColor: "{colors.bone}"
    typography: "{typography.data-s}"
    rounded: "{rounded.none}"
    padding: "3px 7px 4px"
  reel-slate:
    backgroundColor: "{colors.soil-2}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    width: "min(100%, 18rem)"
  reading-sheet:
    backgroundColor: "{colors.ash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
---

# Design System: Rich Anthill

## Overview

**Creative North Star: "The Camera at Ant Height"**

The site is a nature documentary that happens to scroll. Photographs own whole viewports, full-bleed on a warm soil ground; reading passages arrive as pale ash sheets laid over the footage, the way field notes sit on a bench beside the specimen. The only chrome is the chrome a camera crew would put on screen: viewfinder corner ticks, a broadcast super disclosing every stand-in, Martian Mono camera data, focus marks and citation chips. Narration is set large and light in Literata at display optical size, sentence case, and reads like a voice-over rather than a headline.

Certainty is expressed as focus. What the reels confirm is sharp and lichen-green; what people report is a touch soft (a faint offset second image) and ant-red; what nobody knows is out of frame, drawn as dashed empty boxes and rings. The mark always repeats the words; it never replaces them. Light is narrative state: surface soil for the descent, the deeper soil of "Out of sight" for the underground passage, an ash sheet for the log, a daylight frame for the close.

The world explicitly replaced a rejected print/ledger world (docs/07-redesign.md). It refuses the ledger, the form, the SaaS page, black-and-gold luxury, and the stock nature-site stack of hero, card grid and stats; also glass, decorative gradients and rounded cards (docs/03-design-system.md section 1.5).

**Key Characteristics:**
- One dark scheme on warm umber soil; light arrives only as ash reading sheets and photographs.
- One accent, ant red, reserved for state: latest day, reported, recording, current page, the open question.
- Three faces with fixed jobs: Literata narrates, Martian Mono records camera data, Golos Text runs the interface.
- Square corners everywhere; circles only for focus marks, tally lights and the citation chip pill.
- Motion is camera movement on CSS scroll timelines; every scene reads as a static stack with motion off.

## Colors

A warm, near-monochrome umber ground with tinted bone inks, one ant-red accent and one lichen confirmation colour, each with a twin tuned for the ash sheet.

### Primary
- **Ant-Body Red** (ant): the subject's own colour and the only accent. Marks the latest day's tally light, "reported" status, the recording light, the current-page dot and bar in navigation, the "New" tag, text selection on soil, the focus ring, and the italic open line of a headline ("Outcome unknown."). 5.3:1 on soil.
- **Fired Ant Red** (ant-ash): the same role on ash sheets, darkened to 5.5:1. Also the focus ring inside a sheet.

### Secondary
- **Lichen** (lichen): confirmed-in-reel status on soil. 10:1.
- **Deep Lichen** (lichen-ash): confirmed status on ash. 6.3:1.

### Neutral
- **Umber Soil** (soil): the ground for footage, narration, header and bottom bar.
- **Raised Soil** (soil-2): photo placeholders, reel slates, hover panels, the open citation panel.
- **Turned Soil** (soil-3): hover on soil.
- **Underground** (deep-soil): the deepest ground, used only where the light drops (the "Out of sight" passage, the band the log sheet rises from, the 404 frame).
- **Field Ash** (ash) and **Ash Rule Ground** (ash-2): reading sheets and raised areas on them.
- **Bone** (bone): primary text on soil; also the primary button fill and the viewfinder ticks.
- **Weathered Bone** (bone-2): secondary text on soil, 8:1. **Dust** (bone-3): tertiary text, dashed empty states, and outlined control borders, 4.9:1.
- **Root Line** (line): 1px hairlines on soil. Rules only, never text.
- **Ink** (ink), **Ink 2** (ink-2), **Ink 3** (ink-3): text on ash at 14.3 / 7.2 / 5.7:1. **Ash Line** (line-ash): hairlines on ash.

### Named Rules
**The Subject's Colour Rule.** Ant red marks state, never decoration. If a red element does not mean latest, reported, recording, current or open, it should not be red.

**The Twin Ink Rule.** Every status colour has a soil value and an ash value; inside `.sheet`, components swap to the ash twins (ant-ash, lichen-ash, ink-2) through local custom properties. Never place a soil-tuned accent on ash.

**The Tinted Grey Rule.** Secondary text tints from its ground (bone on soil, ink on ash); there is no neutral grey in the system.

## Typography

**Display Font:** Literata, variable with an optical-size axis (with Iowan Old Style, Georgia)
**Body Font:** Golos Text (with system-ui)
**Label/Mono Font:** Martian Mono (with ui-monospace)

**Character:** A light, book-like serif at display optical size carries the narration with the calm of a voice-over; a precise mono carries only what a camera would burn in or a scientist would cite; a plain grotesque handles buttons and navigation and stays out of the way.

### Hierarchy
- **Hero** (330, 2.625rem to 6rem, 0.98): the opening narration lines in the descent and the 404 title (300). Tracking -0.035em, opsz 72.
- **Display** (320, 2.125rem to 4.5rem, 1.04): section titles such as the colony sheet and the log. Tracking -0.03em.
- **Title** (340, 1.625rem to 2.625rem, 1.04): sub-section and beat titles. All h1 to h4 default to Literata 340, opsz 72, -0.02em, balanced wrap.
- **Narration** (340, 1.375rem to 2.125rem, 1.22, opsz 48): the beats that follow the opening, measure 40 to 44ch.
- **Lead** (1.1875rem to 1.4375rem, 1.42 to 1.45, opsz 24): intros under section titles, measure 34 to 42ch.
- **Read** (1.125rem, 1.55, opsz 16 to 24): Literata reading text on sheets, measure under 64ch.
- **Body** (Golos 400, 1rem, 1.6): interface prose and table cells. **UI small** (Golos 500 to 600, 0.875rem): buttons, nav links.
- **Data** (Martian Mono 400, 0.8125rem, 1.45) and **Data small** (0.6875rem, 1.4): day codes, dates, focus labels, supers, citations, the gauge. Never uppercase.
- **Day numeral** (Literata 250, clamp up to 8 to 9rem, 0.8 to 0.82, -0.05em, lining numerals): the frame number in the day strip and on the day page; italic in bone-3 for days not yet filmed.

### Named Rules
**The Voice-Over Rule.** Narration is sentence case, light (250 to 340), at opsz 72 for display sizes. No caps, no bold headlines.

**The Camera Data Rule.** Martian Mono is for data a camera or a citation would carry (day, date, status, super, source). It is never a costume for prose and never a label invented to sit above a heading.

**The Open Line Rule.** The unknown line of a headline sets in Literata italic, weight 300, in ant red, so it reads as the live question rather than a fact.

## Layout

A 4px-based spacing scale (s-1 4px to s-11 192px), with more space above a heading than below. Page margins step 16 / 24 / 40 / 56px at 0 / 600 / 900 / 1280px; gutter 16px, then 24px from 900px; content max 1440px inside `.wrap`. Header height 56px (64px from 900px); below 900px a fixed 60px bottom bar plus safe area never hides, and full-bleed stages size to 100svh minus header and bottom bar.

Compositions are cinematic rather than modular: full-bleed pinned stages (the descent, the day strip); a held frame with an ash sheet scrolling over it (the colony, the underground plates); alternating frame-and-text beats underground; ash sheets inset from the soil (the log, science); protocol columns on the experiment page. Reading measure stays under about 44ch in narration and about 62ch in protocol text.

The viewfinder is part of the grid: frame inset 12 / 18 / 24px and tick length 18 / 24px, both stepping with the breakpoints.

## Elevation & Depth

Depth comes from photography, light and layering, not from UI shadows. The ground is flat; the only lifted surfaces are ash sheets laid over footage or deep soil, which carry one long, soft, downward ambient shadow, as if paper sits a few centimetres above the ground. Photographs get a soil scrim (a bottom-up soil gradient plus a 22% soil wash) only where narration must stay legible over them.

### Shadow Vocabulary
- **Sheet over footage** (`box-shadow: 0 24px 60px -20px rgb(0 0 0 / 0.55)`, 0.6 underground): an ash sheet sliding over a held frame.
- **Sheet over deep soil** (`box-shadow: 0 30px 70px -30px rgb(0 0 0 / 0.6)`): the log sheet rising from the underground band.
- **Reported halo** (`box-shadow: 0 0 3px 2px` ant at 45%): the soft glow on a reported focus mark; it is the mark, not elevation.
- **Current frame** (`box-shadow: inset 0 0 0 1px` bone): doubles the 1px border of the current day cell.

### Named Rules
**The Paper Over Ground Rule.** Only ash sheets cast shadows, and only soft, long, downward ones. No hard offset shadows, no shadows on buttons, frames or slates.

## Shapes

Square-cornered throughout: frames, sheets, slates, buttons, the latest-day control, supers and the "New" tag all sit at 0 radius. Panels are either frames (1px rules in line or bone-3) or sheets (ash); there are no cards. Circles appear only as optical marks: 9px focus marks, 7px tally and recording lights, the 4px current-page dot. The one pill is the citation chip (1em radius), a reference mark in the margin. Empty and unknown states are drawn with 1px dashed borders. The viewfinder ticks are eight 1px hairlines of bone at 80 to 85% opacity, inset from the frame edge.

## Components

### Buttons
Solid and quiet, like a slate held up to the lens.
- **Shape:** square (0).
- **Primary:** bone fill, soil text, Golos 600 at 0.875rem, 2.875rem tall, 1.5rem side padding.
- **Secondary:** transparent with a 1px bone border at 60%, bone text; hover firms the border to full bone and lays a 60% soil wash.
- **Hover / Focus:** 120ms colour and border transitions; the play button presses to scale(0.98). Focus is a 2px ant outline at 3px offset (ant-ash inside sheets).

### Chips
- **Style:** the citation chip, Martian Mono 0.6875rem, 1px currentColor border, 1em radius, bone-2 ink, raised 0.25em in the line.
- **State:** expanded fills with bone and inverts to soil text; the panel it opens has a 1px left rule, a soil-2 ground, Golos 0.875rem, and limits in ant red. On ash it swaps to ink, ash-2 and ant-ash.

### Cards / Containers
There are no cards. Two container types exist:
- **Frame:** a photograph with viewfinder ticks and an on-frame caption row; square, clipped, bone text.
- **Reading sheet:** ash ground, ink text, square, generous padding (s-6 to s-7), the sheet shadows from Elevation.

### Navigation
- **Header:** sticky soil bar with a 1px line rule. Wordmark in Literata 450 at 1.1875rem with a Martian Mono subline in bone-2. Top links are Golos 500, 0.875rem, bone-2, turning bone on hover and on the current page, which also gets a 4px ant dot beneath the label.
- **Latest-day control:** Martian Mono data text, 1px bone-3 border, a 7px ant tally light; hover firms the border to bone and lays soil-2.
- **Mobile:** a fixed four-item bottom bar (60px plus safe area), Golos 500 at 0.6875rem; the current item gets a 2px ant bar along the top edge; press lays soil-2.

### Stand-in Super (signature)
The disclosure every stand-in photograph carries on the frame itself: "Stand-in photograph · other ants, not this colony", in Martian Mono data-small on an 82% soil strip, padding 3px 7px 4px. On full-bleed stages where narration and actions own the lower half (descent, colony, underground entry, next day) it sits top-left; on contained plates it sits in the bottom caption row, with an optional second note in bone-2 on the same strip. A crop or screenshot keeps the disclosure.

### Status Label (signature)
Martian Mono 0.8125rem words led by a 9px focus mark on the baseline: confirmed is a solid lichen dot; reported a solid ant dot with a soft halo; published study a ring with a centre dot; open question two offset rings; unknown an empty dashed ring. Display text for reported and open-question claims carries the Registration treatment: a faint second image drawn from a `data-soft` attribute, offset 0.05em (0.09em for open questions), blurred and at 36 to 42% opacity, so the words exist once in the DOM.

### Reel Slate (signature)
A 9:16 soil-2 slate with a 1px line border standing in for an Instagram reel until the visitor asks for it: day code in mono, the food mark centred (ant for reported, lichen for confirmed, bone-3 for unknown), the food in Literata 1.5rem, caption metadata above a 1px rule, and a bone play bar with a CSS triangle. Gone or failed reels switch to a dashed bone-3 border and a plain Instagram link.

### Day Strip (signature)
Days as film frames: square cells with 1px borders, a large light Literata numeral, the latest day lit by a 7px ant tally light, the current day doubled with an inset bone ring, empty future days as dashed frames, and a mono "New" tag in ant on soil above a fresh frame. The recording light blinks on a 2.4s stepped cycle.

## Do's and Don'ts

### Do:
- **Do** set every surface on soil and lay reading passages on ash sheets with the `.sheet` class so focus, selection and status inks swap to their ash twins.
- **Do** put the stand-in super on every stand-in frame, on the frame itself, never in a caption below it.
- **Do** say every status in words and repeat it with its focus mark; draw unknowns as dashed, empty frames and rings.
- **Do** keep motion to transform, opacity and clip-path on CSS scroll timelines, inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`; UI transitions are 120ms, reveals 520ms on the ease-out curve (cubic-bezier(0.23, 1, 0.32, 1)), the descent dollies on cubic-bezier(0.45, 0, 0.4, 1).
- **Do** keep body text at 4.5:1 or better and pick secondary text from the tinted bone or ink steps.

### Don't:
- **Don't** use ant red for decoration or emphasis that is not a state.
- **Don't** round frames, sheets, buttons or panels, and don't build cards or stat grids.
- **Don't** reduce photographs to halftones, masks or one-ink textures; they are full-colour and full-bleed.
- **Don't** set narration in caps or bold, and don't put Martian Mono labels above headings as eyebrows.
- **Don't** add glass, decorative gradients, or hard offset shadows; the only gradient is the legibility scrim over photographs.
- **Don't** burn timestamps or date stamps onto stand-in photographs; dates appear only on real, dated reels.
