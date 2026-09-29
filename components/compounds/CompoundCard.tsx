"use client";
import type { Compound } from "@/lib/compounds";
import {
  formatMW, formatLogP, formatTPSA, formatScore,
  predSkinVerdict,
} from "@/lib/utils";
import { PredSkinPill, RoleBadge, NotTestedBadge } from "@/components/ui/VerdictPills";
import Link from "next/link";
import { useState } from "react";

interface CompoundCardProps {
  compound: Compound;
}

function StructureImage({ src, alt, filter }: { src: string; alt: string; filter: string }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      {/* Thumbnail — click to zoom */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setZoomed(true); }}
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          filter,
          cursor: "zoom-in",
          transition: "transform 0.2s ease",
        }}
      />

      {/* Lightbox modal */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(8,11,18,0.92)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            padding: "2rem",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setZoomed(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "#21262d",
              border: "1px solid #30363d",
              borderRadius: 8,
              color: "#e2e8f0",
              fontSize: "1.25rem",
              cursor: "pointer",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>

          {/* Big structure */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid #21262d",
              borderRadius: 16,
              padding: "2rem",
              maxWidth: "min(600px, 90vw)",
              maxHeight: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: "100%",
                maxHeight: "60vh",
                filter,
              }}
            />
          </div>
          <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "1rem" }}>
            Click anywhere to close
          </p>
        </div>
      )}
    </>
  );
}

export function CompoundCard({ compound }: CompoundCardProps) {
  const { id, name, role, MW, logP, TPSA, docking, predskin, structure_svg } = compound;

  const imgSrc = structure_svg
    ?? `https://www.simolecule.com/cdkdepict/depict/bot/svg?smi=${encodeURIComponent(compound.smiles)}&w=500&h=350`;
  const imgFilter = structure_svg
    ? "invert(1) hue-rotate(180deg)"
    : "invert(1) hue-rotate(180deg) brightness(1.5)";

  return (
    <Link href={`/round1/candidates/${id}`} style={{ textDecoration: "none", display: "block" }}>
      <div className="card" style={{ height: "100%", cursor: "pointer" }}>
        {/* Structure image — click to zoom */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #21262d",
            borderRadius: 8,
            marginBottom: "1rem",
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <StructureImage src={imgSrc} alt={name} filter={imgFilter} />

          {/* Zoom hint badge */}
          <div
            style={{
              position: "absolute",
              bottom: 6,
              right: 8,
              fontSize: "0.6rem",
              color: "#334155",
              pointerEvents: "none",
            }}
          >
            🔍 click to zoom
          </div>
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
