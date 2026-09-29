import type { Metadata } from "next";
import { getCompounds } from "@/lib/compounds";
import {
  formatConfidence, formatScore,
  toxClassLabel, proToxClassVerdict,
} from "@/lib/utils";
import { PredSkinPill, ProToxEndpointPill, NotTestedBadge } from "@/components/ui/VerdictPills";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safety Profile — PredSkin & ProTox | CTRL+CELL Round 1",
  description:
    "PredSkin AOP sensitization results and ProTox-3.0 toxicity endpoints for all tested compounds.",
};

const KE_KEYS = ["DPRA", "KeratinoSens", "hCLAT_USens", "LLNA", "AO_PredSkin"];

function KECell({ value }: { value: string | undefined }) {
  if (!value) return <span style={{ color: "#334155", fontSize: "0.75rem" }}>—</span>;
  const isNonSens = value.toLowerCase().includes("non-sensitizer");
  return (
    <span
      className={`pill ${isNonSens ? "pill-safe" : "pill-caution"}`}
      style={{ fontSize: "0.65rem" }}
    >
      {value.match(/(\d+\.?\d*)%/)?.[0] ?? value.split(" ")[0]}
    </span>
  );
}

export default async function SafetyPage() {
  const compounds = await getCompounds();
  const predSkinTested = compounds.filter((c) => c.predskin !== null);
  const proToxTested = compounds.filter((c) => c.protox !== null);

  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span className="pill pill-purple">Round 1</span>
          <span style={{ color: "#475569" }}>→</span>
          <span className="pill pill-slate">Safety</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          Safety Profile
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 640, lineHeight: 1.7 }}>
          PredSkin (AOP-based skin sensitization) and ProTox-3.0 (multi-endpoint toxicity)
          results across all tested compounds.
        </p>
      </div>

      {/* PredSkin table */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Skin Sensitization — PredSkin AOP Model
        </h2>
        <div className="card-elevated" style={{ overflow: "auto" }}>
          <table className="data-table" style={{ minWidth: 700 }}>
            <thead>
              <tr>
                <th>Compound</th>
                <th>Result</th>
                <th>Confidence</th>
                {KE_KEYS.map((k) => <th key={k}>{k}</th>)}
              </tr>
            </thead>
            <tbody>
              {predSkinTested.map((c) => {
                const ps = c.predskin!;
                const ke = ps.ke_breakdown;
                return (
                  <tr key={c.id}>
                    <td>
                      <Link
                        href={`/round1/candidates/${c.id}`}
                        style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 600 }}
                      >
                        {c.name}
                      </Link>
                      <div className="mono" style={{ fontSize: "0.7rem", color: "#475569" }}>
                        {c.id}
                      </div>
                    </td>
                    <td><PredSkinPill result={ps.result} /></td>
                    <td className="mono" style={{ color: "#94a3b8" }}>
                      {formatConfidence(ps.confidence)}
                    </td>
                    {KE_KEYS.map((key) => (
                      <td key={key}><KECell value={ke[key]} /></td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid #21262d", fontSize: "0.8125rem", color: "#475569" }}>
            Not tested:{" "}
            {compounds
              .filter((c) => c.predskin === null && c.id !== "MIX-01")
              .map((c) => c.name)
              .join(", ")}{" "}
            — docking only / pending
          </div>
        </div>
      </div>

      {/* ProTox table */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Systemic Toxicity — ProTox-3.0
        </h2>
        <div className="card-elevated" style={{ overflow: "auto" }}>
          <table className="data-table" style={{ minWidth: 800 }}>
            <thead>
              <tr>
                <th>Compound</th>
                <th>LD₅₀ (mg/kg)</th>
                <th>Class</th>
                <th>Hepato</th>
                <th>Carcino</th>
                <th>Immuno</th>
                <th>Mutagen</th>
                <th>Cyto</th>
              </tr>
            </thead>
            <tbody>
              {proToxTested.map((c) => {
                const px = c.protox!;
                const classVerdict = proToxClassVerdict(px.toxicity_class);
                return (
                  <tr key={c.id}>
                    <td>
                      <Link
                        href={`/round1/candidates/${c.id}`}
                        style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 600 }}
                      >
                        {c.name}
                      </Link>
                      <div className="mono" style={{ fontSize: "0.7rem", color: "#475569" }}>
                        {c.id}
                      </div>
                    </td>
                    <td className="mono" style={{ fontWeight: 700, color: "#e2e8f0" }}>
                      {px.LD50_mg_kg}
                    </td>
                    <td>
                      <span
                        className={`pill ${classVerdict === "safe" ? "pill-safe" : classVerdict === "caution" ? "pill-caution" : "pill-danger"}`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        Class {px.toxicity_class}
                      </span>
                    </td>
                    {[
                      px.hepatotoxicity,
                      px.carcinogenicity,
                      px.immunotoxicity,
                      px.mutagenicity,
                      px.cytotoxicity,
                    ].map((val, i) => (
                      <td key={i}>
                        <ProToxEndpointPill value={val} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid #21262d", fontSize: "0.8125rem", color: "#475569" }}>
            Not tested:{" "}
            {compounds
              .filter((c) => c.protox === null)
              .map((c) => c.name)
              .join(", ")}
          </div>
        </div>

        {/* Tropolone carcinogenicity flag */}
        <div className="alert alert-danger" style={{ marginTop: "1rem" }}>
          <span style={{ fontSize: "1.125rem" }}>⚠</span>
          <div>
            <strong>Tropolone carcinogenicity flag:</strong>{" "}
            <span className="mono">ACTIVE 0.55</span> — This finding motivates the search for
            safer alternative inhibitors. Despite Tropolone&apos;s competitive docking score (
            <span className="mono">−6.284 kcal/mol</span>), its safety profile disqualifies it
            as a commercial ingredient.
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="section">
        <div className="card-elevated" style={{ background: "rgba(124,58,237,0.05)", borderColor: "rgba(124,58,237,0.2)" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.75rem" }}>
            Safety Summary
          </h2>
          <ul style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 2, margin: 0, paddingLeft: "1.25rem" }}>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Phenylmaltol (lead)</strong> — GHS 1B sensitizer
              (low potency) at <span className="mono">66.0%</span> confidence. ProTox Class V
              (low toxicity), no systemic endpoint flags.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Ethylmaltol</strong> — Non-sensitizer (
              <span className="mono">57.9%</span>). Backup candidate. No ProTox data yet.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Kojic acid</strong> — Non-sensitizer (
              <span className="mono">58.6%</span>). Backup candidate. No ProTox data yet.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Tropolone</strong> — ProTox{" "}
              <span style={{ color: "#ef4444", fontWeight: 700 }}>ACTIVE</span> carcinogenicity
              flag. Disqualified as a safe lead.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
