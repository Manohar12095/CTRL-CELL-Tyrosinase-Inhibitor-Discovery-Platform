"use client";

import { useState, useEffect } from "react";

interface StructureViewerProps {
  smiles: string;
  name: string;
  structure_svg?: string;
  height?: number | string;
  showHint?: boolean;
}

export function StructureViewer({
  smiles,
  name,
  structure_svg,
  height = 220,
  showHint = true,
}: StructureViewerProps) {
  const [zoomed, setZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    if (!zoomed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomed]);

  // URL without fixed w/h forces CDK Depict to fit viewBox tightly to molecule bounds
  const imgSrc =
    structure_svg ??
    `https://www.simolecule.com/cdkdepict/depict/bot/svg?smi=${encodeURIComponent(smiles)}`;

  // Crisp high-contrast dark mode filter
  const imgFilter = structure_svg
    ? "invert(1) hue-rotate(180deg)"
    : "invert(1) hue-rotate(180deg) brightness(1.6) contrast(1.15)";

  const handleCopySmiles = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(smiles);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Container */}
      <div
        style={{
          background: "linear-gradient(180deg, rgba(22, 27, 34, 0.7) 0%, rgba(13, 17, 23, 0.9) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 10,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          cursor: "zoom-in",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setZoomed(true);
        }}
        title="Click to zoom structure"
      >
        {hasError ? (
          <div
            style={{
              padding: "1rem",
              textAlign: "center",
              color: "#64748b",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>⚗️</div>
            <div>{name}</div>
            <div style={{ fontSize: "0.65rem", color: "#475569", marginTop: "0.25rem" }}>
              {smiles}
            </div>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imgSrc}
            alt={`Chemical structure of ${name}`}
            onError={() => setHasError(true)}
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              padding: "0.85rem",
              filter: imgFilter,
              transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        )}

        {/* Zoom hint badge */}
        {showHint && !hasError && (
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              fontSize: "0.65rem",
              color: "#94a3b8",
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 6,
              padding: "2px 6px",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
              backdropFilter: "blur(4px)",
            }}
          >
            <span>🔍</span>
            <span>Zoom</span>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(3, 7, 18, 0.88)",
            backdropFilter: "blur(14px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            padding: "1.5rem",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setZoomed(false)}
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 10,
              color: "#f1f5f9",
              fontSize: "1.25rem",
              cursor: "pointer",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            aria-label="Close zoomed view"
          >
            ✕
          </button>

          {/* Modal Container */}
          <div
            style={{
              background: "radial-gradient(ellipse at center, #161b22 0%, #0d1117 100%)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(124, 58, 237, 0.2)",
              borderRadius: 20,
              padding: "2rem",
              width: "min(720px, 92vw)",
              height: "min(540px, 80vh)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "default",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f8fafc" }}>
                  {name}
                </span>
                <span style={{ fontSize: "0.75rem", color: "#a855f7", background: "rgba(168, 85, 247, 0.15)", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>
                  2D Chemical Structure
                </span>
              </div>
              <button
                onClick={handleCopySmiles}
                style={{
                  background: copied ? "#059669" : "#21262d",
                  border: "1px solid #30363d",
                  color: "#f1f5f9",
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  transition: "all 0.2s",
                }}
              >
                {copied ? "✓ Copied SMILES" : "📋 Copy SMILES"}
              </button>
            </div>

            {/* Structure Area */}
            <div
              style={{
                width: "100%",
                height: "calc(100% - 90px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
                alt={`Chemical structure of ${name}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: imgFilter,
                }}
              />
            </div>

            {/* Footer SMILES bar */}
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "0.75rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "#64748b",
              }}
            >
              <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: "1rem" }}>
                <span style={{ color: "#94a3b8", marginRight: "0.5rem" }}>SMILES:</span>
                <span style={{ color: "#cbd5e1" }}>{smiles}</span>
              </div>
              <div style={{ fontSize: "0.7rem", color: "#475569", flexShrink: 0 }}>
                Press ESC or click outside to close
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
