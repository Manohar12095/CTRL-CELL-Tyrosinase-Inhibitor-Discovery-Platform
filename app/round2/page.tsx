import type { Metadata } from "next";
import Link from "next/link";
import { getCompounds } from "@/lib/compounds";

export const metadata: Metadata = {
  title: "Round 2 — The Curveball | CTRL+CELL",
  description:
    "Two live constraints on our Round 1 lead candidate: a skin-sensitization safety flag and a competitor novelty challenge. Honest assessment and response.",
};

export default async function Round2Page() {
  const compounds = await getCompounds();
  const lead = compounds.find((c) => c.id === "PHMALT-01");

  return (
    <div className="page-container">
      <div className="animate-fade-up" style={{ marginBottom: "3rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <span className="pill pill-caution">Round 2</span>
          <span style={{ color: "#475569", fontSize: "0.875rem" }}>The Curveball</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(1.75rem, 5vw, 3rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}
        >
          <span style={{ color: "#fbbf24" }}>Two Constraints.</span>
          <br />
          <span style={{ color: "#e2e8f0" }}>One Honest Answer.</span>
        </h1>

        <p style={{ color: "#94a3b8", maxWidth: 680, lineHeight: 1.7, fontSize: "1.0625rem" }}>
          After Round 1, our lead candidate Phenylmaltol faces two live challenges. We present
          the data as it stands — including the parts that are inconvenient.
        </p>
      </div>

      {/* Two constraints */}
      <div className="section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          {/* Constraint 1 */}
          <div className="card" style={{ borderLeft: "3px solid #f59e0b", background: "rgba(245,158,11,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.25rem" }}>⚠</span>
              <span className="pill pill-caution">Constraint 1</span>
            </div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fbbf24", marginBottom: "0.5rem" }}>
              Skin-Sensitization Safety Flag
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
              PredSkin AOP predicts Phenylmaltol as a{" "}
              <strong style={{ color: "#fbbf24" }}>GHS 1B low-potency sensitizer</strong> (
              <span className="mono">66.0%</span> confidence). KeratinoSens and AO_PredSkin both
              call sensitizer. This is our own data — we cannot dismiss it.
            </p>
            <Link
              href="/round2/safety-review"
              style={{ display: "inline-block", marginTop: "0.75rem", fontSize: "0.8125rem", color: "#f59e0b", textDecoration: "none" }}
            >
              Full safety review →
            </Link>
          </div>

          {/* Constraint 2 */}
          <div className="card" style={{ borderLeft: "3px solid #6b7280", background: "rgba(107,114,128,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.25rem" }}>📝</span>
              <span className="pill pill-pending">Constraint 2</span>
            </div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
              Competitor Novelty Challenge
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
              A competitor has published a scaffold that may overlap with ours. We need a
              structural comparison to assess freedom-to-operate. Literature review is in
              progress — we do not fabricate comparisons.
            </p>
            <Link
              href="/round2/novelty-review"
              style={{ display: "inline-block", marginTop: "0.75rem", fontSize: "0.8125rem", color: "#94a3b8", textDecoration: "none" }}
            >
              View research status →
            </Link>
          </div>
        </div>
      </div>

      {/* Headline finding */}
      <div className="section">
        <div
          style={{
            background: "rgba(245,158,11,0.06)",
            border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: 12,
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fbbf24", marginBottom: "0.75rem" }}>
            Our Headline Finding: Lead with Honesty, Not Defensiveness
          </h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            Our own PredSkin data already shows the sensitization risk is real for our lead
            candidate. Rather than explaining it away, we have examined the AOP data in detail,
            compared it to our other candidates, and identified a clear evidence-backed pivot
            path. Phenylmaltol remains the best-docked compound, but the safety flag is
            genuine — and our response to it is grounded in actual data, not speculation.
          </p>
        </div>
      </div>

      {/* Nav cards */}
      <div className="section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {[
            {
              href: "/round2/safety-review",
              title: "Safety Review",
              desc: "AOP breakdown for PHMALT-01 and BZMALT-01 — both GHS 1B. Mixture effect (MIX-01).",
              icon: "🔬",
              color: "#f59e0b",
            },
            {
              href: "/round2/novelty-review",
              title: "Novelty Review",
              desc: "Competitor scaffold comparison — literature review in progress.",
              icon: "📚",
              color: "#6b7280",
            },
            {
              href: "/round2/decision",
              title: "Decision: Pivot?",
              desc: "Defend Phenylmaltol or pivot to Ethylmaltol/Kojic acid? Evidence-based analysis.",
              icon: "⚖️",
              color: "#7c3aed",
            },
            {
              href: "/round2/addendum",
              title: "Addendum Document",
              desc: "Formal addendum: what changed, what we found, and our reasoning.",
              icon: "📄",
              color: "#06b6d4",
            },
          ].map(({ href, title, desc, icon, color }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div className="card" style={{ height: "100%", borderLeft: `3px solid ${color}33` }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
                <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "0.375rem" }}>{title}</div>
                <div style={{ fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
