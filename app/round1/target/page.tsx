import type { Metadata } from "next";
import { MolViewerWrapper } from "@/components/viewers/MolViewerWrapper";

export const metadata: Metadata = {
  title: "Target: 2Y9X — Mushroom Tyrosinase | CTRL+CELL",
  description:
    "Interactive 3D view of mushroom tyrosinase (PDB: 2Y9X) active site, copper coordination, coordinating histidines, and SwissDock docking box.",
};

export default function TargetPage() {
  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span className="pill pill-purple">Round 1</span>
          <span style={{ color: "#475569" }}>→</span>
          <span className="pill pill-slate">Target</span>
        </div>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          Target: <span className="gradient-text mono">2Y9X</span>
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 680, lineHeight: 1.7 }}>
          Mushroom (<em>Agaricus bisporus</em>) tyrosinase — the canonical model enzyme for
          inhibitor discovery. Dual-copper active site, copper coordinated by six histidine
          residues, and well-validated for computational docking studies.
        </p>
      </div>

      {/* 3D Viewer */}
      <div className="section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          <div>
            <MolViewerWrapper
              pdbId="2Y9X"
              height={450}
              showDockingBox={true}
              ligandPending={false}
              label="PDB: 2Y9X — Mushroom Tyrosinase"
            />
            <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "0.5rem", textAlign: "center" }}>
              Protein cartoon (spectrum coloring) · Copper ions: brown spheres · Coordinating
              histidines: blue sticks · Purple wireframe: SwissDock docking box
            </p>
          </div>

          {/* Info panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="card-elevated">
              <h3 style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#94a3b8", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Structure Info
              </h3>
              {[
                { label: "PDB ID", value: "2Y9X" },
                { label: "Organism", value: "Agaricus bisporus" },
                { label: "Resolution", value: "2.78 Å" },
                { label: "Chains", value: "H, C (2 subunits)" },
                { label: "Metal ions", value: "2× Cu²⁺ per active site" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.375rem 0",
                    borderBottom: "1px solid #21262d",
                    fontSize: "0.8125rem",
                  }}
                >
                  <span style={{ color: "#64748b" }}>{label}</span>
                  <span className="mono" style={{ color: "#94a3b8" }}>{value}</span>
                </div>
              ))}
            </div>

            <div className="card-elevated">
              <h3 style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#94a3b8", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Docking Box
              </h3>
              {[
                { label: "Center X", value: "−10 Å" },
                { label: "Center Y", value: "−25 Å" },
                { label: "Center Z", value: "−40 Å" },
                { label: "Size", value: "20×20×20 Å" },
                { label: "Exhaustivity", value: "90" },
                { label: "Cavity priority", value: "70" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.375rem 0",
                    borderBottom: "1px solid #21262d",
                    fontSize: "0.8125rem",
                  }}
                >
                  <span style={{ color: "#64748b" }}>{label}</span>
                  <span className="mono" style={{ color: "#94a3b8" }}>{value}</span>
                </div>
              ))}
              <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "#475569" }}>
                Tool: SwissDock (Attracting Cavities 2.0 / AutoDock Vina hybrid, 2024)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active site explanation */}
      <div className="section">
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Active Site Chemistry
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              title: "Binuclear Copper Center",
              body: "Two Cu²⁺ ions (CuA and CuB) are separated by ~3.5 Å and are essential for catalytic activity. Both are required for substrate binding and oxidation.",
              color: "#b87333",
            },
            {
              title: "Histidine Coordination",
              body: "Each copper is coordinated by three histidine residues (His61, His85, His94 for CuA; His259, His263, His296 for CuB), forming a 3N-Cu coordination geometry.",
              color: "#60a5fa",
            },
            {
              title: "Inhibitor Mechanism",
              body: "Effective inhibitors typically chelate one or both copper ions. Maltol-scaffold compounds present a β-hydroxy carbonyl motif that coordinates Cu²⁺, mimicking the substrate transition state.",
              color: "#7c3aed",
            },
          ].map(({ title, body, color }) => (
            <div key={title} className="card-elevated" style={{ borderLeft: `3px solid ${color}` }}>
              <h3 style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem", fontSize: "0.9375rem" }}>
                {title}
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
