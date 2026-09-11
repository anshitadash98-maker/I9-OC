# I9-OC

A live campus scavenger hunt — GPS-verified point spawns, real-time leaderboards, and zero-cost infrastructure.

## Stack

- **Frontend:** React.js + Vite, styled with Tailwind CSS
- **Map visualization:** D3.js — renders the campus map and spawn points
- **Geofencing:** Turf.js — checks whether a player is within range of a spawn point to claim it
- **AI tooling:** Google AI Studio — used during development
- **Backend:** Supabase (auth, database, and point-claim logic — hosted, not custom server code in this repo)

This is the stack for the whole app — not every screen uses every
piece. The Leaderboard and Profile screens below only use React and
Tailwind; D3 and Turf.js are used by the map screen.

## Getting started

```bash
npm install
npm run dev
```

Opens the app at `http://localhost:5173`.

## Project structure

This is a standard Vite + React scaffold — most of the file count is
generated automatically and doesn't need to be hand-edited:

| Path | What it is | Touch it? |
|---|---|---|
| `src/` | All app source code — components, pages, styles. This is the frontend | Yes, this is where we build |
| `src/pages/` | Screen-level components, one file per screen | Yes |
| `src/assets/` | Images and other bundled assets used inside components | Yes, as needed |
| `public/` | Static assets served as-is | Only if adding assets |
| `index.html` | The single HTML page the whole React app mounts into | Rarely — just fonts/meta tags |
| `vite.config.js` | Build tool config (registers the React and Tailwind plugins) | Rarely, set up once |
| `eslint.config.js` | Code-style/linting rules | Rarely |
| `package.json` / `package-lock.json` | Lists every dependency and locks exact versions | Auto-updated by npm, don't hand-edit |
| `node_modules/` | Installed dependency code, regenerated from `package.json` | Never — `.gitignore`d, not pushed to GitHub |
| `.gitignore` | Files git should never track (like `node_modules/`) | Rarely |

No backend folder exists in this repo because the backend is Supabase
(hosted) rather than custom server code. If that changes, server code
would live in its own top-level `/server` folder, kept separate from
`src/`.

## Screens

### Leaderboard & Profile

Files: `src/pages/LeaderboardPage.jsx`, `src/pages/ProfilePage.jsx`

Matches wireframe frames **06 · Leaderboard** and **07 · Profile**.

- `LeaderboardPage.jsx` — segmented This week / All-time control,
  ranked list with top-3 highlighting, a "You" row pinned to the
  bottom of the screen
- `ProfilePage.jsx` — identity block, push-notifications toggle,
  claim history list

Both currently render from local mock data (documented with comments
above each constant in the file) so they can be reviewed before the
backend is ready. Swapping in real data later just means replacing
those constants with the result of a Supabase query.

Color palette used (from the shared wireframe):

| Token | Hex | Used for |
|---|---|---|
| `#E0672A` | Primary accent — buttons, active states, top-3 rank badges |
| `#FBEEE1` | Placeholder/avatar backgrounds |
| `#B5471B` | Text on tint backgrounds (pills, inactive labels) |
| `#241B16` | Primary text |
| `#8A7A6D` | Secondary/caption text |
| `#EDE1D3` | Hairlines and card borders |
| `#FBF6EE` | Screen background |

Headings use **Space Grotesk**, body text uses **Inter** (linked in `index.html`).

<!--
When you add your own screen, add a matching section here under
"Screens" — file name(s), which wireframe frame it matches, and
any data it expects. Keeps this README useful as the whole team adds
their parts.
-->