import {
  copyFileSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";

// Explicit allowlist keeps credentials and unrelated files out of releases.
const files = [
  "plugin.json",
  "mcp.json",
  "README.md",
  "LICENSE",
  "assets/dearfax-mark.svg",
  "skills/dearfax/SKILL.md",
  "skills/setup/SKILL.md",
];
const source = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(readFileSync(resolve(source, files[0]), "utf8"));
assert.equal(manifest.license, "MIT");
const metadata = manifest.extensions["com.openai"].interface;
for (const [field, limit] of Object.entries({
  displayName: 30,
  shortDescription: 30,
  longDescription: 4000,
  developerName: 80,
})) {
  assert.equal(typeof metadata[field], "string", `${field} is required`);
  assert(
    metadata[field].trim().length > 0 && metadata[field].length <= limit,
    `Invalid ${field}`,
  );
}
assert.equal(manifest.name, "dearfax");
assert.equal(manifest.skills, "./skills/");
assert.equal(
  manifest.extensions["com.openai"].onboardingSkill,
  "./skills/setup/SKILL.md",
);
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
for (const field of [
  "websiteURL",
  "supportURL",
  "privacyPolicyURL",
  "termsOfServiceURL",
]) {
  const url = new URL(metadata[field]);
  assert(
    url.protocol === "https:" && !url.username && !url.password,
    `Invalid ${field}`,
  );
}
assert(metadata.defaultPrompt.length <= 3);
assert.equal(
  new Set(metadata.defaultPrompt).size,
  metadata.defaultPrompt.length,
);
for (const prompt of metadata.defaultPrompt)
  assert(prompt.length <= 128 && !/[\r\n@]/.test(prompt));
const cases = manifest.extensions["com.openai"].review.test_cases;
assert.equal(cases.positive.length, 5);
assert.equal(cases.negative.length, 3);
for (const test of [...cases.positive, ...cases.negative])
  assert(test.description && test.prompt);
for (const test of cases.positive)
  assert(test.tools_triggered && test.expected_behavior);
const servers = JSON.parse(
  readFileSync(resolve(source, "mcp.json"), "utf8"),
).mcpServers;
assert.deepEqual(Object.keys(servers), ["dearfax"]);
assert.equal(servers.dearfax.url, "https://app.dearfax.com/api/mcp");
assert.equal(servers.dearfax.type, "streamable-http");
assert.equal(metadata.logo, "./assets/dearfax-mark.svg");
assert.equal(metadata.composerIcon, metadata.logo);
for (const file of files)
  assert(
    lstatSync(resolve(source, file)).isFile(),
    `Not a regular file: ${file}`,
  );
const output = resolve(source, "output/dearfax-openai-plugin");
const root = resolve(output, "dearfax");
rmSync(root, { recursive: true, force: true });
for (const file of files) {
  const destination = resolve(root, file);
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(resolve(source, file), destination);
}
rmSync(resolve(output, "dearfax.zip"), { force: true });
execFileSync(
  "zip",
  ["-q", "dearfax.zip", ...files.map((file) => `dearfax/${file}`)],
  { cwd: output },
);
execFileSync("unzip", ["-t", "dearfax.zip"], { cwd: output });
console.log(
  `Prepared ${output}/dearfax.zip. Local checks passed; portal scans and live-client verification remain required.`,
);
