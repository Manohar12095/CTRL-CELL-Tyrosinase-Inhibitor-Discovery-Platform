import type { Metadata } from "next";
import { getCompounds } from "@/lib/compounds";
import { SensitizationRadar } from "@/components/charts/SensitizationRadar";
import { parseKEBreakdown, formatConfidence } from "@/lib/utils";
import { PredSkinPill } from "@/components/ui/VerdictPills";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safety Review — Sensitization Deep-Dive | CTRL+CELL Round 2",
  description:
    "AOP breakdown for Phenylmaltol (PHMALT-01) and Benzylmaltol (BZMALT-01) — both GHS 1B. Mixture-effect finding with Cinnamaldehyde (MIX-01).",
};

export default async function SafetyReviewPage() {
  const compounds = await getCompounds();
  const phmalt = compounds.find((c) => c.id === "PHMALT-01")!;
  const bzmalt = compounds.find((c) => c.id === "BZMALT-01")!;
  const mix01 = compounds.find((c) => c.id === "MIX-01")!;
  const malt02 = compounds.find((c) => c.id === "MALT-02")!;

  const flagged = [phmalt, bzmalt];

  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span className="pill pill-caution">Round 2</span>
          <span style={{ color: "#475569" }}>→</span>
          <span className="pill pill-slate">Safety Review</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          Sensitization Deep-Dive
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 680, lineHeight: 1.7 }}>
          AOP-based PredSkin analysis of the maltol-scaffold sensitizers. Both Phenylmaltol
          (lead) and Benzylmaltol (analog) received GHS 1B classifications. We explain what
          this means and what it does not mean.
        </p>
      </div>

      {/* GHS 1B explainer */}
      <div className="alert alert-warning" style={{ marginBottom: "2rem" }}>
        <span style={{ fontSize: "1.125rem", flexShrink: 0 }}>ℹ</span>
        <div>
          <strong>What GHS 1B means:</strong> Low-potency sensitizer. GHS 1B is categorically
          distinct from GHS 1A (high potency sensitizer). A 1B classification indicates the
          compound{" "}
          <em>may</em> cause sensitization in some individuals at relevant exposure levels, but
          with lower potency than 1A compounds. It warrants careful dose management and
          labelling — it does not automatically disqualify a compound from all applications.
        </div>
      </div>

      {/* Side-by-side AOP comparison */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          AOP Breakdown: Phenylmaltol vs Benzylmaltol
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" }}>
          {flagged.map((c) => {
            const ps = c.predskin!;
            const ke = parseKEBreakdown(ps.ke_breakdown);
            return (
              <div
                key={c.id}
                className="card-elevated"
                style={{ borderLeft: "3px solid #f59e0b" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <h3 style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "0.2rem" }}>
                      {c.name}
                    </h3>
                    <span className="mono" style={{ fontSize: "0.75rem", color: "#475569" }}>{c.id}</span>
                  </div>
                  <PredSkinPill result={ps.result} confidence={ps.confidence} />
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Overall Confidence
                  </span>
                  <span className="mono" style={{ marginLeft: "0.5rem", fontWeight: 700, color: "#fbbf24" }}>
                    {formatConfidence(ps.confidence)}
                  </span>
                </div>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>KE Assay</th>
                      <th>Call</th>
                      <th>Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ke.map(({ key, call, confidence }) => (
                      <tr key={key}>
                        <td className="mono" style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>{key}</td>
                        <td>
                          <span
                            className={`pill ${call === "sensitizer" ? "pill-caution" : "pill-safe"}`}
                            style={{ fontSize: "0.65rem" }}
                          >
                            {call === "sensitizer" ? "⚠ Sensitizer" : "✓ Non-sensitizer"}
                          </span>
                        </td>
                        <td className="mono" style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
                          {confidence != null ? `${confidence.toFixed(1)}%` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {c.id === "PHMALT-01" && (
                  <div className="alert alert-info" style={{ marginTop: "0.75rem" }}>
                    <span>ℹ</span>
                    <span style={{ fontSize: "0.8125rem" }}>
                      DPRA and hCLAT_USens vote non-sensitizer. The sensitizer call is driven by
                      KeratinoSens (KE2) and AO_PredSkin (adverse outcome). This mixed pattern is
                      typical of GHS 1B compounds.
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Radar chart */}
        <div className="card-elevated">
          <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#94a3b8", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            AOP Assay Confidence Comparison
          </h3>
          <SensitizationRadar
            compounds={[
              { id: "PHMALT-01", name: "Phenylmaltol", predskin: phmalt.predskin!, color: "#7c3aed" },
              { id: "BZMALT-01", name: "Benzylmaltol", predskin: bzmalt.predskin!, color: "#f59e0b" },
            ]}
          />
        </div>
      </div>

      {/* AOP chain visualization */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Adverse Outcome Pathway (AOP) Chain
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            overflowX: "auto",
            padding: "1rem",
            background: "#161b22",
            border: "1px solid #21262d",
            borderRadius: 10,
          }}
        >
          {[
            { label: "MIE", desc: "Molecular Initiating Event: Hapten–protein binding", color: "#7c3aed" },
            { label: "→", desc: null, color: null },
            { label: "KE1", desc: "DPRA — Covalent protein binding", color: "#3b82f6" },
            { label: "→", desc: null, color: null },
            { label: "KE2", desc: "KeratinoSens — Keratinocyte activation", color: "#06b6d4" },
            { label: "→", desc: null, color: null },
            { label: "KE3", desc: "hCLAT_USens — DC activation", color: "#10b981" },
            { label: "→", desc: null, color: null },
            { label: "KE4", desc: "LLNA — T cell proliferation", color: "#f59e0b" },
            { label: "→", desc: null, color: null },
            { label: "AO", desc: "AO_PredSkin — Skin sensitization (adverse outcome)", color: "#ef4444" },
          ].map(({ label, desc, color }, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              {label === "→" ? (
                <span style={{ color: "#334155", fontSize: "1.25rem" }}>→</span>
              ) : (
                <div>
                  <div
                    style={{
                      background: color ? `${color}22` : undefined,
                      border: `1px solid ${color}55`,
                      borderRadius: 8,
                      padding: "0.4rem 0.75rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      color: color ?? undefined,
                      marginBottom: "0.375rem",
                    }}
                  >
                    {label}
                  </div>
                  {desc && (
                    <div style={{ fontSize: "0.6rem", color: "#475569", maxWidth: 90, lineHeight: 1.3 }}>
                      {desc}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mixture effect */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Mixture Effect: MIX-01
        </h2>
        <div className="card-elevated">
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ fontWeight: 600, color: "#94a3b8" }}>
              <span className="pill pill-safe">✓ Ethylmaltol (alone)</span>
              <span style={{ margin: "0 0.5rem", color: "#475569" }}>+</span>
              <span className="pill pill-danger">Cinnamaldehyde (known allergen)</span>
              <span style={{ margin: "0 0.5rem", color: "#475569" }}>=</span>
              <span className="pill pill-caution">⚠ GHS 1B Mixture (76.7%)</span>
            </div>
          </div>

          <div className="alert alert-warning">
            <span>⚠</span>
            <div style={{ fontSize: "0.875rem" }}>
              <strong>Mixture-toxicity effect — not an error.</strong>{" "}
              {mix01.predskin?.note}
            </div>
          </div>

          {mix01.predskin && (
            <table className="data-table" style={{ marginTop: "1rem" }}>
              <thead>
                <tr>
                  <th>Assay</th>
                  <th>MIX-01 Call</th>
                  <th>Confidence</th>
                  <th>Ethylmaltol alone</th>
                </tr>
              </thead>
              <tbody>
                {(Object.entries(mix01.predskin.ke_breakdown) as [string, string][]).map(([key, mixVal]) => {
                  const malt02ke: string = malt02.predskin?.ke_breakdown[key] ?? "—";
                  const mixIsSens = mixVal.toLowerCase().includes("sensitizer") && !mixVal.toLowerCase().includes("non-sensitizer");
                  const maltIsSens = malt02ke.toLowerCase().includes("sensitizer") && !malt02ke.toLowerCase().includes("non-sensitizer");
                  return (
                    <tr key={key}>
                      <td className="mono" style={{ color: "#94a3b8" }}>{key}</td>
                      <td>
                        <span className={`pill ${mixIsSens ? "pill-caution" : "pill-safe"}`} style={{ fontSize: "0.65rem" }}>
                          {mixVal}
                        </span>
                      </td>
                      <td className="mono" style={{ color: "#94a3b8" }}>
                        {mixVal.match(/(\d+\.?\d*)%/)?.[0] ?? "—"}
                      </td>
                      <td>
                        <span className={`pill ${maltIsSens ? "pill-caution" : "pill-safe"}`} style={{ fontSize: "0.65rem" }}>
                          {malt02ke}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
