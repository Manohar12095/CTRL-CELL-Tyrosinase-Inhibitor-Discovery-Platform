import json
import sys
import os
import re

"""
pipeline/build_data.py
======================
Data build pipeline for CTRL+CELL.

MODES:
  seed  (default) — writes compounds.json from the hardcoded values in this
                    file. Use this when raw data files are not yet available.
  full            — (future) parses raw-data/ files and overwrites compounds.json.

USAGE:
  python pipeline/build_data.py           # seed mode
  python pipeline/build_data.py --full    # full mode (raw files required)
  python pipeline/build_data.py --svg     # also render 2D SVGs via RDKit

OUTPUT:
  public/data/compounds.json
  public/data/structures/<ID>.svg  (if --svg flag and RDKit available)
"""

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_JSON = os.path.join(ROOT, "public", "data", "compounds.json")
OUTPUT_SVG_DIR = os.path.join(ROOT, "public", "data", "structures")

# ─── Compound seed data (exact values from project brief) ─────────────────────
COMPOUNDS = [
    {
        "id": "MALT-01",
        "name": "Maltol",
        "role": "scaffold parent",
        "smiles": "Cc1occc(=O)c1O",
        "MW": 126.03,
        "logP": -0.157,
        "TPSA": 50.44,
        "docking": None,
        "predskin": None,
        "protox": None,
    },
    {
        "id": "MALT-02",
        "name": "Ethylmaltol",
        "role": "backup candidate (non-sensitizer)",
        "smiles": "CCc1occc(=O)c1O",
        "MW": 140.05,
        "logP": 0.601,
        "TPSA": 50.44,
        "docking": None,
        "predskin": {
            "result": "NC - non-sensitizer",
            "confidence": 57.9,
            "ke_breakdown": {
                "DPRA": "non-sensitizer 73.2%",
                "KeratinoSens": "non-sensitizer 88.3%",
                "hCLAT_USens": "non-sensitizer 56.1%",
                "LLNA": "non-sensitizer 79.0%",
            },
        },
        "protox": None,
    },
    {
        "id": "KOJIC-01",
        "name": "Kojic acid",
        "role": "backup candidate (non-sensitizer)",
        "smiles": "OCc1cc(=O)c(O)co1",
        "MW": 142.03,
        "logP": -0.565,
        "TPSA": 70.67,
        "docking": None,
        "predskin": {
            "result": "NC - non-sensitizer",
            "confidence": 58.6,
            "ke_breakdown": {
                "DPRA": "non-sensitizer 83.2%",
                "KeratinoSens": "non-sensitizer 90.5%",
                "hCLAT_USens": "non-sensitizer 57.6%",
                "LLNA": "non-sensitizer 66.4%",
            },
        },
        "protox": None,
    },
    {
        "id": "PHMALT-01",
        "name": "Phenylmaltol",
        "role": "LEAD CANDIDATE (Round 1 top pick, flagged in Round 2)",
        "smiles": "Cc1oc(-c2ccccc2)cc(=O)c1O",
        "MW": 202.06,
        "logP": 2.373,
        "TPSA": 50.44,
        "docking": {
            "tool": "SwissDock (Attracting Cavities 2.0)",
            "target": "2Y9X",
            "best_score_kcal_mol": -6.696,
            "n_clusters": 147,
            "note": (
                "SwissDock job was labeled 'maltol_benzyl_B' — "
                "phenylmaltol identity confirmed by user; "
                "benzylmaltol result is pending separately"
            ),
        },
        "predskin": {
            "result": "GHS 1B - low potency sensitizer",
            "confidence": 66.0,
            "ke_breakdown": {
                "DPRA": "non-sensitizer 68.0%",
                "KeratinoSens": "sensitizer 36.7%",
                "hCLAT_USens": "non-sensitizer 54.9%",
                "LLNA": "non-sensitizer 87.0%",
                "AO_PredSkin": "sensitizer 66.0%",
            },
        },
        "protox": {
            "LD50_mg_kg": 2500,
            "toxicity_class": 5,
            "hepatotoxicity": "inactive 0.59",
            "carcinogenicity": "inactive 0.55",
            "immunotoxicity": "inactive 0.97",
            "mutagenicity": "inactive 0.67",
            "cytotoxicity": "inactive 0.79",
        },
    },
    {
        "id": "BZMALT-01",
        "name": "Benzylmaltol",
        "role": "structural analog of lead, also flagged",
        "smiles": "Cc1oc(Cc2ccccc2)cc(=O)c1O",
        "MW": 216.08,
        "logP": 2.303,
        "TPSA": 50.44,
        "docking": None,
        "predskin": {
            "result": "GHS 1B - low potency sensitizer",
            "confidence": 59.7,
            "ke_breakdown": {
                "DPRA": "non-sensitizer 68.5%",
                "KeratinoSens": "sensitizer 20.6%",
                "hCLAT_USens": "non-sensitizer 55.2%",
                "LLNA": "non-sensitizer 75.0%",
                "AO_PredSkin": "sensitizer 59.7%",
            },
        },
        "protox": None,
    },
    {
        "id": "CINN-01",
        "name": "Cinnamaldehyde",
        "role": "reference toxicant (known fragrance allergen, used as a mixture-effect comparison, not an inhibitor candidate)",
        "smiles": "O=CC=Cc1ccccc1",
        "MW": 132.06,
        "logP": 2.131,
        "TPSA": 17.07,
        "docking": None,
        "predskin": None,
        "predskin_note": "Not tested individually — see MIX-01 for mixture effect with Ethylmaltol",
        "protox": None,
    },
    {
        "id": "MIX-01",
        "name": "Ethylmaltol + Cinnamaldehyde (mixture)",
        "role": "mixture-effect test",
        "smiles": "CCc1c(O)c(=O)cco1.O=C/C=C/c1ccccc1",
        "MW": None,
        "logP": None,
        "TPSA": None,
        "docking": None,
        "predskin": {
            "result": "GHS 1B - sensitizer",
            "confidence": 76.7,
            "ke_breakdown": {
                "DPRA": "sensitizer 59.6%",
                "KeratinoSens": "sensitizer 37.8%",
                "hCLAT_USens": "non-sensitizer 53.4%",
                "LLNA": "non-sensitizer 92.4%",
            },
            "note": (
                "Ethylmaltol alone is non-sensitizing; the mixture with "
                "cinnamaldehyde (a known allergen) flips the AOP call to "
                "sensitizer — this is a real, citable mixture-toxicity effect, "
                "not an error"
            ),
        },
        "protox": None,
    },
    {
        "id": "TROP-01",
        "name": "Tropolone",
        "role": "reference inhibitor (market comparator)",
        "smiles": "OC1=CC=CC=C1=O",
        "MW": 122.12,
        "logP": 0.75,
        "TPSA": 37.3,
        "docking": {
            "tool": "SwissDock (Attracting Cavities 2.0)",
            "target": "2Y9X",
            "best_score_kcal_mol": -6.284,
            "n_clusters": 96,
        },
        "predskin": None,
        "protox": {
            "LD50_mg_kg": 385,
            "toxicity_class": 4,
            "hepatotoxicity": "inactive 0.59",
            "carcinogenicity": "ACTIVE 0.55",
            "immunotoxicity": "inactive 0.99",
            "mutagenicity": "inactive 0.84",
            "cytotoxicity": "inactive 0.74",
        },
    },
]


