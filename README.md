# Rich Anthill · a documentary at ant height

An independent concept site for [@rich_anthill](https://www.instagram.com/rich_anthill/) ("Ant Life Improvement Service"), a daily Instagram series in which the creator leaves food at one wild anthill and films it. Not made, endorsed or reviewed by the creator.

The site follows the series as a documentary: the scroll is the camera, descending from eye level to the food at ant height, then following the ants out of sight. It keeps what was given each day, what the reels show, what published science says, and what nobody knows yet. Every fact carries a status (confirmed, reported, not yet known, published study, open question), shown as focus: confirmed is sharp, reported is a touch soft.

- Brief: `docs/brief.md`
- Research, narrative, design system, interaction spec, architecture: `docs/01`–`05`
- Creative review that was approved before the first build: `docs/06-creative-review.md`
- Why the first world was replaced, and what changed: `docs/07-redesign.md`
- Product record: `PRODUCT.md`

## Run

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build:next     # validates content, then builds a fully static Next.js site
pnpm start          # serves that build
pnpm build          # OpenNext Cloudflare worker build (deploy: pnpm cf:deploy)
```

Checks:

```bash
pnpm validate       # content schema + cross-checks
pnpm typecheck
pnpm lint
pnpm test           # Vitest unit tests
pnpm test:e2e       # Playwright (desktop, mobile, reduced motion, axe) — run after `pnpm build:next`
pnpm photos         # rebuild the responsive photographs from assets/
```

Stack: Next.js 16 App Router (every route prerendered static; Cache Components is off because its render path hangs in workerd under @opennextjs/cloudflare 1.20.x), React 19, TypeScript, CSS Modules on `app/tokens.css`, CSS scroll-driven animations for the scroll choreography (no motion library; every scene has a static fallback), zod for content.

## Add a day

1. Watch the new reel.
2. Copy `content/episodes/day-00N.json` to the next number and fill it in.
   - `issued.status`: `confirmed` only if the reel shows it; `reported` if someone says so; `unknown` with `value: null` otherwise.
   - Leave `observations` and `measurements` empty rather than guess. A measurement needs a `method`.
   - `science` may only cite ids that are `publishable: true` in `content/sources.ts`.
3. Add one import line in `lib/episodes.ts`.
4. `pnpm validate && pnpm test`, then build and deploy.

The homepage headline, film strips, log, archive, sitemap and share images all update from the data.

## Replace a stand-in photograph

Every photograph on the site is a stand-in of other ants and says so in a super on the frame. To replace one with creator footage or a licensed image:

1. Put the file in `assets/`.
2. In `content/media.ts`, point the entry's `src` at it, update `alt`, set `credit` and `licence`, and change `role` to `reel-still` if it is from the series.
3. Add or edit the entry in `scripts/photos.mjs` and run `pnpm photos` (writes AVIF/WebP at four widths plus a soft focus layer to `public/media/photos/`).

`/experiment#standins` lists every stand-in, where it appears, and its licence status.

## Still needed before public launch

- **Creator permission** to use the name, reels and any footage.
- **Reel check:** exact words on Day 1 (sugar), what Day 2 shows, whether Day 3 is whey, quantities. Until then those stay "reported" or "not yet known".
- **Footage:** the seven shots listed at `/experiment#footage` (also `docs/05-site-architecture.md` §11).
- **Stand-in licences:** none of the 14 supplied photographs has a known source.
- **Sources:** S6, S10, S11 need primary-text checks before use.
- **Domain:** set `NEXT_PUBLIC_SITE_URL` for canonical URLs, sitemap and share images.

## Not used, on purpose

- The supplied 3D model (`assets/3D Ant Model`) is AI-generated (Tripo), static and unrigged. A photoreal ant would read as this colony, and the print world is flat. See `docs/05` §9.
- No smooth-scroll library and no motion library. Native scroll throughout; reduced motion unpins every scene.
- No analytics, no Instagram scripts until a visitor presses play.
