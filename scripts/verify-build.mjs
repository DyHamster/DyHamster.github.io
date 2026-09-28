import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'

const html = await readFile('dist/index.html', 'utf8')
assert(!/\bsrc=["'][^"']*\/src\//.test(html), 'Pages must publish dist, not the TypeScript source entry')
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)]
assert(scripts.length > 0, 'Missing production JavaScript entry')
for (const [, src] of scripts) {
  assert(src.startsWith('/assets/') && src.endsWith('.js'), `Unexpected entry: ${src}`)
  await access(resolve('dist', src.slice(1)))
}
console.log('Production entry and JavaScript assets verified.')
