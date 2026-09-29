import { z } from "zod";

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

export const DockingResultSchema = z.object({
  tool: z.string(),
  target: z.string(),
  best_score_kcal_mol: z.number(),
  n_clusters: z.number(),
  note: z.string().optional(),
});

export const KEBreakdownSchema = z.record(z.string(), z.string());

export const PredSkinResultSchema = z.object({
  result: z.string(),
  confidence: z.number(),
  ke_breakdown: KEBreakdownSchema,
  note: z.string().optional(),
});

export const ProToxResultSchema = z.object({
  LD50_mg_kg: z.number(),
  toxicity_class: z.number(),
  hepatotoxicity: z.string(),
  carcinogenicity: z.string(),
  immunotoxicity: z.string(),
  mutagenicity: z.string(),
  cytotoxicity: z.string(),
});

// ─── Main compound schema ─────────────────────────────────────────────────────

export const CompoundSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  smiles: z.string(),
  MW: z.number().nullable().optional(),
  logP: z.number().nullable().optional(),
  TPSA: z.number().nullable().optional(),
  docking: DockingResultSchema.nullable(),
  predskin: PredSkinResultSchema.nullable(),
  predskin_note: z.string().optional(),
  protox: ProToxResultSchema.nullable(),
  structure_svg: z.string().optional(),
});

export const CompoundsArraySchema = z.array(CompoundSchema);

// ─── Inferred types ───────────────────────────────────────────────────────────

export type DockingResult = z.infer<typeof DockingResultSchema>;
export type KEBreakdown = z.infer<typeof KEBreakdownSchema>;
export type PredSkinResult = z.infer<typeof PredSkinResultSchema>;
export type ProToxResult = z.infer<typeof ProToxResultSchema>;
export type Compound = z.infer<typeof CompoundSchema>;

// ─── Data loader ─────────────────────────────────────────────────────────────

let _cache: Compound[] | null = null;

export async function getCompounds(): Promise<Compound[]> {
  if (_cache) return _cache;

  // Server-side: read from filesystem
  if (typeof window === "undefined") {
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");
    const filePath = join(process.cwd(), "public", "data", "compounds.json");
    const raw = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    const result = CompoundsArraySchema.safeParse(parsed);
    if (!result.success) {
      console.error("compounds.json validation errors:", result.error.format());
      throw new Error("compounds.json failed Zod validation — check console");
    }
    _cache = result.data;
    return _cache;
  }

  // Client-side: fetch from public/data
  const res = await fetch("/data/compounds.json");
  if (!res.ok) throw new Error("Failed to fetch compounds.json");
  const parsed = await res.json();
  const result = CompoundsArraySchema.safeParse(parsed);
  if (!result.success) {
    console.error("compounds.json validation errors:", result.error.format());
    throw new Error("compounds.json failed Zod validation — check console");
  }
  _cache = result.data;
  return _cache;
}

export async function getCompound(id: string): Promise<Compound | undefined> {
  const compounds = await getCompounds();
  return compounds.find((c) => c.id === id);
}

export function getDocketedCompounds(compounds: Compound[]): Compound[] {
  return compounds.filter((c) => c.docking !== null);
}

export function getPredSkinTested(compounds: Compound[]): Compound[] {
  return compounds.filter((c) => c.predskin !== null);
}

export function getProToxTested(compounds: Compound[]): Compound[] {
  return compounds.filter((c) => c.protox !== null);
}
