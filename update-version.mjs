#!/usr/bin/env node
import fs from "fs/promises"
import * as child_process from "child_process";

const appVersionPath = "./src/version.ts";
const appVersion = await fs.readFile(appVersionPath);
const pkg = JSON.parse((await fs.readFile("./package.json")).toString());

if (!appVersion.includes(pkg.version)) {
  await fs.writeFile(appVersionPath, `export default "${pkg.version}";\n`)
  const tag = `v${pkg.version}`
  await child_process.exec(`git commit -am \"🔖 ${tag}\"`)
  await child_process.exec(`git tag ${tag}`)
  await child_process.exec(`npm run docs:update`)
  await child_process.exec(`git push --tags`)
  console.log(`Version updated to ${pkg.version}`)
} else {
  console.log(`Nothing to update (version ${pkg.version}).`)
}
