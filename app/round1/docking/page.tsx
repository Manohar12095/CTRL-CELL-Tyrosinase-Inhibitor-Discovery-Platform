import type { Metadata } from "next";
import { getCompounds } from "@/lib/compounds";
import { DockingBarChart } from "@/components/charts/DockingBarChart";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docking Results — SwissDock | CTRL+CELL Round 1",
  description:
    "SwissDock docking scores for Phenylmaltol and Tropolone against mushroom tyrosinase (2Y9X). Attracting Cavities 2.0 / AutoDock Vina hybrid.",
};

export default async function DockingPage() {
  const compounds = await getCompounds();
  const docked = compounds.filter((c) => c.docking !== null);

  const chartData = docked.map((c) => ({
    name: c.name,
    id: c.id,
    score: c.docking!.best_score_kcal_mol,
    role: c.role,
  }));

  const phenylmaltol = compounds.find((c) => c.id === "PHMALT-01");
  const tropolone = compounds.find((c) => c.id === "TROP-01");
  const margin =
    phenylmaltol && tropolone
      ? phenylmaltol.docking!.best_score_kcal_mol - tropolone.docking!.best_score_kcal_mol
      : null;

  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span className="pill pill-purple">Round 1</span>
          <span style={{ color: "#475569" }}>→</span>
          <span className="pill pill-slate">Docking</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          Docking Results
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 640, lineHeight: 1.7 }}>
          SwissDock (Attracting Cavities 2.0 / AutoDock Vina hybrid, 2024) results for{" "}
          <strong style={{ color: "#c4b5fd" }}>Phenylmaltol</strong> vs{" "}
          <strong style={{ color: "#94a3b8" }}>Tropolone</strong> against mushroom tyrosinase (
          <span className="mono">2Y9X</span>). More negative = stronger predicted binding.
        </p>
      </div>

      {/* Score comparison bar chart */}
      <div className="section">
        <div className="card-elevated">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.25rem" }}>
                Binding Affinity Comparison
              </h2>
              <p style={{ fontSize: "0.8125rem", color: "#64748b" }}>
                Best docking score (ΔG, kcal/mol) — lower is better
              </p>
            </div>
            {margin !== null && (
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Phenylmaltol advantage
                </div>
                <div
                  className="mono"
                  style={{ fontSize: "1.5rem", fontWeight: 800, color: "#7c3aed" }}
                >
                  {margin.toFixed(3)} kcal/mol
                </div>
              </div>
            )}
          </div>
          <DockingBarChart data={chartData} />
        </div>
      </div>

      {/* Side-by-side comparison table */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Detailed Comparison
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {[phenylmaltol, tropolone].map((c) => {
            if (!c || !c.docking) return null;
            const isLead = c.id === "PHMALT-01";
            return (
              <div
                key={c.id}
                className="card-elevated"
                style={{
                  borderLeft: `3px solid ${isLead ? "#7c3aed" : "#475569"}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "0.25rem" }}>{c.name}</h3>
                    <span className="mono" style={{ fontSize: "0.75rem", color: "#475569" }}>{c.id}</span>
                  </div>
                  {isLead && <span className="pill pill-lead">⭐ Lead</span>}
                </div>
                <table className="data-table">
                  <tbody>
                    {[
                      { label: "Best ΔG", value: `${c.docking.best_score_kcal_mol.toFixed(3)} kcal/mol`, highlight: true },
                      { label: "Clusters", value: c.docking.n_clusters.toString(), highlight: false },
                      { label: "Tool", value: c.docking.tool, highlight: false },
                      { label: "Target", value: c.docking.target, highlight: false },
                    ].map(({ label, value, highlight }) => (
                      <tr key={label}>
                        <td style={{ color: "#64748b" }}>{label}</td>
                        <td
                          className="mono"
                          style={{
                            color: highlight ? (isLead ? "#a78bfa" : "#94a3b8") : "#94a3b8",
                            fontWeight: highlight ? 700 : 500,
                            fontSize: highlight ? "1rem" : "0.875rem",
                          }}
                        >
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {isLead && c.docking.note && (
                  <div className="alert alert-warning" style={{ marginTop: "0.75rem" }}>
                    <span>⚠</span>
                    <span style={{ fontSize: "0.8125rem" }}>{c.docking.note}</span>
                  </div>
                )}
                {!isLead && (
                  <div className="alert alert-danger" style={{ marginTop: "0.75rem" }}>
                    <span>⚠</span>
                    <span style={{ fontSize: "0.8125rem" }}>
                      Tropolone carries a ProTox-3.0 carcinogenicity flag (
                      <span className="mono">ACTIVE 0.55</span>). See{" "}
                      <Link href="/round1/safety" style={{ color: "#f87171" }}>safety profile</Link>.
                    </span>
                  </div>
                )}
                <Link
                  href={`/round1/candidates/${c.id}`}
                  style={{
                    display: "inline-block",
                    marginTop: "0.75rem",
                    fontSize: "0.8125rem",
                    color: "#7c3aed",
                    textDecoration: "none",
                  }}
                >
                  Full compound profile →
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Methods box */}
      <div className="section">
        <div className="card-elevated" style={{ borderLeft: "3px solid #21262d" }}>
          <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#64748b", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Method & Honesty Statement
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {[
              { label: "Docking Tool", value: "SwissDock (2024)" },
              { label: "Scoring Method", value: "Attracting Cavities 2.0 / AutoDock Vina hybrid" },
              { label: "Box Center", value: "(−10, −25, −40) Å" },
              { label: "Box Size", value: "20 × 20 × 20 Å" },
              { label: "Exhaustivity", value: "90" },
              { label: "Cavity Priority", value: "70" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                <div className="mono" style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>{value}</div>
              </div>
            ))}
          </div>
          <div className="alert alert-info">
            <span>ℹ</span>
            <span style={{ fontSize: "0.875rem" }}>
              All docking scores are <em>in silico</em> computational estimates using the
              SwissDock 2024 platform. No wet-lab validation has been performed. Scores should
              be interpreted with appropriate uncertainty — they indicate relative binding
              affinity predictions, not confirmed inhibition constants.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
