import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methods & Citations | CTRL+CELL",
  description:
    "Tool versions, citations, docking parameters, and honesty statement for the CTRL+CELL Tyrosinase Inhibitor Discovery platform.",
};

export default function MethodsPage() {
  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          Methods & Citations
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 640, lineHeight: 1.7 }}>
          Tool versions, computational parameters, data provenance, and an explicit honesty
          statement on the scope and limitations of this work.
        </p>
      </div>

      {/* Honesty statement */}
      <div className="alert alert-info" style={{ marginBottom: "2rem" }}>
        <span style={{ fontSize: "1.125rem" }}>ℹ</span>
        <div>
          <strong>Computational Estimates — Honesty Statement:</strong> All docking scores
          presented in this platform are <em>in silico</em> computational estimates generated
          by SwissDock (2024). PredSkin and ProTox results are model-based predictions, not
          experimental measurements. No wet-lab validation has been performed for any compound
          in this study. All values should be interpreted with appropriate scientific uncertainty.
          We never extrapolate beyond what the data supports.
        </div>
      </div>

      {/* Tools */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Tools & Software
        </h2>
        <div className="card-elevated" style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Version / Year</th>
                <th>Use</th>
                <th>Citation</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  tool: "SwissDock",
                  version: "2024 (Attracting Cavities 2.0 / AutoDock Vina hybrid)",
                  use: "Protein–ligand docking",
                  citation: "Grosdidier et al., Nucleic Acids Res., 2011",
                },
                {
                  tool: "PredSkin / Pred-Skin AOP",
                  version: "AOP-based model (web server)",
                  use: "Skin sensitization prediction",
                  citation: "Ferreira & Andricopulo, Front. Pharmacol., 2018",
                },
                {
                  tool: "ProTox-3.0",
                  version: "3.0 (2024)",
                  use: "Multi-endpoint toxicity prediction",
                  citation: "Banerjee et al., Nucleic Acids Res., 2024",
                },
                {
                  tool: "RDKit",
                  version: "≥2023.9",
                  use: "2D structure rendering (SVG)",
                  citation: "Landrum, G. et al., RDKit: Open-source cheminformatics",
                },
                {
                  tool: "SwissDock Target",
                  version: "PDB 2Y9X",
                  use: "Mushroom tyrosinase (Agaricus bisporus)",
                  citation: "Ismaya et al., Biochemistry, 2011",
                },
              ].map(({ tool, version, use, citation }) => (
                <tr key={tool}>
                  <td style={{ fontWeight: 600, color: "#e2e8f0" }}>{tool}</td>
                  <td className="mono" style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>{version}</td>
                  <td style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{use}</td>
                  <td style={{ color: "#64748b", fontSize: "0.8125rem", fontStyle: "italic" }}>{citation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Docking parameters */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Docking Parameters
        </h2>
        <div className="card-elevated">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {[
              { label: "Target", value: "PDB 2Y9X (protein-only, fixed)" },
              { label: "Docking Tool", value: "SwissDock 2024" },
              { label: "Scoring Engine", value: "Attracting Cavities 2.0 / AutoDock Vina hybrid" },
              { label: "Box Center (X, Y, Z)", value: "(−10, −25, −40) Å" },
              { label: "Box Size", value: "20 × 20 × 20 Å" },
              { label: "Sampling Exhaustivity", value: "90" },
              { label: "Cavity Prioritization", value: "70" },
              { label: "Ligand preparation", value: "SwissDock default (energy minimisation, protonation at pH 7.4)" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>
                  {label}
                </div>
                <div className="mono" style={{ fontSize: "0.875rem", color: "#94a3b8" }}>{value}</div>
              </div>
            ))}
          </div>
          <div className="alert alert-info">
            <span>ℹ</span>
            <span style={{ fontSize: "0.875rem" }}>
              The same docking box and parameters were used for all compounds to ensure
              comparability. Scores are free energies of binding estimates (ΔG, kcal/mol);
              more negative = stronger predicted binding.
            </span>
          </div>
        </div>
      </div>

      {/* Data provenance */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Data Provenance
        </h2>
        <div className="card-elevated">
          <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "1rem" }}>
            All numerical values presented in this platform originate from the following sources:
          </p>
          <ul style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 2, paddingLeft: "1.25rem" }}>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Docking scores</strong> — SwissDock result files
              (
              <span className="mono">raw-data/</span> directory in the project repository)
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>PredSkin values</strong> — PredSkin web server
              output PDFs (extracted manually, stored in{" "}
              <span className="mono">raw-data/</span>)
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>ProTox values</strong> — ProTox-3.0 web server
              output PDFs (extracted manually)
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Physicochemical descriptors</strong> — computed
              by SwissDock / ADMETLab3 from SMILES strings
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Single source of truth</strong> —{" "}
              <span className="mono">public/data/compounds.json</span>, Zod-validated on every load
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
