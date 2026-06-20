# Zegon Landing

**▶ Landing:** [zegon-landing.vercel.app](https://zegon-landing.vercel.app) · **Play (dapp):** [zegon-dapp.vercel.app](https://zegon-dapp.vercel.app) · [Zegon-DApp repo](https://github.com/Zegon-Labs/Zegon-DApp)

Official landing page for **ZEGON**, a pixel-art duel against a blind AI built on 0G for the Zero Cup hackathon.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_GAME_URL` | Game (dapp) URL. Default: `https://zegon-dapp.vercel.app` |

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- shadcn/ui (new-york)
- Design system from [Zegon-DApp](../Zegon-DApp)

## Assets

Visual reference assets live in `Public/` (not used at runtime on the landing page).
