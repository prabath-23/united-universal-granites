<script setup>
import { config } from '../config'
import WorldMap from './WorldMap.vue'
</script>

<template>
  <section id="reach" class="section reach">
    <div class="section-inner">
      <p class="eyebrow">Global Reach</p>
      <h2 class="section-title">Production and logistics, at export scale.</h2>
      <p class="intro reveal">
        Three decades of continuous production has given us the quarrying
        relationships, finishing capacity and shipping infrastructure to serve
        importers and monument companies reliably, order after order.
      </p>

      <div class="stats">
        <div class="stat reveal" v-for="s in config.stats" :key="s.label">
          <span class="stat-value">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>

      <div class="map-section reveal">
        <span class="regions-label">Export footprint — hover a market for detail</span>
        <WorldMap />
      </div>
    </div>
  </section>
</template>

<style scoped>
.reach {
  background: var(--charcoal);
}
.reach .eyebrow { color: var(--gold-light); }
.reach .section-title { color: var(--stone-50); }

.intro {
  max-width: 60ch;
  margin-top: 1.4rem;
  color: var(--muted-on-dark);
  font-size: 1rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 4rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--charcoal-border);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-value {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  color: var(--gold-light);
  font-weight: 400;
  line-height: 1;
}

.stat-label {
  color: var(--muted-on-dark);
  font-size: 0.82rem;
  letter-spacing: 0.02em;
}

.map-section {
  margin-top: 4rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--charcoal-border);
}

.regions-label {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted-on-dark);
  margin-bottom: 1.8rem;
}

@media (max-width: 880px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
  }
}
</style>
