import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Candidate Dossier — Round 1 | CTRL+CELL",
  description: "Full Round 1 candidate dossier: problem statement, enzyme target, compound evaluation, docking results, and safety profile.",
};

export default function DossierPage() {
  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span className="pill pill-purple">Round 1</span>
          <span style={{ color: "#475569" }}>→</span>
          <span className="pill pill-slate">Dossier</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          Candidate Dossier
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 640, lineHeight: 1.7 }}>
          Round 1 formal report — complete findings, methodology, and compound evaluation.
        </p>
      </div>

      {/* Dossier content */}
      <div className="card-elevated" style={{ maxWidth: 800, lineHeight: 1.8, fontSize: "0.9375rem" }}>
        <div style={{ borderBottom: "1px solid #21262d", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.25rem" }}>
            CTRL+CELL — Stopping the Browning
          </h2>
          <div style={{ display: "flex", gap: "1rem", fontSize: "0.8125rem", color: "#64748b" }}>
            <span>Round 1 — Candidate Dossier</span>
            <span>·</span>
            <span>Target: Tyrosinase / PPO (PDB: 2Y9X)</span>
          </div>
        </div>

        {[
          {
            title: "1. Problem Statement",
            content: `Enzymatic browning in cut produce and skin hyperpigmentation are both driven by tyrosinase (polyphenol oxidase, PPO), which catalyses the oxidation of phenolic substrates to melanin precursors. Despite existing inhibitors (notably tropolone), commercial solutions are limited by efficacy, safety, and cost. Our project identifies novel maltol-scaffold inhibitor candidates with improved safety profiles.`,
          },
          {
            title: "2. Enzyme Target",
            content: `Target: Mushroom tyrosinase, PDB 2Y9X (Agaricus bisporus, 2.78 Å resolution). The enzyme features a binuclear copper active site (CuA, CuB), each coordinated by three histidine residues. Inhibitor binding at the copper center is the primary pharmacophoric strategy. The docking box was centred at (−10, −25, −40) Å, 20×20×20 Å, using SwissDock (Attracting Cavities 2.0 / AutoDock Vina hybrid, 2024), exhaustivity 90, cavity prioritisation 70.`,
          },
          {
            title: "3. Compound Library",
            content: `Eight compounds were evaluated: Maltol (MALT-01, scaffold parent), Ethylmaltol (MALT-02, backup), Kojic acid (KOJIC-01, backup), Phenylmaltol (PHMALT-01, lead), Benzylmaltol (BZMALT-01, structural analog), Cinnamaldehyde (CINN-01, reference toxicant), Ethylmaltol+Cinnamaldehyde mixture (MIX-01, mixture effect test), and Tropolone (TROP-01, market comparator).`,
          },
          {
            title: "4. Docking Results",
            content: `Two compounds were docked. Phenylmaltol (PHMALT-01) achieved a best score of −6.696 kcal/mol (147 clusters) against 2Y9X, outperforming the reference Tropolone (TROP-01) at −6.284 kcal/mol (96 clusters). Note: the SwissDock job file was labelled 'maltol_benzyl_B'; the submitter has confirmed this corresponds to phenylmaltol (MW 202.06, SMILES: Cc1oc(-c2ccccc2)cc(=O)c1O). A separate benzylmaltol run result is pending.`,
          },
          {
            title: "5. Safety Assessment",
            content: `PredSkin AOP model: Phenylmaltol returned GHS 1B (low potency sensitizer, 66.0% confidence), driven by KeratinoSens (sensitizer 36.7%) and AO_PredSkin (sensitizer 66.0%). Ethylmaltol and Kojic acid are both non-sensitizers. ProTox-3.0: Phenylmaltol shows a favourable systemic safety profile (Class V, LD₅₀ 2500 mg/kg, no endpoint flags). Tropolone carries an ACTIVE carcinogenicity flag (0.55), disqualifying it as a safe commercial ingredient.`,
          },
          {
            title: "6. Lead Candidate Recommendation",
            content: `Phenylmaltol (PHMALT-01) is the Round 1 lead candidate based on docking affinity (best score among tested compounds) and favourable systemic toxicity profile. However, the GHS 1B skin sensitization flag is a real concern requiring resolution before commercial application. This is addressed in Round 2.`,
          },
          {
            title: "7. Limitations & Next Steps",
            content: `All docking scores are computational estimates; wet-lab IC₅₀ validation is required. PredSkin predictions are in silico; patch test validation needed. Benzylmaltol docking result is still pending. Ethylmaltol and Kojic acid have not yet been docked. See Round 2 for the addendum addressing the sensitization flag and novelty challenge.`,
          },
        ].map(({ title, content }) => (
          <div key={title} style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#c4b5fd", marginBottom: "0.5rem" }}>
              {title}
            </h3>
            <p style={{ color: "#94a3b8", margin: 0 }}>{content}</p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #21262d", paddingTop: "1.25rem", marginTop: "1.5rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.8125rem", color: "#475569" }}>
            Full data traceable in{" "}
            <span className="mono" style={{ color: "#64748b" }}>public/data/compounds.json</span>
          </span>
          <span style={{ fontSize: "0.8125rem", color: "#475569" }}>·</span>
          <Link href="/round2" style={{ fontSize: "0.8125rem", color: "#7c3aed", textDecoration: "none" }}>
            Continue to Round 2 →
          </Link>
        </div>
      </div>
    </div>
  );
}
