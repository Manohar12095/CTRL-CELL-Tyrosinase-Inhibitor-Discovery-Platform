import type { Metadata } from "next";
import Link from "next/link";
import { getCompounds } from "@/lib/compounds";

export const metadata: Metadata = {
  title: "Round 1 — Candidate Dossier | CTRL+CELL",
  description:
    "Identification of tyrosinase (PPO) as the enzyme behind produce browning and skin pigmentation, and computational screening of inhibitor candidates.",
};

export default async function Round1Page() {
  const compounds = await getCompounds();
  const docked = compounds.filter((c) => c.docking !== null);
  const lead = compounds.find((c) => c.id === "PHMALT-01");
  const tropolone = compounds.find((c) => c.id === "TROP-01");

  return (
    <div className="page-container">
      {/* Hero */}
      <div className="animate-fade-up" style={{ marginBottom: "3rem", paddingTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <span className="pill pill-purple">Round 1</span>
          <span style={{ color: "#475569", fontSize: "0.875rem" }}>Candidate Dossier</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}
        >
          <span className="gradient-text">Stopping the Browning</span>
          <br />
          <span style={{ color: "#e2e8f0" }}>Tyrosinase Inhibitor Discovery</span>
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: "#94a3b8",
            maxWidth: 700,
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          Enzymatic browning in cut produce and skin hyperpigmentation share a single
          molecular culprit: <strong style={{ color: "#e2e8f0" }}>tyrosinase (PPO)</strong>.
          We identified, docked, and evaluated a library of inhibitor candidates against
          mushroom tyrosinase (PDB: <span className="mono">2Y9X</span>).
        </p>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {[
            { label: "Compounds screened", value: compounds.length.toString(), color: "#7c3aed" },
            { label: "Docking runs completed", value: docked.length.toString(), color: "#06b6d4" },
            {
              label: "Lead candidate ΔG",
              value: `${lead?.docking?.best_score_kcal_mol?.toFixed(3) ?? "—"} kcal/mol`,
              color: "#7c3aed",
            },
            {
              label: "Reference (Tropolone) ΔG",
              value: `${tropolone?.docking?.best_score_kcal_mol?.toFixed(3) ?? "—"} kcal/mol`,
              color: "#475569",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="card-elevated"
              style={{ minWidth: 180, flex: "1 1 180px" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color,
                  marginBottom: "0.25rem",
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "#64748b" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Nav cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              href: "/round1/target",
              title: "Target: 2Y9X",
              desc: "Mushroom tyrosinase active site, copper coordination, docking box",
              icon: "🎯",
            },
            {
              href: "/round1/candidates",
              title: "Compound Library",
              desc: `${compounds.length} candidates — structures, descriptors, scores`,
              icon: "🧪",
            },
            {
              href: "/round1/docking",
              title: "Docking Results",
              desc: "Phenylmaltol vs Tropolone — SwissDock comparison",
              icon: "⚗️",
            },
            {
              href: "/round1/safety",
              title: "Safety Profile",
              desc: "PredSkin sensitization + ProTox toxicity across all compounds",
              icon: "🛡️",
            },
            {
              href: "/round1/dossier",
              title: "Full Dossier",
              desc: "Formatted report with all findings — download PDF",
              icon: "📄",
            },
          ].map(({ href, title, desc, icon }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div className="card animate-fade-up" style={{ height: "100%" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{icon}</div>
                <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "0.375rem" }}>
                  {title}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Problem statement */}
      <div className="section">
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1.25rem" }}>
          The Shared Enzyme Hypothesis
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              title: "Produce Browning",
              body:
                "When fruits and vegetables are cut, tyrosinase (polyphenol oxidase, PPO) oxidises phenolic substrates to quinones, which polymerise to brown melanins. This causes food waste and significant economic loss.",
              color: "#f59e0b",
            },
            {
              title: "Skin Hyperpigmentation",
              body:
                "In melanocytes, tyrosinase is the rate-limiting enzyme in melanin biosynthesis (L-DOPA → dopaquinone). Overactive tyrosinase leads to conditions such as melasma, post-inflammatory hyperpigmentation, and age spots.",
              color: "#7c3aed",
            },
            {
              title: "One Target, Two Problems",
              body:
                "Both pathways share the same enzyme class. An effective, safe tyrosinase inhibitor addresses food preservation and cosmetic/dermatological applications simultaneously.",
              color: "#06b6d4",
            },
          ].map(({ title, body, color }) => (
            <div
              key={title}
              className="card-elevated"
              style={{ borderLeft: `3px solid ${color}` }}
            >
              <h3 style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>{title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why not tropolone */}
      <div className="section">
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Why Current Inhibitors Fall Short
        </h2>
        <div className="alert alert-danger">
          <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>⚠</span>
          <div>
            <strong>Tropolone — the market comparator — carries a ProTox carcinogenicity flag.</strong>
            <br />
            <span style={{ fontSize: "0.875rem", marginTop: "0.25rem", display: "block" }}>
              Our ProTox-3.0 assessment of Tropolone returned{" "}
              <span className="mono" style={{ color: "#fca5a5" }}>ACTIVE 0.55</span> for
              carcinogenicity (LD₅₀ = <span className="mono">385 mg/kg</span>, Toxicity Class IV).
              This makes it unsuitable as a safe commercial ingredient, motivating our search for
              alternatives. See the{" "}
              <Link href="/round1/safety" style={{ color: "#f87171" }}>
                full safety profile
              </Link>
              .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
