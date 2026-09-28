import test from 'node:test'
import assert from 'node:assert/strict'
import { validateEntry, validateSections } from './content-validation.mjs'
const sections = [{ id: 'notes', title: '笔记', english: 'NOTES', description: '学习' }]
const note = (extra = '') => `---\ntitle: Test\ndate: '2026-09-28'\n${extra}\n---\nBody`
test('new section works without special casing and supports nested stable URLs', () => {
  const paths = new Set()
  const custom = [...sections, { ...sections[0], id: 'reading' }]
  validateSections(custom)
  validateEntry(note('slug: book/chapter-one'), 'reading/moved.md', custom, paths)
  assert(paths.has('reading/book/chapter-one'))
})
test('draft is excluded and quoted booleans are rejected', () => {
  const paths = new Set()
  validateEntry('---\ndraft: true\n---\nPrivate', 'notes/private.md', sections, paths)
  assert.equal(paths.size, 0)
  assert.throws(() => validateEntry(note('draft: "true"'), 'notes/a.md', sections, paths))
})
test('duplicate URLs fail before publishing', () => {
  const paths = new Set()
  validateEntry(note('slug: stable'), 'notes/a.md', sections, paths)
  assert.throws(() => validateEntry(note('slug: stable'), 'notes/b.md', sections, paths), /duplicate URL/)
})
test('invalid dates, slugs and unknown sections fail', () => {
  assert.throws(() => validateEntry(note().replace('2026-09-28', '2026-02-31'), 'notes/a.md', sections, new Set()))
  assert.throws(() => validateEntry(note('slug: ../escape'), 'notes/a.md', sections, new Set()))
  assert.throws(() => validateEntry(note(), 'missing/a.md', sections, new Set()))
})
test('aliases cannot collide with sections or fixed pages', () => {
  assert.throws(() => validateSections([...sections, { ...sections[0], id: 'about' }]))
  assert.throws(() => validateSections([{ ...sections[0], aliases: ['notes'] }]))
})
