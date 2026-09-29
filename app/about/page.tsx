import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Team | CTRL+CELL",
  description: "Team info for the CTRL+CELL Tyrosinase Inhibitor Discovery platform.",
};

export default function AboutPage() {
  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          About the Team
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 640, lineHeight: 1.7 }}>
          The team behind the CTRL+CELL Tyrosinase Inhibitor Discovery platform.
        </p>
      </div>

      <div className="section">
        <div className="card-elevated">
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>👥</div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#c4b5fd", marginBottom: "1.5rem" }}>
            Team "Ctrl+Cell"
          </h2>
          <div style={{ display: "grid", gap: "1rem", maxWidth: "400px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #21262d", paddingBottom: "0.5rem" }}>
              <span style={{ color: "#94a3b8", fontWeight: 600 }}>Team Leader</span>
              <span style={{ color: "#e2e8f0" }}>S.Aakila Fouzia</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #21262d", paddingBottom: "0.5rem" }}>
              <span style={{ color: "#94a3b8", fontWeight: 600 }}>CO Leader</span>
              <span style={{ color: "#e2e8f0" }}>M. Kirthiga</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #21262d", paddingBottom: "0.5rem" }}>
              <span style={{ color: "#94a3b8", fontWeight: 600 }}>Tech Lead</span>
              <span style={{ color: "#e2e8f0", textAlign: "right" }}>S.Manohar<br /><span style={{ fontSize: "0.75rem", color: "#64748b" }}>(Creator of this webpage)</span></span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #21262d", paddingBottom: "0.5rem" }}>
              <span style={{ color: "#94a3b8", fontWeight: 600 }}>Core lead</span>
              <span style={{ color: "#e2e8f0" }}>J. JannaniPriya</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
