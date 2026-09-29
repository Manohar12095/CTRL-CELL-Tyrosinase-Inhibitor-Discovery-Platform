import type { Metadata } from "next";
import { getCompounds } from "@/lib/compounds";
import { formatScore, formatConfidence } from "@/lib/utils";
import { PredSkinPill, NotTestedBadge, PendingBadge } from "@/components/ui/VerdictPills";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Decision: Defend or Pivot | CTRL+CELL Round 2",
  description:
    "Evidence-based decision analysis: defend Phenylmaltol as lead or pivot to Ethylmaltol/Kojic acid. Data-driven, not speculative.",
};

export default async function DecisionPage() {
  const compounds = await getCompounds();
  const phmalt = compounds.find((c) => c.id === "PHMALT-01")!;
  const kojic = compounds.find((c) => c.id === "KOJIC-01")!;
  const malt02 = compounds.find((c) => c.id === "MALT-02")!;

  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span className="pill pill-caution">Round 2</span>
          <span style={{ color: "#475569" }}>→</span>
          <span className="pill pill-slate">Decision</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          Defend or Pivot?
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 680, lineHeight: 1.7 }}>
          Given the sensitization flag on our lead candidate, the evidence-backed path is to
          pivot toward our non-sensitizing candidates. But that decision can only be
          <strong style={{ color: "#fbbf24" }}> finalized once those candidates are docked</strong>.
          This page shows the current state of evidence — with no premature conclusions.
        </p>
      </div>

      {/* PENDING BANNER */}
      <div className="pending-banner" style={{ marginBottom: "2rem" }}>
        <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>⏳</span>
        <div>
          <strong style={{ color: "#fbbf24", fontSize: "1rem" }}>
            ACTION REQUIRED: Dock the pivot candidates before finalizing this decision
          </strong>
          <p style={{ color: "#94a3b8", margin: "0.25rem 0 0", fontSize: "0.875rem", lineHeight: 1.6 }}>
            Ethylmaltol (MALT-02) and Kojic acid (KOJIC-01) are both non-sensitizers with
            PredSkin NC classifications — but neither has been docked yet. The evidence-backed
            pivot cannot be declared final without binding affinity data. Next step: run
            SwissDock for both compounds against 2Y9X with identical parameters.
          </p>
        </div>
      </div>

      {/* Decision matrix */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Decision Matrix
        </h2>
        <div className="card-elevated" style={{ overflow: "auto" }}>
          <table className="data-table" style={{ minWidth: 700 }}>
            <thead>
              <tr>
                <th>Compound</th>
                <th>Docking ΔG</th>
                <th>PredSkin</th>
                <th>ProTox Class</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  c: phmalt,
                  rec: "Contingent — safety flagged",
                  recColor: "#f59e0b",
                  recIcon: "⚠",
                },
                {
                  c: kojic,
                  rec: "Pivot candidate — dock first",
                  recColor: "#7c3aed",
                  recIcon: "→",
                },
                {
                  c: malt02,
                  rec: "Pivot candidate — dock first",
                  recColor: "#7c3aed",
                  recIcon: "→",
                },
              ].map(({ c, rec, recColor, recIcon }) => (
                <tr key={c.id}>
                  <td>
                    <Link href={`/round1/candidates/${c.id}`} style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 600 }}>
                      {c.name}
                    </Link>
                    <div className="mono" style={{ fontSize: "0.7rem", color: "#475569" }}>{c.id}</div>
                  </td>
                  <td>
                    {c.docking ? (
                      <span className="mono" style={{ color: "#7c3aed", fontWeight: 700 }}>
                        {formatScore(c.docking.best_score_kcal_mol)} kcal/mol
                      </span>
                    ) : (
                      <NotTestedBadge />
                    )}
                  </td>
                  <td>
                    <PredSkinPill
                      result={c.predskin?.result ?? null}
                      confidence={c.predskin?.confidence}
                    />
                  </td>
                  <td>
                    {c.protox ? (
                      <span className="mono" style={{ color: "#94a3b8" }}>
                        Class {c.protox.toxicity_class}
                      </span>
                    ) : (
                      <NotTestedBadge label="Not run" />
                    )}
                  </td>
                  <td>
                    <span style={{ color: recColor, fontWeight: 600, fontSize: "0.875rem" }}>
                      {recIcon} {rec}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reasoning */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Reasoning
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {[
            {
              title: "Why pivot away from Phenylmaltol?",
              body: "GHS 1B sensitization at 66.0% confidence, driven by two concordant assays (KeratinoSens + AO_PredSkin). For a topical or food-contact application, a sensitizer flag — even low-potency — creates regulatory and commercial risk.",
              color: "#f59e0b",
            },
            {
              title: "Why Kojic acid / Ethylmaltol as pivot targets?",
              body: "Both are non-sensitizers (PredSkin NC, 58.6% and 57.9% confidence). Both share the maltol core pharmacophore and are expected to bind the tyrosinase copper center via the same β-hydroxy carbonyl chelation mechanism. Kojic acid is an established commercial tyrosinase inhibitor.",
              color: "#7c3aed",
            },
            {
              title: "What prevents a final call right now?",
              body: "Neither pivot candidate has docking data. Without binding affinity estimates, we cannot compare efficacy — only safety. A pivot candidate with NC safety but poor docking would not advance the project. Docking is the critical next experiment.",
              color: "#64748b",
            },
          ].map(({ title, body, color }) => (
            <div key={title} className="card-elevated" style={{ borderLeft: `3px solid ${color}` }}>
              <h3 style={{ fontWeight: 700, color: "#e2e8f0", fontSize: "0.9375rem", marginBottom: "0.5rem" }}>{title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div className="section">
        <div className="card-elevated" style={{ borderLeft: "3px solid #7c3aed" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
            ✓ Explicit Action Items (Decision Pending These)
          </h2>
          <ol style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 2, paddingLeft: "1.25rem", margin: 0 }}>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Dock Kojic acid (KOJIC-01)</strong> against 2Y9X
              using identical SwissDock parameters. Record best ΔG and cluster count.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Dock Ethylmaltol (MALT-02)</strong> against 2Y9X.
              Compare score to Phenylmaltol&apos;s{" "}
              <span className="mono">{formatScore(phmalt.docking?.best_score_kcal_mol)} kcal/mol</span>.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Run ProTox-3.0</strong> for Kojic acid and
              Ethylmaltol to complete the safety profile.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Update this decision page</strong> with the new
              docking data. If either pivot candidate scores comparably to Phenylmaltol, the pivot
              is formally recommended.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
