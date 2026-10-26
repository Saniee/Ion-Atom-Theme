// Quick theme testing: opens ion-demos in an Extension Development Host with
// this extension loaded, and rebuilds the Neutral variants whenever a base
// theme or the build script changes.
//
// Run with `npm run dev`. Pass --no-open to only watch and rebuild.

import { spawn, spawnSync } from "node:child_process";
import { watch } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const buildScript = join(root, "scripts", "build-neutral.mjs");
const watched = [
  "ion-color-theme.json",
  "ion-light-color-theme.json",
  "ion-fusion-color-theme.json",
  "scripts/build-neutral.mjs",
];

function build() {
  spawnSync(process.execPath, [buildScript], { stdio: "inherit" });
}

build();

if (!process.argv.includes("--no-open")) {
  spawn("code", [`--extensionDevelopmentPath=${root}`, join(root, "ion-demos")], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
}

let timer;
for (const file of watched) {
  watch(join(root, file), () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log(`\n${file} changed, rebuilding`);
      build();
    }, 150);
  });
}

console.log(`watching ${watched.length} files, Ctrl+C to stop`);
