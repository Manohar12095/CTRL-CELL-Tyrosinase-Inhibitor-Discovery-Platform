# CTRL+CELL — Tyrosinase Inhibitor Discovery Platform

## What is this website about?

This platform is a presentation and data-visualization tool for the **"Stopping the Browning"** hackathon project by **Team Ctrl+Cell**. 

The project identifies **Tyrosinase** (also known as Polyphenol Oxidase or PPO) as the key enzyme responsible for both the enzymatic browning in cut produce (like apples and potatoes) and hyperpigmentation in human skin. 

Instead of relying on existing, often toxic or ineffective inhibitors, our team has computationally screened and identified novel maltol-scaffold inhibitor candidates. This website walks through:
* **Round 1:** The identification of our initial lead candidate (Phenylmaltol) via structure-based docking (SwissDock) against the 2Y9X enzyme crystal structure, alongside systemic toxicity screening (ProTox-3.0) and skin-sensitization checks (PredSkin).
* **Round 2:** Adapting to newly discovered constraints (a low-potency sensitization flag and competitor scaffold overlap) by analyzing mixture toxicity, assessing novelty, and pivoting to evidence-backed backup candidates.

---

## How to Run It Locally

We have made it incredibly easy to start the website on any Windows computer.

1. **Install Node.js** (if you haven't already):
   Download and install it from [nodejs.org](https://nodejs.org/).

2. **Start the Website:**
   Inside this project folder, simply double-click the **`start_website.bat`** file.
   * This will automatically boot up the Next.js development server.
   * Please wait a few seconds for the console to say `Ready`.

3. **View the Website:**
   Open your web browser and go to: **[http://localhost:3000](http://localhost:3000)**

---

## Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS & Vanilla CSS (custom design system)
* **Data Visualization:** Recharts
* **Molecular Viewing:** 3Dmol.js (for the protein active site) & CDK Depict API (for 2D structures)

## Key Findings (Spot-Check)
* **Phenylmaltol docking score:** `-6.696 kcal/mol`
* **Tropolone docking score:** `-6.284 kcal/mol`
* **Tropolone carcinogenicity:** `ACTIVE 0.55`
* **Phenylmaltol Sensitization:** `GHS 1B`
