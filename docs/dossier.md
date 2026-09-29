# CTRL+CELL — Candidate Dossier (Round 1)

**Project:** Stopping the Browning — Tyrosinase Inhibitor Discovery  
**Round:** 1  
**Target:** Tyrosinase / PPO (PDB: 2Y9X, mushroom *Agaricus bisporus*)  
**Date:** 2026-09-29

---

## 1. Problem Statement

Enzymatic browning in cut produce and skin hyperpigmentation are both driven by tyrosinase (polyphenol oxidase, PPO), which catalyses the oxidation of phenolic substrates to melanin precursors. Despite existing inhibitors (notably tropolone), commercial solutions are limited by efficacy, safety, and cost. This project identifies novel maltol-scaffold inhibitor candidates with improved safety profiles.

## 2. Enzyme Target

- **PDB:** 2Y9X — Mushroom tyrosinase (*Agaricus bisporus*, 2.78 Å resolution)
- **Active site:** Binuclear copper center (CuA, CuB), each coordinated by three histidines
- **Docking box:** Centre (−10, −25, −40) Å, 20×20×20 Å
- **Tool:** SwissDock 2024, Attracting Cavities 2.0 / AutoDock Vina hybrid; exhaustivity 90, cavity prioritisation 70

## 3. Compound Library (8 compounds)

| ID | Name | Role | MW (Da) | logP |
|---|---|---|---|---|
| MALT-01 | Maltol | Scaffold parent | 126.03 | −0.157 |
| MALT-02 | Ethylmaltol | Backup candidate | 140.05 | 0.601 |
| KOJIC-01 | Kojic acid | Backup candidate | 142.03 | −0.565 |
| PHMALT-01 | Phenylmaltol | **Lead candidate** | 202.06 | 2.373 |
| BZMALT-01 | Benzylmaltol | Structural analog | 216.08 | 2.303 |
| CINN-01 | Cinnamaldehyde | Reference toxicant | 132.06 | 2.131 |
| MIX-01 | Ethylmaltol + Cinnamaldehyde | Mixture control | — | — |
| TROP-01 | Tropolone | Market comparator | 122.12 | 0.75 |

## 4. Docking Results

| Compound | Best ΔG (kcal/mol) | Clusters |
|---|---|---|
| **Phenylmaltol (PHMALT-01)** | **−6.696** | 147 |
| Tropolone (TROP-01) | −6.284 | 96 |

*Note: SwissDock job for Phenylmaltol was labeled 'maltol_benzyl_B'. Submitter confirmed this is Phenylmaltol (SMILES: Cc1oc(-c2ccccc2)cc(=O)c1O, MW 202.06). Benzylmaltol was submitted separately; result pending.*

## 5. Safety Assessment

**PredSkin AOP:**

| Compound | Result | Confidence |
|---|---|---|
| Phenylmaltol | GHS 1B — low potency sensitizer | 66.0% |
| Benzylmaltol | GHS 1B — low potency sensitizer | 59.7% |
| Ethylmaltol | NC — non-sensitizer | 57.9% |
| Kojic acid | NC — non-sensitizer | 58.6% |
| MIX-01 (Ethylmaltol + Cinnamaldehyde) | GHS 1B — sensitizer | 76.7% |

**ProTox-3.0:**

| Compound | LD₅₀ (mg/kg) | Class | Carcinogenicity |
|---|---|---|---|
| Phenylmaltol | 2500 | V (low toxicity) | inactive 0.55 |
| Tropolone | 385 | IV | **ACTIVE 0.55** |

## 6. Lead Candidate: Phenylmaltol (PHMALT-01)

Phenylmaltol is the Round 1 lead based on docking affinity (best score among tested compounds) and favourable systemic toxicity (Class V, no endpoint flags). However, the GHS 1B skin sensitization flag requires resolution — addressed in Round 2.

## 7. Limitations & Next Steps

- All scores are computational estimates; wet-lab IC₅₀ validation required
- Benzylmaltol docking result pending
- Ethylmaltol and Kojic acid not yet docked
- See Round 2 addendum for sensitization flag response
