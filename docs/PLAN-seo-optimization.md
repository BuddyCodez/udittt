# PLAN: SEO & Favicon Optimization (Forensic Portfolio)

## 📌 Context
The portfolio currently lacks comprehensive SEO metadata across its various routes (`/`, `/profile`, `/case-files`, `/lab`, `/logs`). Additionally, the default favicon needs to be updated to match the analytical, forensic, and minimal aesthetic of the developer brand.

## 🎯 Objectives
1. Implement dynamic and route-specific SEO tags (Title, Description, OpenGraph, Twitter Cards).
2. Optimize `__root.tsx` to handle global fallback SEO metadata.
3. Replace the default favicon with a new, portfolio-appropriate icon.

---

## 🛠️ Task Breakdown

### Phase 1: Global SEO Setup (`__root.tsx`)
- Add default global `meta` tags in `__root.tsx` (e.g., `og:type`, `og:site_name`, `twitter:card`).
- Define the base `<title>` and `<meta name="description">` fallback.

### Phase 2: Route-Specific SEO Injection
TanStack Router allows exporting a `head()` function from routes. We will implement this for:
- `index.tsx` (Home): "Udit | Forensic Developer"
- `profile.tsx` (Profile): "Profile | Udit - Technical Arsenal & Journey"
- `case-files.tsx` (Case Files): "Case Files | Extracted Problem-Solving Records"
- `lab.tsx` (Lab): "Lab | System Experiments & Sandboxes"
- `logs.tsx` (Logs): "Logs | Raw Telemetry & Internal Monologue"

### Phase 3: Favicon & Asset Updates
- Generate an appropriate SVG or PNG favicon matching the terminal/system aesthetic (e.g., a stylized "U.", a terminal prompt `>_`, or a glowing node dot).
- Update the `links` array in `__root.tsx` to reference the new `/favicon.ico` or `/favicon.svg`.
- Ensure it sits correctly in the `public` directory.

---

## 🛑 Socratic Gate (User Input Required)

Before moving to the implementation phase, please confirm the following:

1. **Favicon Design:** Do you prefer a text-based minimal logo (like `U.`), a terminal symbol (like `>_`), or an abstract shape (like a pulsing node/dot)?
2. **Social Graph Metadata:** Do you have a specific default image (OG Image) you want to use when links are shared on Discord/Twitter, or should we just set up the text data for now?
3. **Keyword Focus:** Are there specific keywords we should prioritize in the meta descriptions? (e.g., "Full-stack engineer", "System architecture", "React & Node.js")

---

## ✅ Verification Checklist
- [ ] Each route has a unique `title` and `description`.
- [ ] OpenGraph (`og:title`, `og:description`) and Twitter meta tags are present.
- [ ] The browser tab shows the correct new favicon.
- [ ] SEO linter scripts report no critical errors.
