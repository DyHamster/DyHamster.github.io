import { readdir, readFile } from 'node:fs/promises'
import { transpileModule, ModuleKind } from 'typescript'
import { validateEntry, validateSections } from './content-validation.mjs'
const source = await readFile('src/config/sections.ts', 'utf8')
const js = transpileModule(source, { compilerOptions: { module: ModuleKind.ESNext } }).outputText
const { sections } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)
validateSections(sections)
const paths = new Set()
async function walk(directory, prefix = '') {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = prefix + item.name
    if (item.isDirectory()) await walk(`${directory}/${item.name}`, `${file}/`)
    else if (item.name.endsWith('.md') && item.name !== 'README.md') validateEntry(await readFile(`${directory}/${item.name}`, 'utf8'), file, sections, paths)
  }
}
await walk('src/content')
console.log(`Content verified: ${sections.length} sections, ${paths.size} published entries.`)
