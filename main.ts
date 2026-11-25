// news-image-20261125 — "Sum up 25 November's world news in one image".
//
// The entry image is the file entry.png beside this program: a one-page
// newspaper drawn for Wednesday 25 November 2026 (Pakistan's first astronaut
// aboard Shenzhou-24, Kyiv's Gulf of Finland ship strike, the Huawei verdict,
// the US tariff plan, Sarkozy's trial, the WHO plea on Cuba, Thanksgiving eve).
// It was rendered once, by hand, and is shipped in the repository as-is.
//
// This program does exactly one thing: copy that image, byte for byte, to
// /output/entry.png. It makes no network calls, reads no clock and writes no
// timestamps, so two runs always produce the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The image lives next to this file, wherever the repository was checked out.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');

// The grader mounts a writable /output; locally MAKEFUN_OUTPUT_DIR overrides it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

copyFileSync(source, join(outDir, 'entry.png'));

// Sanity check: the copy must be whole, or fail loudly instead of
// silently handing the grader a truncated image.
const written = statSync(join(outDir, 'entry.png')).size;
const expected = statSync(source).size;
if (written !== expected) {
  throw new Error(`entry.png copy incomplete: ${written} of ${expected} bytes`);
}
