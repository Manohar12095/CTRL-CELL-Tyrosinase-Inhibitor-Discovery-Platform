import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Round 2 Addendum | CTRL+CELL",
  description: "Formal addendum document: what was found in Round 2, what changed, and the reasoning.",
};

export default function AddendumPage() {
  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span className="pill pill-caution">Round 2</span>
          <span style={{ color: "#475569" }}>→</span>
          <span className="pill pill-slate">Addendum</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          Round 2 Addendum
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 640, lineHeight: 1.7 }}>
          Formal addendum to the Round 1 Candidate Dossier, addressing the two Round 2
          constraints.
        </p>
      </div>

      {/* Addendum document */}
      <div className="card-elevated" style={{ maxWidth: 800, lineHeight: 1.8, fontSize: "0.9375rem" }}>
        <div style={{ borderBottom: "1px solid #21262d", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.25rem" }}>
            CTRL+CELL — Round 2 Addendum
          </h2>
          <div style={{ display: "flex", gap: "1rem", fontSize: "0.8125rem", color: "#64748b", flexWrap: "wrap" }}>
            <span>Issued: 2026-09-29</span>
            <span>·</span>
            <span>Addendum to Round 1 Candidate Dossier</span>
            <span>·</span>
            <span>Lead compound: Phenylmaltol (PHMALT-01)</span>
          </div>
        </div>

        {[
          {
            title: "1. What Was Found",
            content: `Two constraints were applied to our Round 1 lead candidate, Phenylmaltol (PHMALT-01):

(a) Skin-sensitization safety flag: PredSkin AOP model returns GHS 1B (low-potency sensitizer, 66.0% confidence). The call is driven by concordant sensitizer predictions from KeratinoSens (KE2, 36.7%) and AO_PredSkin (66.0%), with DPRA (KE1), hCLAT_USens (KE3), and LLNA (KE4) voting non-sensitizer. Our structural analog Benzylmaltol (BZMALT-01) also returned GHS 1B (59.7% confidence). Both compounds flag as low-potency sensitizers.

(b) Competitor novelty challenge: A competitor has published a scaffold that may overlap with our maltol series. A structural comparison and freedom-to-operate assessment is in progress. No comparison is presented here until the analysis is complete.

Additionally, a mixture-toxicity finding was made: Ethylmaltol (MALT-02) alone is a non-sensitizer, but when combined with Cinnamaldehyde (CINN-01, a known fragrance allergen), the mixture (MIX-01) returns a GHS 1B sensitizer classification at 76.7% confidence. This is a documented mixture-toxicity phenomenon, not a data error.`,
          },
          {
            title: "2. What Changed",
            content: `Phenylmaltol remains the best-docked compound in our library (ΔG = −6.696 kcal/mol, 147 clusters against PDB 2Y9X), and its systemic toxicity profile via ProTox-3.0 is favourable (Class V, LD₅₀ 2500 mg/kg, no endpoint flags). However, the GHS 1B sensitization flag represents a genuine regulatory and commercial risk for topical or food-contact applications.

Our assessment of the compound library now identifies two evidence-backed pivot candidates: Ethylmaltol (MALT-02, NC non-sensitizer 57.9%) and Kojic acid (KOJIC-01, NC non-sensitizer 58.6%). Both share the maltol pharmacophoric core and are expected to bind the tyrosinase copper center via the same β-hydroxy carbonyl chelation mechanism.`,
          },
          {
            title: "3. Reasoning",
            content: `The pivot path is evidence-backed but not yet finalised. Neither MALT-02 nor KOJIC-01 has been docked against 2Y9X. Without binding affinity data for the pivot candidates, we cannot make a head-to-head efficacy comparison. The decision to formally pivot is conditional on the docking results.

GHS 1B (low potency sensitizer) is not automatically disqualifying — it is categorically distinct from GHS 1A (high potency). The designation indicates a real but lower-potency hazard that can, in some contexts, be managed through dose control and appropriate labelling. We acknowledge this nuance while not using it to dismiss the finding.

The honest position: Phenylmaltol is our best-docked compound with a real sensitization flag. The pivot to a non-sensitizing candidate makes sense if that candidate docks comparably. The next required experiment is docking Kojic acid and Ethylmaltol using the same SwissDock 2024 protocol.`,
          },
          {
            title: "4. Outstanding Items",
            content: `— Dock KOJIC-01 and MALT-02 against PDB 2Y9X (identical parameters: box center (−10,−25,−40), 20×20×20 Å, exhaustivity 90, cavity priority 70)
— Run ProTox-3.0 for KOJIC-01 and MALT-02
— Complete literature/patent comparison for competitor scaffold novelty review
— Retrieve BZMALT-01 SwissDock result (separate run submitted)
— Update decision page once pivot candidate docking is available`,
          },
        ].map(({ title, content }) => (
          <div key={title} style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#c4b5fd", marginBottom: "0.5rem" }}>
              {title}
            </h3>
            <p style={{ color: "#94a3b8", margin: 0, whiteSpace: "pre-line" }}>{content}</p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #21262d", paddingTop: "1.25rem", marginTop: "1.5rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/round2/decision" style={{ fontSize: "0.8125rem", color: "#7c3aed", textDecoration: "none" }}>
            ← Back to Decision
          </Link>
          <span style={{ fontSize: "0.8125rem", color: "#475569" }}>·</span>
          <Link href="/round1/dossier" style={{ fontSize: "0.8125rem", color: "#7c3aed", textDecoration: "none" }}>
            Round 1 Dossier
          </Link>
          <span style={{ fontSize: "0.8125rem", color: "#475569" }}>·</span>
          <Link href="/methods" style={{ fontSize: "0.8125rem", color: "#7c3aed", textDecoration: "none" }}>
            Methods & Citations
          </Link>
        </div>
      </div>
    </div>
  );
}
