# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static personal website (in French) advertising private tutoring in maths, physics and computer science. It is plain HTML/CSS/vanilla JS: there is no build step, package manager, linter or test suite. To preview it, open `index.html` in a browser, or serve the folder (e.g. `python -m http.server`) so relative links behave like they will when hosted. All user-facing text and code comments are in French; keep them that way.

## Structure

- `index.html` + `style.css`: the single-page main site. Sections are anchored (`#a-propos`, `#tarifs`, `#avis`, `#contact`) and linked from the top `.navbar`.
- `Fiches.html` + `fiches.css`: a separate page listing downloadable PDF resources. It has its own stylesheet and does **not** load `style.css`, so classes like `.reveal` that are defined only in `style.css` have no styling there.
- `script.js`: loaded by **every** page. It contains the custom green cursor, the reviews carousel (`avisList` array → `#avis-texte`/`#avis-auteur`, `#prev-btn`/`#next-btn`), and an `IntersectionObserver` that adds `.active` to `.reveal` elements (with `.delay-1..3` modifiers in `style.css`). The carousel is wrapped in a check that its elements exist; guard anything page-specific you add here the same way.
- `Fiches/`: the PDF files, linked from `Fiches.html` as `Fiches/<name>.pdf`.
- `eleves.html`: the students-only page ("Reservé à mes élèves"), currently a "Bientôt disponible" placeholder styled with `fiches.css`.

External dependencies are loaded from CDNs only: Font Awesome 6.4.0 (icons), Google Fonts (Orbitron and Roboto), and MathJax 3 on `index.html`. MathJax renders the `\( … \)` / `\[ … \]` LaTeX in the animated background (`.fond-anime .formule-defilante`) and on the 3D book (`.livre-ouvert .page`). The visual theme is a black background with neon green (`#00ff66` / `#00ff88`); `.vert` is the green text highlight class.

## Pitfalls

- **Filename case:** links must match file names exactly (`Fiches.html`, capital F). Windows ignores case, but case-sensitive hosts such as GitHub Pages return a 404.
- **Contact section:** there is no form any more; `#contact` is four link cards (`a.contact-card`: mailto, WhatsApp `wa.me`, Google Maps, LinkedIn) in a 4-column grid (2 columns ≤1000px, 1 column ≤560px).
