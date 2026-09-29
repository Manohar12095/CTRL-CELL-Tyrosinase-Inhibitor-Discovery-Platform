@echo off
REM ================================================================
REM CTRL+CELL — GitHub + Vercel Deployment Script
REM Run this ONCE after installing Git for Windows:
REM   https://git-scm.com/download/win
REM ================================================================

REM 1. Navigate to project
cd /d "%~dp0"

REM 2. Initialize git (if not already)
git init

REM 3. Stage everything
git add .

REM 4. Commit 1: scaffold + design system
git add app/layout.tsx app/globals.css app/page.tsx
git commit -m "feat: scaffold Next.js app with Tailwind and project structure"

REM 5. Commit 2: data layer
git add public/data/compounds.json lib/compounds.ts lib/utils.ts
git commit -m "feat: add data layer — compounds.json and Zod schema"

REM 6. Commit 3: pipeline
git add pipeline/ docs/ raw-data/
git commit -m "feat(pipeline): add build_data.py with RDKit SVG generation"

REM 7. Commit 4: components
git add components/
git commit -m "feat: add shared UI components (nav, cards, charts, 3D viewer)"

REM 8. Commit 5: round1 pages
git add app/round1/
git commit -m "feat(round1): add overview, target, candidates, docking, safety, dossier pages"

REM 9. Commit 6: round2 pages
git add app/round2/
git commit -m "feat(round2): add safety-review, novelty-review, decision, addendum pages"

REM 10. Commit 7: shared pages + config
git add app/methods/ app/about/ .gitignore .gitattributes README.md
git commit -m "feat: add methods, about pages and deployment config"

echo.
echo ================================================================
echo All commits done. Now push to GitHub:
echo.
echo   git remote add origin https://github.com/YOUR_USERNAME/biocodex-hackathon.git
echo   git branch -M main
echo   git push -u origin main
echo.
echo Then connect the repo to Vercel at https://vercel.com/new
echo ================================================================
pause
