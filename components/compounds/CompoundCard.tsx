import type { Compound } from "@/lib/compounds";
import {
  formatMW, formatLogP, formatTPSA, formatScore,
  predSkinVerdict,
} from "@/lib/utils";
import { PredSkinPill, RoleBadge, NotTestedBadge } from "@/components/ui/VerdictPills";
import Link from "next/link";

interface CompoundCardProps {
  compound: Compound;
}

export function CompoundCard({ compound }: CompoundCardProps) {
  const { id, name, role, MW, logP, TPSA, docking, predskin, structure_svg } = compound;

  return (
    <Link href={`/round1/candidates/${id}`} style={{ textDecoration: "none", display: "block" }}>
      <div className="card" style={{ height: "100%", cursor: "pointer" }}>
        {/* Structure image */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #21262d",
            borderRadius: 8,
            marginBottom: "1rem",
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {structure_svg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={structure_svg}
              alt={`2D structure of ${name}`}
              style={{ maxHeight: "100%", maxWidth: "100%", filter: "invert(1) hue-rotate(180deg)" }}
            />
          ) : (
            <img
              src={`https://www.simolecule.com/cdkdepict/depict/bot/svg?smi=${encodeURIComponent(compound.smiles)}&w=300&h=200`}
              alt={name}
              style={{ maxHeight: "100%", maxWidth: "100%", filter: "invert(1) hue-rotate(180deg) brightness(1.5)" }}
            />
          )}
        </div>

        {/* Name + role */}
        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#e2e8f0", margin: 0 }}>
              {name}
            </h3>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "#475569",
                flexShrink: 0,
              }}
            >
              {id}
            </span>
          </div>
          <RoleBadge role={role} />
        </div>

        {/* Descriptors */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          {[
            { label: "MW", value: MW != null ? `${formatMW(MW)} Da` : "—" },
            { label: "logP", value: formatLogP(logP) },
            { label: "TPSA", value: TPSA != null ? `${formatTPSA(TPSA)} Å²` : "—" },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  color: "#94a3b8",
                  fontWeight: 600,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Docking score */}
        <div
          style={{
            paddingTop: "0.75rem",
            borderTop: "1px solid #21262d",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Docking ΔG
          </span>
          {docking ? (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#7c3aed",
              }}
            >
              {formatScore(docking.best_score_kcal_mol)} kcal/mol
            </span>
          ) : (
            <NotTestedBadge />
          )}
        </div>

        {/* PredSkin row */}
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            PredSkin
          </span>
          <PredSkinPill result={predskin?.result ?? null} confidence={predskin?.confidence} />
        </div>
      </div>
    </Link>
  );
}
