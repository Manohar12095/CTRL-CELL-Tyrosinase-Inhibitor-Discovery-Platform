import { type Compound, type PredSkinResult, type ProToxResult } from "./compounds";

// ─── Verdict classification ───────────────────────────────────────────────────

export type VerdictLevel = "safe" | "caution" | "danger" | "pending";

export function predSkinVerdict(predskin: PredSkinResult | null | undefined): VerdictLevel {
  if (!predskin) return "pending";
  const r = predskin.result.toLowerCase();
  if (r.includes("ghs 1a")) return "danger";
  if (r.includes("ghs 1b")) return "caution";
  if (r.includes("non-sensitizer") || r.includes("nc")) return "safe";
  return "pending";
}

export function proToxCarcinogenicityVerdict(protox: ProToxResult | null | undefined): VerdictLevel {
  if (!protox) return "pending";
  return protox.carcinogenicity.toLowerCase().startsWith("active") ? "danger" : "safe";
}

export function proToxClassVerdict(toxClass: number): VerdictLevel {
  if (toxClass <= 2) return "danger";
  if (toxClass === 3 || toxClass === 4) return "caution";
  return "safe"; // class 5 or 6
}

export function endpointVerdict(endpoint: string): VerdictLevel {
  if (endpoint.toLowerCase().startsWith("active")) return "danger";
  if (endpoint.toLowerCase().startsWith("inactive")) return "safe";
  return "pending";
}

// ─── KE breakdown parsing ─────────────────────────────────────────────────────

export interface ParsedKE {
  key: string;
  call: "sensitizer" | "non-sensitizer" | "unknown";
  confidence: number | null;
}

export function parseKEBreakdown(ke: Record<string, string>): ParsedKE[] {
  return Object.entries(ke).map(([key, value]) => {
    const lv = value.toLowerCase();
    const call: ParsedKE["call"] = lv.includes("non-sensitizer")
      ? "non-sensitizer"
      : lv.includes("sensitizer")
      ? "sensitizer"
      : "unknown";

    const match = value.match(/(\d+\.?\d*)%/);
    const confidence = match ? parseFloat(match[1]) : null;

    return { key, call, confidence };
  });
}

// ─── Formatting ───────────────────────────────────────────────────────────────

export function formatScore(score: number | null | undefined): string {
  if (score == null) return "—";
  return score.toFixed(3);
}

export function formatMW(mw: number | null | undefined): string {
  if (mw == null) return "—";
  return mw.toFixed(2);
}

export function formatLogP(logP: number | null | undefined): string {
  if (logP == null) return "—";
  return logP.toFixed(3);
}

export function formatTPSA(tpsa: number | null | undefined): string {
  if (tpsa == null) return "—";
  return tpsa.toFixed(2);
}

export function formatConfidence(confidence: number | null | undefined): string {
  if (confidence == null) return "—";
  return confidence.toFixed(1) + "%";
}

// ─── Toxicity class label ─────────────────────────────────────────────────────

export function toxClassLabel(cls: number): string {
  const labels: Record<number, string> = {
    1: "Class I — Fatal",
    2: "Class II — Fatal",
    3: "Class III — Toxic",
    4: "Class IV — Harmful",
    5: "Class V — May be harmful",
    6: "Class VI — Non-toxic",
  };
  return labels[cls] ?? `Class ${cls}`;
}

// ─── Role badge color ─────────────────────────────────────────────────────────

export function roleBadgeColor(role: string): string {
  if (role.toUpperCase().includes("LEAD")) return "amber";
  if (role.includes("backup")) return "blue";
  if (role.includes("reference")) return "purple";
  if (role.includes("scaffold")) return "slate";
  if (role.includes("mixture")) return "teal";
  if (role.includes("analog")) return "orange";
  return "slate";
}
