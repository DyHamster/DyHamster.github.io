import fm from 'front-matter'
export function validateSections(sections) {
  const paths = new Set(['about'])
  for (const section of sections) {
    for (const id of [section.id, ...(section.aliases ?? [])]) {
      if (!/^[a-z][a-z0-9-]*$/.test(id) || paths.has(id)) throw new Error(`Invalid or duplicate section route: ${id}`)
      paths.add(id)
    }
    if (!section.title || !section.english || !section.description) throw new Error(`Missing section metadata: ${section.id}`)
  }
}
export function validateEntry(raw, file, sections, paths) {
  const { attributes: data } = fm(raw)
  if ('draft' in data && typeof data.draft !== 'boolean') throw new Error(`${file}: draft must be true or false`)
  if (data.draft === true) return
  const [kind, ...parts] = file.replace(/\.md$/, '').split('/')
  if (!sections.some(section => section.id === kind)) throw new Error(`${file}: unknown section`)
  if (typeof data.title !== 'string' || !data.title.trim()) throw new Error(`${file}: missing title`)
  for (const field of ['date', 'updated']) {
    if (field === 'updated' && data[field] === undefined) continue
    const value = data[field] instanceof Date ? data[field].toISOString().slice(0, 10) : data[field]
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) throw new Error(`${file}: invalid ${field}, use YYYY-MM-DD`)
  }
  const slug = data.slug ?? parts.join('/')
  if (typeof slug !== 'string' || !slug.split('/').every(segment => /^[\p{L}\p{N}_-]+$/u.test(segment))) throw new Error(`${file}: invalid slug`)
  const route = `${kind}/${slug}`
  if (paths.has(route)) throw new Error(`${file}: duplicate URL ${route}`)
  paths.add(route)
  if (data.tags !== undefined && (!Array.isArray(data.tags) || data.tags.some(tag => typeof tag !== 'string'))) throw new Error(`${file}: tags must be a string array`)
}
