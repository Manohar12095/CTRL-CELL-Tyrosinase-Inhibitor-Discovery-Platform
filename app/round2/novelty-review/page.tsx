import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novelty Review — Competitor Scaffold | CTRL+CELL Round 2",
  description: "Structural comparison with competitor published scaffold — literature review in progress.",
};

export default function NoveltyReviewPage() {
  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "2rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span className="pill pill-caution">Round 2</span>
          <span style={{ color: "#475569" }}>→</span>
          <span className="pill pill-slate">Novelty Review</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
          Novelty Review
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 640, lineHeight: 1.7 }}>
          Structural comparison with the competitor&apos;s published scaffold — assessing
          novelty and freedom-to-operate for our maltol-scaffold series.
        </p>
      </div>

      {/* Novel Key Points Section */}
      <div className="section animate-fade-up" style={{ animationDelay: "100ms" }}>
        <div className="card-elevated" style={{ borderColor: "rgba(124, 58, 237, 0.4)", background: "rgba(124, 58, 237, 0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "1.5rem" }}>💡</span>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#c4b5fd", margin: 0 }}>
              Novel Key Points & Claims
            </h2>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            <div style={{ background: "rgba(13,17,23,0.5)", border: "1px solid #21262d", padding: "1.25rem", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                1. Novel Substitution Pattern
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                The specific substitution position and pattern — <strong>6-phenyl and 6-benzyl on unmodified maltol</strong> — doesn't appear in any patent or paper found, including the closest analogs (allomaltol rearranges the ring instead; kojic acid derivatives use a different ring and attach at C2, not C6).
              </p>
            </div>

            <div style={{ background: "rgba(13,17,23,0.5)", border: "1px solid #21262d", padding: "1.25rem", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                2. Structure-Based Design Rationale
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                The design rationale is derived from our own measured pocket geometry, not copied from a paper. We picked the aryl-arm position because our own docking of tropolone showed exactly which residues (<strong>Phe264, Phe292</strong>) form an underused hydrophobic wall — that's a structure-based justification, which is different from the older patents, which describe empirical substituent screening without citing a specific crystal structure or docking result.
              </p>
            </div>

            <div style={{ background: "rgba(13,17,23,0.5)", border: "1px solid #21262d", padding: "1.25rem", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                3. Comprehensive Methodological Comparison
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                We ran a same-method comparison against multiple real market inhibitors (tropolone, kojic acid, hydroquinone, maltol) on one receptor and one docking protocol — most of the older patents only compare against kojic acid in a single wet-lab assay, not a computational pocket-level comparison across several references at once.
              </p>
            </div>

            <div style={{ background: "rgba(13,17,23,0.5)", border: "1px solid #21262d", padding: "1.25rem", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                4. Methodological Rigor & Artifact Correction
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                We caught and corrected an off-target docking artifact (the top-ranked pose vs. the real active-site pose) that a less careful project would have reported as the headline number — this is a methodological contribution, not a chemistry one, but it's real and defensible.
              </p>
            </div>

            <div style={{ background: "rgba(13,17,23,0.5)", border: "1px solid #21262d", padding: "1.25rem", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                5. Rigorous In-Silico Safety Screening
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                We ran a dedicated skin-sensitization structural-alert screen (<strong>ADMETLab3 / PredSkin</strong>) that the older patents don't report at all — several of those patents only mention "no mutagenicity" or general dermatological testing, not a modern in-silico sensitization domain check. This is arguably more rigorous safety screening than what got some of these older ingredients into products in the first place.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
