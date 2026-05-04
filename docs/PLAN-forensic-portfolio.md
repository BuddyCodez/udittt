# PLAN: Forensic Developer Portfolio

## 1. Context & Objectives
- **Goal**: Build a personal portfolio for Udit Vegad with a "Dexter/Forensic Analyst" aesthetic without the "serial killer" trope.
- **Vibe**: Precise, methodical, calm, controlled, "inner monologue".
- **Tech Stack**:
  - Frontend: TanStack Start, React, Tailwind CSS.
  - Backend: Hono (for API routes, Spotify/Discord integrations).
  - No Database (stateless fetching from external APIs).
- **Key Features**:
  - One-time initial loading screen (`> scanning environment...`).
  - Internal monologue toggle (`[ toggle: inner thoughts ]`).
  - Live Status Module (Spotify, Discord presence, current focus).
  - Clean, minimal design (deep black `#0a0a0a`, off-white text, muted red accents).
  - Sections: Hero, `/case-files` (Projects), `/profile` (About), `/tools` (Tech Stack), `/lab` (Experiments).

## 2. Architecture & Setup

### 2.1 Project Initialization
- Initialize TanStack Start framework.
- Setup Hono backend for API routing (can be integrated into TanStack Start API routes or run alongside).
- Configure Tailwind CSS with custom colors (`background: #0a0a0a`, `accent: #8b0000` or similar muted red).
- Setup fonts: Monospace (e.g., JetBrains Mono or Fira Code) for system text, Sans-serif (e.g., Inter or Geist) for headings.

### 2.2 Global State & Context
- **Inner Monologue Context**: React Context to track the state of the "inner monologue" toggle. When true, reveals hidden `<Monologue>` components across the site.
- **Boot Sequence State**: Use `sessionStorage` or a cookie to track if the user has seen the initial loading screen during this session.

## 3. Backend Integration (Hono)

### 3.1 Spotify Integration
- Hono route: `GET /api/spotify`
- Uses Spotify Developer API (requires Client ID, Secret, Refresh Token).
- Returns: Currently playing track, artist, album art, and playing status.

### 3.2 Discord Presence
- Hono route: `GET /api/presence`
- Uses Lanyard API (or Discord RPC wrapper) to fetch Discord status.
- Returns: Online status, custom status, current activity (e.g., "Playing Valorant", "Coding in VS Code").

## 4. UI Components & Pages

### 4.1 Loading Sequence Component
- Full-screen terminal-like overlay.
- Types out sequence:
  `> scanning environment...`
  `> analyzing components...`
  `> eliminating inefficiencies...`
  `> ready.`
- Fades out after ~1.5s. Only mounts if `sessionStorage.getItem('booted') !== 'true'`.

### 4.2 Layout & Navigation
- Top/Side minimal navigation (`/case-files`, `/profile`, `/lab`).
- Persistent "Live Status" widget in a corner (Spotify + Discord).
- Global "Inner Monologue" toggle switch (`[ toggle: inner thoughts ]`).

### 4.3 Hero Section (`/`)
- Minimal text:
  `Hello, I'm Udit.`
  `I build systems. Then I refine them until they don't fail.`
- Rotating sub-text component (`> observing patterns`, `> building quietly`, `> optimizing relentlessly`).

### 4.4 Case Files (`/case-files`)
- Project list populated from GitHub (or hardcoded data).
- Format:
  - **Case ID**: Project Name
  - **Problem**: What was broken/needed.
  - **Approach**: Analysis method.
  - **Solution**: What was built.

### 4.5 Profile & Tools (`/profile`)
- Clinical, report-style profile text.
- List of tools: Next.js, Node.js, Prisma, tRPC (rendered clean, no icons).

## 5. Polish & Verification
- Implement subtle typing effects for terminal text.
- Add fade transitions between pages.
- Ensure muted red is used *only* for highlights (hover states, active markers), not large blocks.
- **Verification**: Check performance (Lighthouse), ensure Spotify token refreshes correctly, verify responsive layout.

## 6. Execution Phases
1. **Phase 1**: Project Setup (TanStack Start + Hono + Tailwind).
2. **Phase 2**: Backend API Routes (Spotify + Discord).
3. **Phase 3**: Global Context & Loading Screen.
4. **Phase 4**: Core Pages & Routing (Hero, Case Files, Profile).
5. **Phase 5**: UI Polish (Inner monologue toggle, animations, color checks).
