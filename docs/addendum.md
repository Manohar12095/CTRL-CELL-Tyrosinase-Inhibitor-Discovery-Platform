# CTRL+CELL — Round 2 Addendum

**Addendum to:** Round 1 Candidate Dossier  
**Issued:** 2026-09-29  
**Lead compound:** Phenylmaltol (PHMALT-01)

---

## 1. What Was Found

Two constraints were applied to our Round 1 lead candidate, Phenylmaltol (PHMALT-01):

### (a) Skin-sensitization safety flag

PredSkin AOP model returns **GHS 1B (low-potency sensitizer, 66.0% confidence)**. The call is driven by concordant sensitizer predictions from KeratinoSens (KE2, 36.7%) and AO_PredSkin (66.0%), with DPRA (KE1), hCLAT_USens (KE3), and LLNA (KE4) voting non-sensitizer. Our structural analog Benzylmaltol (BZMALT-01) also returned GHS 1B (59.7% confidence). Both compounds flag as low-potency sensitizers.

### (b) Competitor novelty challenge

A competitor has published a scaffold that may overlap with our maltol series. A structural comparison and freedom-to-operate assessment is in progress. No comparison is presented here until the analysis is complete.

### Mixture-toxicity finding (MIX-01)

Ethylmaltol (MALT-02) alone is a non-sensitizer, but when combined with Cinnamaldehyde (a known fragrance allergen), the mixture returns GHS 1B at 76.7% confidence. This is a documented mixture-toxicity phenomenon, not a data error.

## 2. What Changed

Phenylmaltol remains our best-docked compound (ΔG = −6.696 kcal/mol, 147 clusters against PDB 2Y9X) with a favourable systemic toxicity profile (Class V, LD₅₀ 2500 mg/kg, no endpoint flags). However, the GHS 1B sensitization flag represents genuine regulatory and commercial risk.

Our assessment now identifies two evidence-backed pivot candidates:
- **Ethylmaltol (MALT-02):** NC non-sensitizer, 57.9% confidence
- **Kojic acid (KOJIC-01):** NC non-sensitizer, 58.6% confidence

Both share the maltol pharmacophoric core and are expected to bind the tyrosinase copper center via the same β-hydroxy carbonyl chelation mechanism.

## 3. Reasoning

The pivot path is evidence-backed but **not yet finalisable** — neither MALT-02 nor KOJIC-01 has been docked against 2Y9X. Without binding affinity data, we cannot make a head-to-head efficacy comparison.

GHS 1B (low potency sensitizer) is categorically distinct from GHS 1A (high potency). The designation indicates a real but lower-potency hazard manageable through dose control and appropriate labelling. We acknowledge this nuance while not using it to dismiss the finding.

**Honest position:** Phenylmaltol is our best-docked compound with a real sensitization flag. The pivot to a non-sensitizing candidate makes sense if that candidate docks comparably. The next required experiment is docking Kojic acid and Ethylmaltol.

## 4. Outstanding Items

- [ ] Dock KOJIC-01 and MALT-02 against PDB 2Y9X (identical parameters)
- [ ] Run ProTox-3.0 for KOJIC-01 and MALT-02
- [ ] Complete competitor scaffold novelty/FTO review
- [ ] Retrieve BZMALT-01 SwissDock result (separate run submitted)
- [ ] Update decision page once pivot candidate docking is available
