<script setup>
// Stock photography stand-in (a real polished Black Galaxy granite slab, sourced
// from Wikimedia Commons — not UUG's own facility) until the client supplies
// studio macro photography of a polished granite surface.
const heroImage = '/images/photo-hero.jpg'

function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-texture" :style="{ backgroundImage: `url(${heroImage})` }"></div>
    <div class="hero-scrim"></div>

    <div class="hero-content">
      <p class="eyebrow">Manufacturer &amp; Exporter · Est. 1994</p>
      <h1 class="headline">Granite, cut<br />for generations.</h1>
      <p class="sub">
        United Universal Granites quarries, finishes and exports monument-grade
        granite to importers and stonemason companies across 40+ countries —
        built for permanence, supplied at scale.
      </p>
      <button class="btn btn-gold" @click="go('materials')">View Our Materials</button>
      <button class="quote-link" @click="go('contact')">Request a quote →</button>
    </div>

    <span class="placeholder-tag corner">Stock photography — studio imagery pending</span>

    <button class="scroll-cue" @click="go('materials')" aria-label="Scroll to materials">
      <span></span>
    </button>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  background: var(--charcoal);
  overflow: hidden;
}

.hero-texture {
  position: absolute;
  inset: -10%;
  background-size: 130% auto;
  background-repeat: no-repeat;
  animation: slow-pan 42s ease-in-out infinite alternate;
  opacity: 0.9;
  /* Colour-grade the stock photo toward the brand's charcoal/gold register. */
  filter: grayscale(0.35) sepia(0.15) contrast(1.05) brightness(0.8) saturate(1.05);
}

@keyframes slow-pan {
  0% { background-position: 30% 35%; transform: scale(1); }
  100% { background-position: 60% 50%; transform: scale(1.08); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-texture { animation: none; }
}

.hero-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(20, 20, 19, 0.55) 0%, rgba(20, 20, 19, 0.55) 35%, rgba(20, 20, 19, 0.92) 100%),
    linear-gradient(90deg, rgba(20, 20, 19, 0.75) 0%, rgba(20, 20, 19, 0.25) 55%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 760px;
  padding: 0 clamp(1.5rem, 6vw, 6rem);
  padding-top: 3rem;
}

.hero .eyebrow {
  color: var(--gold-light);
}

.headline {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(2.6rem, 6vw, 4.6rem);
  line-height: 1.08;
  color: var(--stone-50);
  margin-top: 1.3rem;
}

.sub {
  color: var(--muted-on-dark);
  font-size: 1.02rem;
  max-width: 46ch;
  margin-top: 1.6rem;
}

.hero .btn {
  margin-top: 2.4rem;
}

.quote-link {
  display: block;
  background: none;
  border: none;
  margin-top: 1.2rem;
  margin-left: 0.2rem;
  color: var(--muted-on-dark);
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  transition: color 0.4s var(--ease-slab);
}
.quote-link:hover {
  color: var(--gold-light);
}

.placeholder-tag.corner {
  position: absolute;
  right: clamp(1.2rem, 4vw, 2.5rem);
  bottom: 1.6rem;
  z-index: 2;
}

.scroll-cue {
  position: absolute;
  left: clamp(1.5rem, 6vw, 6rem);
  bottom: 2.2rem;
  z-index: 2;
  background: none;
  border: none;
  width: 1px;
  height: 52px;
}
.scroll-cue span {
  display: block;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, var(--gold) 0%, transparent 100%);
  transform-origin: top;
  animation: cue 2.6s ease-in-out infinite;
}
@keyframes cue {
  0% { transform: scaleY(0); opacity: 0; }
  40% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1); opacity: 0; }
}

@media (max-width: 640px) {
  .scroll-cue { display: none; }
}
</style>
