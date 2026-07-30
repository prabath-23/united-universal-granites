// Generates a CSS background-image recipe that stands in for real granite texture
// photography. This is intentionally abstract (layered radial-gradient "speckle" +
// a fine diagonal grain) so it never reads as a fabricated product photo — it is a
// placeholder pattern, clearly labelled as such in the UI wherever it appears.

function hashSeed(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function graniteBackground(tone, fleck, seedKey = '') {
  const seed = hashSeed(seedKey || tone)
  const specks = []
  const count = 10
  for (let i = 0; i < count; i++) {
    const x = (seed * (i + 3) * 37) % 100
    const y = (seed * (i + 7) * 53) % 100
    const size = 6 + ((seed * (i + 2)) % 18)
    specks.push(
      `radial-gradient(circle at ${x}% ${y}%, ${fleck}${i % 2 === 0 ? '55' : '33'} 0%, transparent ${size}%)`
    )
  }
  const grain = `repeating-linear-gradient(115deg, ${fleck}22 0px, transparent 2px, transparent 6px)`
  const base = `linear-gradient(155deg, ${tone} 0%, ${tone} 100%)`
  return [...specks, grain, base].join(', ')
}
