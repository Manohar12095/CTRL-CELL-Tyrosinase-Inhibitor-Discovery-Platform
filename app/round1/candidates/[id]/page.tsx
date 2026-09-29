import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompound, getCompounds } from "@/lib/compounds";
import {
  formatMW, formatLogP, formatTPSA, formatScore, formatConfidence,
  parseKEBreakdown, toxClassLabel, proToxClassVerdict, endpointVerdict,
} from "@/lib/utils";
import {
  PredSkinPill, ProToxEndpointPill, RoleBadge, NotTestedBadge,
} from "@/components/ui/VerdictPills";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const compounds = await getCompounds();
  return compounds.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const compound = await getCompound(id);
  if (!compound) return { title: "Not Found | CTRL+CELL" };
  return {
    title: `${compound.name} (${compound.id}) | CTRL+CELL`,
    description: `Full data for ${compound.name}: docking score, PredSkin sensitization, and ProTox toxicity.`,
  };
}

export default async function CompoundDetailPage({ params }: Props) {
  const { id } = await params;
  const compound = await getCompound(id);
  if (!compound) notFound();

  const {
    name, role, smiles, MW, logP, TPSA, docking, predskin, predskin_note, protox, structure_svg,
  } = compound;

  const keEntries = predskin ? parseKEBreakdown(predskin.ke_breakdown) : [];
  const isLead = id === "PHMALT-01";

  return (
    <div className="page-container">
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", paddingTop: "1rem", fontSize: "0.875rem", color: "#475569" }}>
        <Link href="/round1" style={{ color: "#7c3aed", textDecoration: "none" }}>Round 1</Link>
        <span>→</span>
        <Link href="/round1/candidates" style={{ color: "#7c3aed", textDecoration: "none" }}>Compounds</Link>
        <span>→</span>
        <span className="mono" style={{ color: "#94a3b8" }}>{id}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#e2e8f0", margin: 0 }}>{name}</h1>
          <span className="mono" style={{ color: "#475569", fontSize: "0.875rem" }}>{id}</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
          <RoleBadge role={role} />
          {isLead && (
            <span className="pill pill-lead" style={{ borderStyle: "dashed" }}>
              ⭐ Round 1 Lead
            </span>
          )}
        </div>
        <p style={{ color: "#64748b", fontSize: "0.875rem", maxWidth: 700, lineHeight: 1.6 }}>{role}</p>
      </div>

      {/* SwissDock job name flag for PHMALT-01 */}
      {isLead && docking?.note && (
        <div className="alert alert-warning" style={{ marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "1.125rem" }}>⚠</span>
          <div>
            <strong>Docking job filename note:</strong>{" "}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
              {docking.note}
            </span>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Structure */}
        <div className="card-elevated">
          <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#94a3b8", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            2D Structure
          </h2>
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid #21262d",
              borderRadius: 8,
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.75rem",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={structure_svg ?? `https://www.simolecule.com/cdkdepict/depict/bot/svg?smi=${encodeURIComponent(smiles)}&w=600&h=400`}
              alt={`2D structure of ${name}`}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                filter: structure_svg
                  ? "invert(1) hue-rotate(180deg)"
                  : "invert(1) hue-rotate(180deg) brightness(1.5)",
              }}
            />
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#334155", wordBreak: "break-all" }}>
            SMILES: {smiles}
          </div>
        </div>

        {/* Descriptors */}
        <div className="card-elevated">
          <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#94a3b8", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Physicochemical Descriptors
          </h2>
          <table className="data-table">
            <tbody>
              {[
                { label: "Molecular Weight", value: MW != null ? `${formatMW(MW)} Da` : "—" },
                { label: "logP", value: formatLogP(logP) },
                { label: "TPSA", value: TPSA != null ? `${formatTPSA(TPSA)} Å²` : "—" },
              ].map(({ label, value }) => (
                <tr key={label}>
                  <td style={{ color: "#64748b" }}>{label}</td>
                  <td className="mono" style={{ color: "#e2e8f0", fontWeight: 600 }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Docking */}
          <div style={{ marginTop: "1.25rem" }}>
            <h3 style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#94a3b8", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Docking Result
            </h3>
            {docking ? (
              <table className="data-table">
                <tbody>
                  {[
                    { label: "Tool", value: docking.tool },
                    { label: "Target", value: docking.target },
                    { label: "Best ΔG", value: `${formatScore(docking.best_score_kcal_mol)} kcal/mol` },
                    { label: "Clusters", value: docking.n_clusters.toString() },
                  ].map(({ label, value }) => (
                    <tr key={label}>
                      <td style={{ color: "#64748b" }}>{label}</td>
                      <td className="mono" style={{ color: label === "Best ΔG" ? "#7c3aed" : "#e2e8f0", fontWeight: label === "Best ΔG" ? 700 : 500 }}>
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#475569", fontSize: "0.875rem" }}>
                <NotTestedBadge />
                <span>
                  {id === "BZMALT-01"
                    ? "Separate SwissDock run submitted — result pending"
                    : "Docking not yet performed"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PredSkin */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Skin Sensitization — PredSkin AOP
        </h2>
        {predskin ? (
          <div className="card-elevated">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <PredSkinPill result={predskin.result} confidence={predskin.confidence} />
              <span style={{ fontSize: "0.875rem", color: "#64748b" }}>
                Confidence:{" "}
                <span className="mono" style={{ color: "#94a3b8" }}>
                  {formatConfidence(predskin.confidence)}
                </span>
              </span>
            </div>
            {predskin.note && (
              <div className="alert alert-info" style={{ marginBottom: "1rem" }}>
                <span>ℹ</span>
                <span style={{ fontSize: "0.875rem" }}>{predskin.note}</span>
              </div>
            )}
            <table className="data-table">
              <thead>
                <tr>
                  <th>Assay / KE</th>
                  <th>Call</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {keEntries.map(({ key, call, confidence }) => (
                  <tr key={key}>
                    <td className="mono" style={{ color: "#94a3b8" }}>{key}</td>
                    <td>
                      <span className={`pill ${call === "sensitizer" ? "pill-caution" : call === "non-sensitizer" ? "pill-safe" : "pill-pending"}`}>
                        {call === "sensitizer" ? "⚠ Sensitizer" : call === "non-sensitizer" ? "✓ Non-sensitizer" : "?"}
                      </span>
                    </td>
                    <td className="mono" style={{ color: "#94a3b8" }}>
                      {confidence != null ? `${confidence.toFixed(1)}%` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card-elevated">
            <NotTestedBadge />
            {predskin_note && (
              <p style={{ color: "#64748b", marginTop: "0.5rem", fontSize: "0.875rem" }}>
                {predskin_note}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ProTox */}
      <div className="section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
          Toxicity — ProTox-3.0
        </h2>
        {protox ? (
          <div className="card-elevated">
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>LD₅₀</div>
                <span className="mono" style={{ fontSize: "1.125rem", fontWeight: 700, color: "#e2e8f0" }}>
                  {protox.LD50_mg_kg} mg/kg
                </span>
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>Toxicity Class</div>
                <span className={`pill ${proToxClassVerdict(protox.toxicity_class) === "safe" ? "pill-safe" : proToxClassVerdict(protox.toxicity_class) === "caution" ? "pill-caution" : "pill-danger"}`}>
                  {toxClassLabel(protox.toxicity_class)}
                </span>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Endpoint</th>
                  <th>ProTox-3.0 Verdict</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Hepatotoxicity", protox.hepatotoxicity],
                    ["Carcinogenicity", protox.carcinogenicity],
                    ["Immunotoxicity", protox.immunotoxicity],
                    ["Mutagenicity", protox.mutagenicity],
                    ["Cytotoxicity", protox.cytotoxicity],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ color: "#94a3b8" }}>{label}</td>
                    <td><ProToxEndpointPill value={value} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card-elevated">
            <NotTestedBadge />
          </div>
        )}
      </div>
    </div>
  );
}
