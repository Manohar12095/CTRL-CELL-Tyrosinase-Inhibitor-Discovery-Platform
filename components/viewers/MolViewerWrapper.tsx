"use client";
import dynamic from "next/dynamic";

// This wrapper lives in a Client Component so ssr: false is allowed
const MolViewer3DLazy = dynamic(
  () => import("@/components/viewers/MolViewer3D").then((m) => m.MolViewer3D),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 450,
          background: "#0d1117",
          border: "1px solid #21262d",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#475569", fontSize: "0.8125rem" }}>Loading 3D viewer…</span>
      </div>
    ),
  }
);

interface Props {
  pdbId?: string;
  pdbUrl?: string;
  height?: number;
  showDockingBox?: boolean;
  ligandPending?: boolean;
  label?: string;
}

export function MolViewerWrapper(props: Props) {
  return <MolViewer3DLazy {...props} />;
}