def render_svg(compound: dict, output_dir: str) -> str | None:
    """Render a 2D structure SVG using RDKit. Returns the SVG path or None."""
    try:
        from rdkit import Chem
        from rdkit.Chem import Draw
        from rdkit.Chem.Draw import rdMolDraw2D

        smiles = compound["smiles"]
        if not smiles or "." in smiles:
            # Skip mixtures (multi-component SMILES)
            if smiles and smiles.count(".") > 0:
                print(f"  Skipping SVG for {compound['id']} (mixture SMILES)")
            return None

        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            print(f"  WARNING: Could not parse SMILES for {compound['id']}: {smiles}")
            return None

        drawer = rdMolDraw2D.MolDraw2DSVG(300, 200)
        drawer.drawOptions().addStereoAnnotation = True
        drawer.drawOptions().padding = 0.15
        drawer.DrawMolecule(mol)
        drawer.FinishDrawing()
        svg = drawer.GetDrawingText()

        os.makedirs(output_dir, exist_ok=True)
        svg_path = os.path.join(output_dir, f"{compound['id']}.svg")
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg)
        print(f"  ✓ SVG written: {compound['id']}.svg")
        return f"/data/structures/{compound['id']}.svg"

    except ImportError:
        print(
            "  WARNING: RDKit not available — skipping SVG generation.\n"
            "  Install with: pip install rdkit"
        )
        return None
    except Exception as e:
        print(f"  WARNING: SVG generation failed for {compound['id']}: {e}")
        return None


