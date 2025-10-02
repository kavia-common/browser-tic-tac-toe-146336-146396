# Tic Tac Toe Frontend (Nuxt)

A modern, minimal, and clean browser-based Tic Tac Toe game built with Nuxt 3 and Vue 3.

- Theme: Ocean Professional (Primary: #2563EB, Accent: #F59E0B)
- Features: Local 2-player, current turn indicator, win/draw detection, scoreboard, reset board, restart game
- UX: Subtle gradients, rounded corners, smooth transitions, minimal surfaces and shadows

## Setup

Install dependencies:

```bash
# npm
npm install
# yarn
yarn install
# pnpm
pnpm install
# bun
bun install
```

## Development

Start the dev server at `http://localhost:3000`:

```bash
# npm
npm run dev
# yarn
yarn dev
# pnpm
pnpm dev
# bun
bun run dev
```

## Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How to Play

- X starts first. Players alternate clicking empty cells.
- Win by getting 3 in a row (horizontal, vertical, or diagonal).
- Use Reset Board to clear the grid and alternate the starting player next round.
- Use Restart Game to clear the grid and scores (X starts again).

## Tech Notes

- Single page experience via `app.vue`.
- Score persists for the session using `sessionStorage`.
- No external CSS frameworks required; uses utility-like classes and lightweight CSS.
