#!/usr/bin/env node
import fs from "fs/promises"
import * as child_process from "child_process";

const appVersionPath = "./src/version.ts";
const appVersion = await fs.readFile(appVersionPath);
const pkg = JSON.parse((await fs.readFile("./package.json")).toString());

if (!appVersion.includes(pkg.version)) {
  await fs.writeFile(appVersionPath, `export default "${pkg.version}";\n`)
  const tag = `v${pkg.version}`
  const commands = [
    `git commit -am \"🔖 ${tag}\"`,
    `git tag ${tag}`,
    `npm run docs:update`,
    `git push --tags`,
    `git push`
  ]
  for (const command of commands) {
    console.log(`Running: "${command}"`)
    await child_process.exec(command)
  }
  console.log(`Version updated to ${pkg.version}`)
} else {
  console.log(`Nothing to update (version ${pkg.version}).`)
}
