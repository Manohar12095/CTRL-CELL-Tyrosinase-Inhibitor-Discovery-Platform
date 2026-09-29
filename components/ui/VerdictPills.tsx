import type { VerdictLevel } from "@/lib/utils";

interface VerdictPillProps {
  verdict: VerdictLevel;
  label?: string;
  size?: "sm" | "md";
}

const verdictConfig: Record<VerdictLevel, { label: string; className: string; icon: string }> = {
  safe: { label: "Safe", className: "pill pill-safe", icon: "✓" },
  caution: { label: "Caution", className: "pill pill-caution", icon: "⚠" },
  danger: { label: "Active", className: "pill pill-danger", icon: "✗" },
  pending: { label: "Not tested", className: "pill pill-pending", icon: "—" },
};

export function VerdictPill({ verdict, label, size = "md" }: VerdictPillProps) {
  const config = verdictConfig[verdict];
  return (
    <span
      className={config.className}
      style={{ fontSize: size === "sm" ? "0.7rem" : "0.75rem" }}
    >
      <span>{config.icon}</span>
      <span>{label ?? config.label}</span>
    </span>
  );
}

interface PredSkinPillProps {
  result: string | null;
  confidence?: number | null;
}

export function PredSkinPill({ result, confidence }: PredSkinPillProps) {
  if (!result) {
    return <span className="pill pill-pending">— Not yet tested</span>;
  }

  const r = result.toLowerCase();
  const isPillDanger = r.includes("ghs 1a");
  const isPillCaution = r.includes("ghs 1b");
  const isPillSafe = r.includes("non-sensitizer") || r.includes("nc");

  const cls = isPillDanger
    ? "pill pill-danger"
    : isPillCaution
    ? "pill pill-caution"
    : isPillSafe
    ? "pill pill-safe"
    : "pill pill-pending";

  const icon = isPillDanger ? "✗" : isPillCaution ? "⚠" : isPillSafe ? "✓" : "?";

  return (
    <span className={cls}>
      <span>{icon}</span>
      <span style={{ fontFamily: "var(--font-mono)" }}>
        {result}
        {confidence != null && ` (${confidence.toFixed(1)}%)`}
      </span>
    </span>
  );
}

interface ProToxEndpointPillProps {
  value: string | null;
}

export function ProToxEndpointPill({ value }: ProToxEndpointPillProps) {
  if (!value) return <span className="pill pill-pending">— Not run</span>;

  const isActive = value.toLowerCase().startsWith("active");
  const cls = isActive ? "pill pill-danger" : "pill pill-safe";
  const icon = isActive ? "✗" : "✓";

  return (
    <span className={cls} style={{ fontFamily: "var(--font-mono)" }}>
      <span>{icon}</span>
      <span>{value}</span>
    </span>
  );
}

interface RoleBadgeProps {
  role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const isLead = role.toUpperCase().includes("LEAD");
  const isBackup = role.includes("backup");
  const isRef = role.includes("reference");
  const isMix = role.includes("mixture");
  const isAnalog = role.includes("analog");
  const isScaffold = role.includes("scaffold");

  const cls = isLead
    ? "pill pill-lead"
    : isBackup
    ? "pill pill-blue"
    : isRef
    ? "pill pill-purple"
    : isMix
    ? "pill pill-teal"
    : isAnalog
    ? "pill pill-orange"
    : "pill pill-slate";

  const shortLabel = isLead
    ? "Lead Candidate"
    : isBackup
    ? "Backup Candidate"
    : isRef
    ? "Reference"
    : isMix
    ? "Mixture Test"
    : isAnalog
    ? "Structural Analog"
    : isScaffold
    ? "Scaffold Parent"
    : role;

  return <span className={cls}>{shortLabel}</span>;
}

export function NotTestedBadge({ label = "Not yet tested" }: { label?: string }) {
  return <span className="pill pill-pending">{label}</span>;
}

export function PendingBadge({ label = "Pending" }: { label?: string }) {
  return (
    <span
      className="pill pill-caution"
      style={{ borderStyle: "dashed" }}
    >
      ⏳ {label}
    </span>
  );
}
