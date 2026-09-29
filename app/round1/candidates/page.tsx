import type { Metadata } from "next";
import { getCompounds } from "@/lib/compounds";
import { CompoundCard } from "@/components/compounds/CompoundCard";

export const metadata: Metadata = {
  title: "Compound Library | CTRL+CELL Round 1",
  description:
    "All 8 inhibitor candidates evaluated: Maltol, Ethylmaltol, Kojic acid, Phenylmaltol, Benzylmaltol, Cinnamaldehyde, mixture MIX-01, and Tropolone.",
};

export default async function CandidatesPage() {
  const compounds = await getCompounds();

  const docked = compounds.filter((c) => c.docking !== null);
  const predSkinTested = compounds.filter((c) => c.predskin !== null);
  const proToxTested = compounds.filter((c) => c.protox !== null);

  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span className="pill pill-purple">Round 1</span>
          <span style={{ color: "#475569" }}>→</span>
          <span className="pill pill-slate">Compounds</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          Compound Library
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 640, lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {compounds.length} compounds evaluated across maltol scaffold variants, reference inhibitors,
          and mixture controls. Click any card for the full detail page.
        </p>

        {/* Summary stats */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {[
            { label: "Total", value: compounds.length },
            { label: "Docked", value: docked.length },
            { label: "PredSkin tested", value: predSkinTested.length },
            { label: "ProTox tested", value: proToxTested.length },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: "#161b22",
                border: "1px solid #21262d",
                borderRadius: 8,
                padding: "0.5rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                className="mono"
                style={{ fontSize: "1.125rem", fontWeight: 700, color: "#7c3aed" }}
              >
                {value}
              </span>
              <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compound grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {compounds.map((compound, i) => (
          <div
            key={compound.id}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <CompoundCard compound={compound} />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          marginTop: "2.5rem",
          padding: "1rem 1.25rem",
          background: "#161b22",
          border: "1px solid #21262d",
          borderRadius: 10,
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          PredSkin Legend:
        </span>
        <span className="pill pill-safe">✓ NC — Non-sensitizer</span>
        <span className="pill pill-caution">⚠ GHS 1B — Low potency sensitizer</span>
        <span className="pill pill-danger">✗ GHS 1A — High potency sensitizer</span>
        <span className="pill pill-pending">— Not yet tested</span>
      </div>
    </div>
  );
}
