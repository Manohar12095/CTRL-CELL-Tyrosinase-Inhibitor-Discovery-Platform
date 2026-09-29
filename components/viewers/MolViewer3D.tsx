"use client";
import { useEffect, useRef, useState } from "react";

interface MolViewer3DProps {
  pdbId?: string;
  pdbUrl?: string;
  height?: number;
  showDockingBox?: boolean;
  ligandPending?: boolean;
  label?: string;
}

export function MolViewer3D({
  pdbId = "2Y9X",
  pdbUrl,
  height = 450,
  showDockingBox = false,
  ligandPending = false,
  label,
}: MolViewer3DProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const viewerInstance = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    async function initViewer() {
      if (!viewerRef.current) return;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const $3Dmol = (window as any).$3Dmol;

        if (!$3Dmol) {
            throw new Error("3Dmol.js library not loaded yet.");
        }

        if (cancelled) return;

        // Clear any previous viewer
        viewerRef.current.innerHTML = "";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const viewer = $3Dmol.createViewer(viewerRef.current, {
          backgroundColor: "0x0d1117",
          antialias: true,
          id: "molviewer-" + pdbId,
        }) as any;

        viewerInstance.current = viewer;

        // Fetch PDB data
        const url = pdbUrl ?? `https://files.rcsb.org/download/${pdbId}.pdb`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch PDB: ${response.status}`);
        const pdbData = await response.text();

        if (cancelled) return;

        viewer.addModel(pdbData, "pdb");

        // Cartoon for the protein backbone — spectrum coloring
        viewer.setStyle(
          { hetflag: false },
          { cartoon: { color: "spectrum", opacity: 0.9 } }
        );

        // Copper ions — large brown spheres, very visible
        viewer.setStyle(
          { elem: "CU" },
          { sphere: { radius: 1.1, color: "#b87333" } }
        );

        // Coordinating histidine residues — blue sticks
        // His61, His85, His94 (CuA) and His259, His263, His296 (CuB) in chain A
        viewer.setStyle(
          { resi: [61, 85, 94, 259, 263, 296] },
          { stick: { colorscheme: "blueCarbon", radius: 0.3 } }
        );

        // Docking box wireframe overlay
        if (showDockingBox) {
          viewer.addBox({
            center: { x: -10, y: -25, z: -40 },
            dimensions: { w: 20, h: 20, d: 20 },
            color: "0x7c3aed",
            opacity: 0.2,
            wireframe: true,
          });
        }

        // Zoom to copper ions first, then zoom out a bit
        viewer.zoomTo({ elem: "CU" });
        viewer.zoom(0.75);
        viewer.render();

        if (!cancelled) setLoading(false);
      } catch (err: unknown) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("3D viewer error:", msg);
          setError(
            msg.includes("fetch") || msg.includes("Failed")
              ? "Could not load PDB structure from RCSB. Check your internet connection."
              : `Viewer error: ${msg}`
          );
          setLoading(false);
        }
      }
    }

    initViewer();

    return () => {
      cancelled = true;
    };
  }, [pdbId, pdbUrl, showDockingBox]);

  return (
    <div style={{ position: "relative" }}>
      <div
        className="viewer-container"
        style={{ height, position: "relative", overflow: "hidden" }}
      >
        {/* Loading state */}
        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "0.75rem",
              background: "#0d1117",
              zIndex: 10,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                border: "3px solid #21262d",
                borderTopColor: "#7c3aed",
                borderRadius: "50%",
                animation: "viewer-spin 0.8s linear infinite",
              }}
            />
            <span style={{ color: "#64748b", fontSize: "0.8125rem" }}>
              Loading {pdbId}…
            </span>
            <span style={{ color: "#334155", fontSize: "0.7rem" }}>
              Fetching from RCSB Protein Data Bank
            </span>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "0.5rem",
              background: "#0d1117",
              borderRadius: 12,
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "2rem" }}>⚠</span>
            <span style={{ color: "#f59e0b", fontSize: "0.875rem", fontWeight: 600 }}>
              3D Viewer Error
            </span>
            <span style={{ color: "#64748b", fontSize: "0.8125rem", maxWidth: 360 }}>
              {error}
            </span>
          </div>
        )}

        {/* 3Dmol target div */}
        <div
          ref={viewerRef}
          style={{ width: "100%", height: "100%", borderRadius: 12, overflow: "hidden" }}
        />

        {/* Ligand pending badge */}
        {ligandPending && !loading && !error && (
          <div
            style={{
              position: "absolute",
              bottom: "0.75rem",
              right: "0.75rem",
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: 8,
              padding: "0.35rem 0.65rem",
              fontSize: "0.7rem",
              color: "#fbbf24",
              backdropFilter: "blur(8px)",
              fontFamily: "var(--font-mono)",
            }}
          >
            ⏳ Ligand pose file pending
          </div>
        )}

        {/* Structure label */}
        {label && !loading && !error && (
          <div
            style={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              background: "rgba(13,17,23,0.85)",
              border: "1px solid #21262d",
              borderRadius: 6,
              padding: "0.25rem 0.6rem",
              fontSize: "0.7rem",
              color: "#94a3b8",
              backdropFilter: "blur(8px)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {label}
          </div>
        )}

        {/* Legend (shown when loaded) */}
        {!loading && !error && (
          <div
            style={{
              position: "absolute",
              bottom: "0.75rem",
              left: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {[
              { color: "#b87333", label: "Cu²⁺ ions" },
              { color: "#60a5fa", label: "Coordinating His" },
              ...(showDockingBox ? [{ color: "#7c3aed", label: "Docking box" }] : []),
            ].map(({ color, label: l }) => (
              <div
                key={l}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  background: "rgba(13,17,23,0.8)",
                  borderRadius: 4,
                  padding: "0.15rem 0.45rem",
                  fontSize: "0.65rem",
                  color: "#94a3b8",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: color,
                    flexShrink: 0,
                  }}
                />
                {l}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes viewer-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
