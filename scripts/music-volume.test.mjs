import test from 'node:test'
import assert from 'node:assert/strict'
import { fadeVolume } from '../src/lib/music-volume.mjs'
test('fade remains valid when the first animation timestamp precedes start time', () => {
  assert.equal(fadeVolume(-0.5, 0.22), 0)
  assert.equal(fadeVolume(0, 0.22), 0)
  assert.equal(fadeVolume(700, 0.22), 0.11)
  assert.equal(fadeVolume(1800, 0.22), 0.22)
})
test('fade respects zero volume and media volume bounds', () => {
  assert.equal(fadeVolume(700, 0), 0)
  assert.equal(fadeVolume(1800, 2), 1)
  assert.equal(fadeVolume(700, -1), 0)
})
