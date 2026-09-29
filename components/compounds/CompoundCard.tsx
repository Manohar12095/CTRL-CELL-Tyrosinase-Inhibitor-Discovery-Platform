"use client";

import type { Compound } from "@/lib/compounds";
import {
  formatMW, formatLogP, formatTPSA, formatScore,
} from "@/lib/utils";
import { PredSkinPill, RoleBadge, NotTestedBadge } from "@/components/ui/VerdictPills";
import { StructureViewer } from "./StructureViewer";
import Link from "next/link";

interface CompoundCardProps {
  compound: Compound;
}

export function CompoundCard({ compound }: CompoundCardProps) {
  const { id, name, role, MW, logP, TPSA, docking, predskin, structure_svg, smiles } = compound;

  return (
    <Link href={`/round1/candidates/${id}`} style={{ textDecoration: "none", display: "block" }}>
      <div className="card" style={{ height: "100%", cursor: "pointer" }}>
        {/* Structure image with auto-scaling & click-to-zoom modal */}
        <div style={{ marginBottom: "1rem" }}>
          <StructureViewer
            smiles={smiles}
            name={name}
            structure_svg={structure_svg}
            height={220}
            showHint={true}
          />
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
            padding: "0.75rem",
            background: "rgba(255,255,255,0.02)",
            borderRadius: 8,
          }}
        >
          {[
            { label: "MW", value: formatMW(MW) },
            { label: "LOGP", value: formatLogP(logP) },
            { label: "TPSA", value: formatTPSA(TPSA) },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.6rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {label}
              </div>
              <div className="mono" style={{ fontSize: "0.8125rem", color: "#e2e8f0", fontWeight: 700, marginTop: 2 }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Docking & PredSkin */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Docking ΔG
            </span>
            {docking ? (
              <span className="mono" style={{ fontSize: "0.8125rem", color: "#fbbf24", fontWeight: 700 }}>
                {formatScore(docking.best_score_kcal_mol)} kcal/mol
              </span>
            ) : (
              <NotTestedBadge />
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              PredSkin
            </span>
            {predskin ? (
              <PredSkinPill result={predskin.result} />
            ) : (
              <NotTestedBadge label="— Not yet tested" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
