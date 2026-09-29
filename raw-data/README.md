# raw-data/ — Provenance Directory

This directory holds the original source files that every number in this project traces back to. Nothing in `public/data/compounds.json` should exist without a corresponding source file here.

## Expected files (add when available)

| Filename | Description | Status |
|---|---|---|
| `phmalt01_swissdock_result.dock4` | SwissDock result for Phenylmaltol (job: maltol_benzyl_B) | ⏳ Add |
| `trop01_swissdock_result.dock4` | SwissDock result for Tropolone | ⏳ Add |
| `bzmalt01_swissdock_result.dock4` | SwissDock result for Benzylmaltol (separate run, pending) | ⏳ Add |
| `phmalt01_predskin.pdf` | PredSkin AOP output PDF for Phenylmaltol | ⏳ Add |
| `bzmalt01_predskin.pdf` | PredSkin AOP output PDF for Benzylmaltol | ⏳ Add |
| `malt02_predskin.pdf` | PredSkin AOP output PDF for Ethylmaltol | ⏳ Add |
| `kojic01_predskin.pdf` | PredSkin AOP output PDF for Kojic acid | ⏳ Add |
| `mix01_predskin.pdf` | PredSkin AOP output PDF for MIX-01 (Ethylmaltol + Cinnamaldehyde) | ⏳ Add |
| `phmalt01_protox.pdf` | ProTox-3.0 output PDF for Phenylmaltol | ⏳ Add |
| `trop01_protox.pdf` | ProTox-3.0 output PDF for Tropolone | ⏳ Add |
| `admetal3_descriptors.csv` | ADMETLab3 physicochemical descriptor CSV | ⏳ Add |

## Regenerating compounds.json

Once raw files are in this directory, update `pipeline/build_data.py` to parse them and run:

```bash
python pipeline/build_data.py --full --svg
```

Until then, run in seed mode (uses hardcoded values from the project brief):

```bash
python pipeline/build_data.py --svg
```

> **Note:** If any file is >50MB, enable Git LFS by uncommenting the lines in `.gitattributes` before adding it.