def validate_compound(c: dict) -> list[str]:
    """Return a list of validation errors for a compound dict."""
    errors = []
    required = ["id", "name", "role", "smiles"]
    for field in required:
        if field not in c or c[field] is None:
            errors.append(f"Missing required field: {field}")

    if "docking" in c and c["docking"] is not None:
        d = c["docking"]
        for f in ["tool", "target", "best_score_kcal_mol", "n_clusters"]:
            if f not in d:
                errors.append(f"docking.{f} missing")

    if "predskin" in c and c["predskin"] is not None:
        ps = c["predskin"]
        for f in ["result", "confidence", "ke_breakdown"]:
            if f not in ps:
                errors.append(f"predskin.{f} missing")

    if "protox" in c and c["protox"] is not None:
        px = c["protox"]
        for f in [
            "LD50_mg_kg", "toxicity_class", "hepatotoxicity",
            "carcinogenicity", "immunotoxicity", "mutagenicity", "cytotoxicity",
        ]:
            if f not in px:
                errors.append(f"protox.{f} missing")

    return errors


def build(render_svgs: bool = False, full_mode: bool = False):
    print("=" * 60)
    print("CTRL+CELL Data Pipeline")
    print("=" * 60)

    if full_mode:
        print("Mode: FULL (raw-data parsing — not yet implemented)")
        print("Falling back to seed mode.")

    print("Mode: SEED (using hardcoded values from project brief)")
    print()

    compounds = COMPOUNDS.copy()

    # Validate all compounds
    all_valid = True
    for c in compounds:
        errors = validate_compound(c)
        if errors:
            print(f"  ✗ Validation FAILED for {c.get('id', '?')}:")
            for e in errors:
                print(f"      - {e}")
            all_valid = False
        else:
            print(f"  ✓ Validated: {c['id']} ({c['name']})")

    if not all_valid:
        print("\nAborting: fix validation errors before writing output.")
        sys.exit(1)

    # Optionally render SVGs
    if render_svgs:
        print("\nRendering 2D structure SVGs...")
        for c in compounds:
            svg_rel = render_svg(c, OUTPUT_SVG_DIR)
            if svg_rel:
                c["structure_svg"] = svg_rel

    # Write output
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(compounds, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Written: {OUTPUT_JSON}")
    print(f"  {len(compounds)} compounds")
    docked = [c for c in compounds if c.get("docking") is not None]
    print(f"  {len(docked)} with docking data: {[c['id'] for c in docked]}")
    predskin_tested = [c for c in compounds if c.get("predskin") is not None]
    print(f"  {len(predskin_tested)} with PredSkin data")
    protox_tested = [c for c in compounds if c.get("protox") is not None]
    print(f"  {len(protox_tested)} with ProTox data")
    print("\nDone.")


if __name__ == "__main__":
    render_svgs = "--svg" in sys.argv
    full_mode = "--full" in sys.argv
    build(render_svgs=render_svgs, full_mode=full_mode)
